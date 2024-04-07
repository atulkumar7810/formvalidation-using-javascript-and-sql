var express = require("express")
const mysql = require("mysql2");
const bodyParser = require("body-parser");
var app = express()

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
var errmsg =""

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "form_validation",
    password: "789456123" 
});

app.get("/", function(req,res){
    var q = "SELECT COUNT(*)  as count FROM users"
    connection.query(q,function(error,result){
        if(error) throw error;
        var count_num = result[0].count
        res.render("index",{count_num:count_num,errmsg:errmsg})

    })
})

app.post("/register",function(req,res){
    var person ={
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        }
        connection.query("INSERT INTO users SET ?",person, function(error, results) {
            if (error) {
                errmsg = error.message
                res.redirect("/")
            }else{
                errmsg =""
                res.render("thank")
            }
        
        })
})

app.listen(8080,function(){
    console.log("server running on port 8080")
})