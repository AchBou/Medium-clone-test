const db=require('../database/db');

const userDAO = function() {

    userDAO.prototype.getUserById = function (data,callback) {
        let sql = 'SELECT * FROM user WHERE id = ? ';
        db.query(sql,data,function (err,res) {
            if(err) {callback(err,null)}
            else {callback(null,res)}
        });
    }

    userDAO.prototype.getUserByLoginInfo = function (data,callback) {
        let sql = 'SELECT * FROM user WHERE email = ? ';
        db.query(sql,data,function (err,res) {
            if(err) {callback(err,null)}
            else {callback(null,res)}
        });
    }

    userDAO.prototype.listUsers = function (data,callback) {
        let sql = 'SELECT * FROM user';
        db.query(sql,data,function (err,res) {
            if(err) {callback(err,null)}
            else {callback(null,res)}
        });
    }

    userDAO.prototype.addUser = function (data,callback) {
        let sql = 'insert into user SET username=?,password=?,email=?,role=?;';
        db.query(sql,data,function (err,res) {
            if(err) {callback(err,null)}
            else {callback(null,res)}
        });
    }

}
module.exports=new userDAO();
