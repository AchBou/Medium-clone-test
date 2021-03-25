const User = require("./user.model")
const Comment = require("./comment.model")
const Article = require("./Article.model")
const Tag = require("./Tag.model")
const Reaction = require("./Reaction.model")

module.exports = function (){
    User.hasMany(Reaction, {foreignKey: {allowNull: false}})
    User.hasMany(Article, {foreignKey: {allowNull: false}})
    User.hasMany(Comment, {foreignKey: {allowNull: false}})

    Article.belongsToMany(Tag, {through: 'ArticleTag'})
    Article.belongsTo(User, {foreignKey: {allowNull: false}})
    Article.hasMany(Reaction, {foreignKey: {allowNull: false}})
    Article.hasMany(Comment, {foreignKey: {allowNull: false}})

    Tag.belongsToMany(Article,{through: 'ArticleTag'})

    Comment.belongsTo(User, {foreignKey: {allowNull: false}})
    Comment.belongsTo(Article, {foreignKey: {allowNull: false}})

    Reaction.belongsTo(User, {foreignKey: {allowNull: false}})
    Reaction.belongsTo(Article, {foreignKey: {allowNull: false}})

}



