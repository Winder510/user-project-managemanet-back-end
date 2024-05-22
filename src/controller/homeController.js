import userService from '../service/userService';

const handleUserPage = async (req, res) => {
    try {
        let users = await userService.getUserList();
        return res.render('user.ejs', {
            users
        });
    } catch (err) {
        console.error('Error fetching users:', err);
        return res.status(500).send('Internal Server Error');
    }
}

const handleCreateNewUser = async (req, res) => {
    const {
        email,
        password,
        username
    } = req.body;

    userService.createNewUser(email, password, username);
    return res.redirect('/users');
}
const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect('/users');
}
const getUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    let userData = {};
    userData = user;
    // if (user && user.length > 0) {
    //     userData = user[0];
    // }
    return res.render('user-update.ejs', {
        userData
    })
}
const handleUpdateUser = async (req, res) => {
    const {
        email,
        username,
        id
    } = req.body;
    await userService.updateUserInfor(id, email, username);
    return res.redirect('/users');
}
module.exports = {
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser
}