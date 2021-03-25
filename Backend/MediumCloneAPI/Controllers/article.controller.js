const ArticleService = require('../services/Article.service');
const Articles = require('../models/Article.model');

const { Op } = require("sequelize");

let Article = function () {

};

Article.prototype=Object.create(ArticleService.prototype)

console.log(Article)

// Create and Save a new Article
Article.prototype.create = (req, res) => {
    // Validate request
    if (!req.body.name ||
        !req.body.reference ||
        !req.body.content ||
        !req.body.draft ||
        !req.body.userId
    ) {
        res.status(400).send({
            message: "A mandatory field is missing !"
        });
        return;
    }

    // Create a Article
    const Article = {
        name: req.body.name,
        reference: req.body.reference,
        content: req.body.content,
        draft: req.body.draft,
        userId: req.body.userId,
    };

    // Save Article in the database
    Articles.create(Article)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Article."
            });
        });
};

// Retrieve all Articles from the database.
Article.prototype.findAll = (req, res) => {
    const keywords = req.query.keywords;
    const tags = req.query.tags;
    const conditionKeywords = keywords ? {
        [Op.or]: [
            { content: { [Op.like]: `%${keywords}%` } },
            { name: { [Op.like]: `%${keywords}%` } }
        ]
    } : null;
    const conditionTags = tags ? {'$Tags.title':`%${tags}%`} : null;

    let conditions={
        [Op.and]: [
        conditionKeywords,
        conditionTags
    ]
    }

    console.log(conditions)
    Articles.findAll({
        where:conditions,
        include: { all: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Articles."
            });
        });
};

// Find a single Article with an id
Article.prototype.findOne = (req, res) => {
    const id = req.params.id;

    Articles.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Article with id=" + id
            });
        });
};



// Update a Article by the id in the request
Article.prototype.update = (req, res) => {
    const id = req.params.id;

    Articles.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Article was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Article with id=" + id
            });
        });
};

// Delete a Article with the specified id in the request
Article.prototype.delete = (req, res) => {
    const id = req.params.id;

    Articles.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Article was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Article with id=" + id
            });
        });
};


module.exports=new Article();
