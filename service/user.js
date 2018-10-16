let User = require("../model/user");
let encryptUtil = require("../utils/encryptUtil");

/**
 * 用户注册
 * url : POST , http://localhost:8080/
 * @param user {username:zhangsan,password:123}
 * @returns {Promise<void>}
 */
async function regist(user) {

    // 根据用户名查询用户
    let result = await findByUser(user.username);
    if (result) {
        throw Error(`用户名${user.username}已经被占用`);
    }
    // 把密码进行加密
    // 参数1 : 原文
    // 参数2 : 盐
    user.password = encryptUtil.md5Hmac(user.password, user.username);
    // 对角色重新赋值
    user.role = 0;
    // 注册
    result = await User.create(user);

    return result;

}

async function deleteUserByUsername() {

}

/**
 * 根据用户名查询用户
 * url : GET , http://localhost:8080/username
 * @param username : 用户名, zhangsan
 * @returns {Promise<*>}
 */
async function findByUser(username) {

    return await User.findOne({username: username})
}

async function login() {

}