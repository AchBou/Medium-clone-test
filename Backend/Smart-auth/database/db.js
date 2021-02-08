const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'medium_clone'
});


let DB = function() {

    DB.prototype.query = function (sql,params,callback) {
        connection.query(sql, params ,callback)
    }

}
module.exports=new DB();
