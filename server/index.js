const express = require("express");
const app =express();
const bodyparser = require("body-parser");
const cors=require("cors");
const mysql =require("mysql2");


const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"contact",
});

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get("/api/get",(req,res)=>{
    const sqlGet ="SELECT * FROM STUDENT";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});
app.post("/api/post", (req,res) =>{
    const {name, email,contact} =req.body;
    const sqlInsert="INSERT INTO student(name, email, contact) values (?,?,?)";
    db.query(sqlInsert,[name,  email,contact],(error,result)=>{
        if(error){
            console.log(error);
        };
    });
    
});

app.delete("/api/remove/:id",(req,res) =>{
    const { id } = req.params;
    const sqlRemove =
    "DELETE FROM student WHERE id  = ? ";
    db.query(sqlRemove, id,(error,result) => {
        if(error) {
                console.log(error);
        };
    });
});
app.get("/api/get/:id",(req,res)=>{
    const {id} =req.params 
    const sqlGet ="SELECT * FROM Student where id =?";
    
    
    db.query(sqlGet, id, (error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});
app.put("/api/update/:id",(req,res) =>{
    const { id } = req.params;
    const {name, email, contact}=req.body;
    const sqlUpdate =
    "UPDATE student SET name  = ? , email  = ? , contact  = ? WHERE id=?";
    db.query(sqlUpdate, [name,email,contact,id],(error,result) => {
        if(error) {
                console.log(error);
        };
        res.send(result);
    });
});






app.listen(5000,()=>{
    console.log("server is running");
})