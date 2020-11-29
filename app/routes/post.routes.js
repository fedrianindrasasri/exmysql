module.exports = app => {
    // memanggil controller yang dipakai di route ini
    const posts = require("../controllers/post.controller.js");

    // memanngil fungsi router dari express
    let router = require("express").Router();

    // create a new post 
    router.post("/", posts.create);

    // retrive all post
    router.get("/", posts.findAll);

    // retrieve published post
    router.get("/published", posts.findAllPublished);

    // retrieve single post / find one
    router.get("/:id", posts.findOne);

    // update data
    router.put("/:id", posts.update);

    // delete data
    router.delete("/:id", posts.delete);

    // delete all data
    router.delete("/", posts.deleteAll);

    // route umumnya
    app.use("/api/posts", router);
}