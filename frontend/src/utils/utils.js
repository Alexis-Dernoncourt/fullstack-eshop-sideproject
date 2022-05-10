export const verifyRoles = (userRoles, roleToFind) => {
    const ROLES_LIST = {
        Admin: 1825,
        Editor: 1048,
        User: 5891,
    };
    if (!userRoles) {
        console.log('coucou toi !');
        return false;
    }
    return userRoles
        .map((role) => role === ROLES_LIST[roleToFind])
        .find((val) => val === true);
};
