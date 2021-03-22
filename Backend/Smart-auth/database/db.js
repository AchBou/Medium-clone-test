const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'database',
    port:3306,
    user: 'root',
    password: 'root',
    database: 'medium_clone'
});


let DB = function() {

    DB.prototype.query = function (sql,params,callback) {
        connection.query(sql, params ,callback)
    }

}
module.exports=new DB();
