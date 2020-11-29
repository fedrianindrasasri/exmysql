module.exports = {

    //parameter untuk koneksi ke database mysql 

    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "node_mysql",
    dialect: "mysql",
    pool: {
        max : 5, //max number coonection in pool
        min : 0,//min number coonection in pool
        acquire : 30000,
        idle : 10000
    }
}