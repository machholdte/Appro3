const allUsers = require('../User/Users');



// Laver derefter controlleren. 
function usersInApp (req, res) {
    res.json(allUsers);
}

module.exports = usersInApp;
