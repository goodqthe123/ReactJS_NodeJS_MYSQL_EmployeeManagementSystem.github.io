const express =require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');


app.use(cors());
app.use(express.json());


//MYSQL登入
const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password: 'root123',
    database:'employeesystem'
})

db.connect(function(err){
    if(err)
    {
        console.log(err)
    }else{
        console.log("connected")
    }
})

//連去MYSQL
app.post('/create',(req,res) => {
  
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;
    
      //輸入資料

      //MYSQL
    db.query('INSERT INTO employees (name, age , country , position, wage)VALUES(?,?,?,?,?)', 
    [name, age , country , position, wage],(err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("Valus Inserted");
        }
    }
    
    )
})
//MYSQL扲番DATA出黎
app.get('/employess', (req,res)=>{
    db.query("SELECT * FROM employees",(err, result) =>{
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }

    })
})

//update
app.put("/update", (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query(
      "UPDATE employees SET wage = ? WHERE id = ?",
      [wage, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

app.delete('/delete/:id', (req,res) =>{
    const id = req.params.id
    db.query("DELETE FROM employees WHERE id = ?",id,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
}) 


app.listen(3001, ()=>{
    console.log("Yey, your server is runnung on port 3001")

})