exports.getAdminPage = async (req, res) => {
    req.roles = req.roles;
    res.status(200).json({ message: "Bienvenue dans la zone d'administration !"});
};