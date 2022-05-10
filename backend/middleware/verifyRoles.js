const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.status(401).json({message: "1-Vous n'êtes pas autorisé(e) à effectuer cette action."});
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.status(401).json({message: "2-Vous n'êtes pas autorisé(e) à effectuer cette action."});
        next();
    }
}

module.exports = verifyRoles
