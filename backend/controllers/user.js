const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const match = require('../utils/regex');
const SibApiV3Sdk = require('sib-api-v3-sdk');
require('../config/sendinblueConfig');


exports.signup = async (req, res) => {
  const pwd = req.body.data.password.trim();
  const mail = req.body.data.email.trim();
  if (pwd && mail && match.regex.passwordCheck.test(pwd) && match.regex.mailCheck.test(mail)) {
    const username = mail.split('@')[0];
    const hashedPwd = await bcrypt.hash(pwd, 10);
    if (!hashedPwd) return res.status(400).json({ message: `Il y a eu une erreur, veuillez réessayer.` });
    const user = new User({
      username,
      email: mail,
      password: hashedPwd
    });
    try {
      const userToSave = await user.save();
      const sendEmailToUser = await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
        {
          'to' : [{'name': username, 'email': mail}],
          'templateId': 1,
          'params' : {'userId': userToSave._id.toString(), userName: username }
        }
      );
      if (!sendEmailToUser) return res.status(500).json({ message: 'Il y a eu une erreur. Veuillez réessayer.' });

      if (userToSave && sendEmailToUser) return res.status(201).json({ message: `Utilisateur créé : ${mail}`});
    } catch(error) {
      console.log(error);
      if (error.name === "ValidationError" && error.errors.email.kind === "unique") {
        res.status(409).json({ message: 'Cet email n\'est pas correct. Veuillez réessayer.' });
      } else {
        res.status(500).json({ message: 'Il y a eu une erreur. Veuillez réessayer.' });
      }
    }
  } else {
    res.status(400).json({ message: 'Email et/ou mot de passe invalide(s), Assurez vous d\'avoir bien rempli tous les champs demandés.' });
  }
};

exports.login = async (req, res) => {
  const pwd = req.body.password.trim();
  const mail = req.body.email.trim();
  if (match.regex.passwordCheck.test(pwd) && match.regex.mailCheck.test(mail)) {
    const user = await User.findOne({ email: mail });
    if (!user) return res.status(401).json({ message: 'Email et/ou mot de passe invalide(s), veuillez réessayer.' });

    const validPwd = await bcrypt.compare(pwd, user.password);
    if (validPwd) {
      const roles = Object.values(user.roles);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            userId: user._id,
            roles: roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5m' }
      );
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
      );
      const updateIdentifyedUser = await User.findByIdAndUpdate(user._id, { refreshToken });
      if (!updateIdentifyedUser) return res.status(500).json({ message: 'Il y a eu une erreur.' });
      const maxAgeSevenDays = 60 * 60 * 24 * 7 * 1000;
      res.cookie('jwt', refreshToken, { httpOnly: false, sameSite: 'None', secure: false, maxAge: maxAgeSevenDays });
      res.status(200).json({
        user : {
          userId: user._id,
          username: user.username,
          email: user.email,
          adress: user.adress,
          userRoles: roles,
          validatedAccount: user.validatedAccount,
        },
        accessToken,
        message: `Bienvenue ${user.adress.firstName ? user.adress.firstName : user.username} !`
      });
    } else {
      res.status(401).json({ message: 'Email et/ou mot de passe invalide(s), veuillez réessayer.' });
    };
  } else {
    res.status(401).json({ message: "Email et/ou mot de passe invalide(s), veuillez réessayer" });
  };
};

exports.refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ message: 'Action impossible' });
  }

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(403);
  const roles = Object.values(foundUser.roles);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || decoded.userId !== foundUser._id.toString()) return res.status(403).json({ message: `Vous n'êtes pas autorisé(e) à effectuer cette action.` });
      const accessToken = jwt.sign(
        {
          UserInfo: {
            userId: foundUser._id.toString(),
            roles: roles
          },
          sessionExpire : decoded.exp
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5m' }
      );
      //save new refresh token ?
      const {username, email, adress, validatedAccount,  } = foundUser;
      const user = {
        userId: foundUser._id,
        username,
        email,
        adress,
        userRoles: Object.values(foundUser.roles),
        validatedAccount,
      };
      res.json({accessToken: accessToken, user});
    }
  );
};

exports.logout = async (req, res) => {
  // On client : also delete the accessToken in memory
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // 'No content' response
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({refreshToken});
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, });
    return res.sendStatus(204);
  };
  const updateUser = await User.findByIdAndUpdate(foundUser._id, { refreshToken: '' });
  if (!updateUser) return res.status(404).json({ message: 'Il y a eu une erreur, veuillez réessayer.' });
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, });
  res.status(200).json({ message: 'Vous êtes déconnecté !' });
};

exports.confirmEmail = async (req, res) => {
  try {
    if (req?.params && req?.params?.id && req?.params?.username) {
      const userId = req.params.id;
      const userName = req.params.username;
      const userToConfirm = await User.findById(userId);
      if (userToConfirm && userToConfirm.username === userName && userId === req.userId) {
        if (userToConfirm.validatedAccount) return res.status(403).json({ message: 'Vous ne pouvez pas effectuer cette action car vous avez déjà validé votre adresse mail.'});
        const updatedUser = await User.findByIdAndUpdate(userId, { validatedAccount: true });
        
        res.status(200).json({
          userId: updatedUser._id,
          email: updatedUser.email,
          message: 'Votre adresse e-mail a bien été confirmée !'
        });
      } else {
        return res.status(403).json({ message: 'Requête invalide. Veuillez réessayer.'});
      };
    };
  } catch (error) {
    console.log(error);
    if (error.kind === 'ObjectId' && error.name === 'CastError') {
      return res.status(404).json({ message: 'Identifiant inconnu ou incorrect. Veuillez vérifier votre requête puis réessayer.' });
    }
    res.status(400).json({ erreur: error });
  };
};

exports.modifyPassword = async (req, res) => {
  try {
    const oldPwd = req.body.password.trim();
    const newPwd = req.body.passwordUpdate.trim();

    if (req?.params && req?.params?.id && oldPwd && match.regex.passwordCheck.test(oldPwd) && newPwd && match.regex.passwordCheck.test(newPwd)) {
      const userToConfirm = await User.findById(req.params.id);
      if (!userToConfirm.validatedAccount) return res.status(403).json({ message: 'Vous ne pouvez pas effectuer cette action car vous n\'avez pas validé votre adresse mail.'});
      if (userToConfirm && userToConfirm._id.toString() === req.userId && userToConfirm._id.toString() === req.params.id) {
        const validPwd = await bcrypt.compare(oldPwd, userToConfirm.password);
        if (validPwd) {
          const newHashedPwd = await bcrypt.hash(newPwd, 10);
          if (!newHashedPwd) return res.status(400).json({ message: `Il y a eu une erreur, veuillez réessayer.` });
          const updatedUser = await User.findByIdAndUpdate(req.params.id, { password: newHashedPwd });
          res.status(200).json({
            userId: updatedUser._id,
            message: 'Votre mot-de-passe a bien été modifé !'
          });
        } else {
          return res.status(403).json({ message: '2Requête invalide. Veuillez réessayer.'});
        }
      } else {
        return res.status(403).json({ message: '1Requête invalide. Veuillez réessayer.'});
      };
    };
  } catch (error) {
    console.log(error);
    if (error.kind === 'ObjectId' && error.name === 'CastError') {
      return res.status(404).json({ message: 'Identifiant inconnu ou incorrect. Veuillez vérifier votre requête puis réessayer.' });
    }
    res.status(400).json({ erreur: error.message });
  };
};

exports.updateAdress = async (req, res) => {
  try {
    const firstName = req.body.firstName.trim();
    const lastName = req.body.lastName.trim();
    const postalCode = req.body.postalCode.trim();
    const city = req.body.city.trim();
    const streetNumber = req.body.streetNumber.trim();
    const street = req.body.street.trim();
    const adressComplement = req.body.adressComplement ? req.body.adressComplement.trim() : '';
    const appartment = req.body.appartment;
    const etage = req.body.etage;

    if (firstName && lastName && postalCode && city && streetNumber && street && match.regex.noSpecialChars.test(firstName) && match.regex.noSpecialChars.test(lastName) && match.regex.noSpecialChars.test(city) && match.regex.noSpecialChars.test(street) && match.regex.noSpecialChars.test(streetNumber) && match.regex.postalCode.test(postalCode)) {
      const userToUpdate = await User.findById(req.userId);
      if (userToUpdate) {
        if (!userToUpdate.validatedAccount) return res.status(403).json({ message: 'Vous ne pouvez pas effectuer cette action car vous n\'avez pas validé votre adresse mail.'});
        const adress = {firstName, lastName, postalCode, city, streetNumber, street, adressComplement, appartment, etage};
          const newAdress = await User.findByIdAndUpdate(userToUpdate._id, {adress: adress});
          if (!newAdress) return res.status(400).json({ message: `Il y a eu une erreur, veuillez réessayer.` });
          res.status(200).json({
            adress,
            message: 'Votre adresse a bien été mise à jour !'
          });
      } else {
        return res.status(403).json({ message: 'Requête invalide. Veuillez réessayer.'});
      };
    };
  } catch (error) {
    console.log(error);
    if (error.kind === 'ObjectId' && error.name === 'CastError') {
      return res.status(404).json({ message: 'Identifiant inconnu ou incorrect. Veuillez vérifier votre requête puis réessayer.' });
    }
    res.status(400).json({ erreur: error, message: error.message });
  };
};

exports.profile = async (req, res) => {
  try {
    if (req.params && req.params.id === req.userId) {
      const user = await User.findById(req.params.id, { password: 0, __v: 0, refreshToken: 0 });

      const userIsLoggedIn = await User.findById(req.params.id, { refreshToken: 1 });
      if (userIsLoggedIn.refreshToken !== '') {
        const {username, email, adress, validatedAccount,  } = user;
        const userData = {
          userId: user._id,
          username,
          email,
          adress,
          userRoles: Object.values(user.roles),
          validatedAccount,
        };
        res.status(200).json({ userData, message: `Bienvenue sur votre profil !` });
      } else {
        return res.status(401).json({
          message: 'Votre session a expirée. Veuillez vous reconnecter.'
        });
      };
    } 
    else {
      return res.status(401).json(`Vous n'êtes pas autorisé(e) à effectuer cette action.`);
    };
  } catch (error) {
    console.log(error);
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Utilisateur non trouvé !' });
    };
    res.status(401).json({ erreur: error });
  };
};
