import pool from "../configs/connectDB";
import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);

    try {
        await db.User.create({
            username: username,
            email: email,
            password: password
        })
    } catch (err) {
        console.log(err);
    }

}
const getUserList = async () => {
    let users = [];
    users = await db.User.findAll();
    return users;
    // try {
    //     const [rows, fields] = await pool.query('SELECT * FROM users');
    //     return rows;
    // } catch (err) {
    //     console.log(err);
    //     return [];
    // }
}
const deleteUser = async (userid) => {
    await db.User.destroy({
        where: {
            id: userid
        }
    })
    // try {
    //     const [rows, fields] = await pool.query('DELETE FROM users WHERE id =?', [id]);
    // } catch (err) {
    //     console.log(err);
    // }
}
const getUserById = async (userid) => {
    let user = {};
    user = await db.User.findOne({
        where: {
            id: userid
        }
    })
    return user.dataValues;
    // try {
    //     const [rows, fields] = await pool.query('SELECT * FROM users where id =?', [id]);
    //     return rows;
    // } catch (err) {
    //     console.log(err);
    //     return [];
    // }
}
const updateUserInfor = async (id, email, username) => {
    await db.User.update({
        username: username,
        email: email
    }, {
        where: {
            id: id
        },
    })

    // try {
    //     const [rows, fields] = await pool.query('UPDATE users set email = ?,username= ? where id=? ', [email, username, id]);
    // } catch (err) {
    //     console.log(err);
    //     return [];
    // }
}
module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor
}