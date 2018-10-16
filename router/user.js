let userService = require("../service/user");
let router = require("express").Router();
let config = require("../config");
let encryptUtil = require("../utils/encryptUtil");

/**
 * 用户注册
 * url : POST , http://localhost:8080/
 * @param user {username:zhangsan,password:123}
 */
router.post("/", async (request, response) => {

    let result = await userService.regist(request.body);

    response.success(result);
})

/**
 * 根据用户名删除用户
 * url : DELETE, http://localhost:8080/username
 * @param username 用户名
 */
router.delete("/:username", async (request, response) => {

    await userService.deleteUserByUsername(request.params.username);

    response.success();
})
/**
 * 根据用户名查询用户
 * url : GET , http://localhost:8080/username
 * @param username : 用户名, zhangsan
 */
router.get("/:username", async (request, response) => {

    let username = request.params.username;
    let result = await userService.findByUsername(username);

    if (result) {

        result.password = "";
        response.success(result);
    } else {
        throw Error(`用户名为${username}的用户不存在`)
    }

})

/**
 * 用户登录
 * url : POST , http://localhost:8080/
 * @param user {username:zhangsan,password:123}

 */
router.post("/login", async (request, response) => {

    // 登录, session
    let user = await userService.login(request.body);

    // 定义token
    let token = {
        username: user.username,
        expire: Date.now() + config.TOKEN_EXPIRE
    };

    // 参数1 : 原文
    // 参数2 : 密钥
    let encryptedData = encryptUtil.aesEncrypt(JSON.stringify(token), config.TOKEN_KEY);

    response.success(encryptedData);

})

module.exports = router;