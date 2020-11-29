const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {

// membuat table post dan kolom2nya
    const Post = sequelize.define("post", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });
    
    return Post;
}