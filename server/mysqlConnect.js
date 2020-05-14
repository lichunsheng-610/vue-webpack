let models = require('./db');
let mysql = require('mysql');

module.exports = function (sql) {
    return new Promise((resolve, reject) => {
        // 一、创建连接
        let connection = mysql.createConnection(models.mysql);
        // 二、连接数据库
        connection.connect(function (err) {
            if (err) {
                console.error('连接失败' + err);
                return;
            }
        });
        // 三、对数据表操作
        connection.query(sql, function (err, results, fields) {
            if (err) {
                console.log("mysqlConn");
                console.log(err);
                reject(err);
            } else {
                resolve(JSON.parse(JSON.stringify(results)));
            }
        });
        // 四、关闭连接
        connection.end();
    })
}