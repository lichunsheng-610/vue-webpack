// sql语句

var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(id, name, age) values (0, ?, ?)',
        check: 'select * from loginname',
        loginCheck: 'select * from usersTable where account = ?',
    }
}

module.exports = sqlMap;
