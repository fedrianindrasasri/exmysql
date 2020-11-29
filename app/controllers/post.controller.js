const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create
exports.create = (req, res)=>{
    // Validate
    if(!req.body.title){
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }

    // create post
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Post.create(post)
        .then((data)=>{
                res.send(data);
        }).catch((err)=>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the post"
            });
        });
};

// Retrive all
exports.findAll = (req, res) => {
    const title = req.query.title;

    let condition = title ? {title : { [Op.like]: `%${title}%` } } : null ;

    Post.findAll({where: condition})
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: 
                    err.message || "Some Error accured when retrieve data"
            });
        });
};

// find one
exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: 
                    err.message || "Some Error accured when retrieve data"
            });
        });
}

// update with ID
exports.update = (req, res) => {
    const id = req.params.id;

    Post.update(req.body, {
        where: {id : id}
    }).then((result) => {
        if (result == 1){
            res.send({
                message: "Post was updates successfully"
            });
        }else{
            res.send({
                message: `Cannot Updated data with id=${id}`
            })
        }
    }).catch((err)=> {
        res.status(500).send({
            message: `Error updating post with id = ${id}`
        })
    });
}

// delete by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Post.destroy({
        where: {id : id}
    }).then((result) => {
        if (result == 1){
            res.send({
                message: "Post was deleted successfully"
            });
        }else{
            res.send({
                message: `Cannot deleted data with id=${id}`
            })
        }
    }).catch((err)=> {
        res.status(500).send({
            message: `Error deletes post with id = ${id}`
        })
    });
}

// delete all
exports.deleteAll = (req, res) =>{
    Post.destroy({
        where: {},
        truncate: false
    }).then((result) => {
        res.send({
            message: "All Post was deleted successfully"
        });
    }).catch((err)=> {
        res.status(500).send({
            message: `Error deleted all post`
        })
    });
}

// find all published
exports.findAllPublished = (req, res)=>{
    Post.findAll({
        where: {published: true}
    }).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.status(500).send({
            message:
                err.message || "Some error occured retrieving post"
        })
    });
}