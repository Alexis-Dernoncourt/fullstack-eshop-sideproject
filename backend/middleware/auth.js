const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(403).json({
        message: 'Requête invalide.'
      });
    };
    const token = authHeader.split(' ')[1];
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return;
        req.userId = decoded.UserInfo.userId,
        req.roles = decoded.UserInfo.roles
      }
    );
    
    if (req.body.userId && req.body.userId !== req.userId) {
      return res.status(403).json({
        message: 'Requête invalide. Vérifiez vos informations.'
      });
    } else {
      next();
    };
  } catch (err){
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: 'Votre session a expirée. Veuillez vous reconnecter.'
      });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(403).json({
        message: 'Votre authentification a échouée.'
      });
    }
    res.status(401).json({
      error: err,
      message: 'Action non autorisée'
    });
  };
};
