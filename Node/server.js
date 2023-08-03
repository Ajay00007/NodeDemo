const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
//
// const multer = require('multer');

const path = require('path');
//
const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({ host: "localhost",
                                    user: "root",
                                    password: "root",
                                    database: "emplist" })
app.post("/register", (req, res) => {
const sql = "INSERT INTO register (`name`, `email`, `password`) VALUES (?)";

const values = [  
req.body.name,
req.body.email,
req.body.password,

 ]
db.query(sql, [values], (err, data) => {

if (err)  throw err;
return res.json(data);
})
})
app.get("/login/:email/:password", (req, res) => {
    const sql = "SELECT * FROM register";
     db.query(sql, (err, data) => {
         if (err) throw err;
         return res.json(data);
     });
 });

app.get("/emplist", (req, res) => {
   const sql = "SELECT * FROM emp";
    db.query(sql, (err, data) => {
        if (err) throw err;
        return res.json(data);
    });
});

app.get("/emp/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM emp where ID= ? ";
    db.query(sql, [id], (err, results) => {
        if (err)  throw err;
        return res.json(results);
    })
});

app.post("/addemp", (req, res) => {
    const sql = "INSERT INTO emp (`name`, `sex`, `dob`, `salary`, `department` ) VALUES (?)";
    const values = [
       req.body.name,
       req.body.sex,
       req.body.dob,
       req.body.salary,
       req.body.department,
    ]

    db.query(sql, [values], (err, data) => {
        if (err)  throw err;
        return res.json(data);
    })
})

// app.put("/user/edit/:id", (req, res) => {
//     //
//     const id = req.params.id;
//     //
//     const sql = "update emp set name = ?, sex = ?, dob = ?, salary = ?, department = ?  WHERE ID = ?";
//     const values = [req.body.name, req.body.sex, req.body.dob, req.body.salary, req.body.department]
//     const id = req.params.id;
//     db.query(sql, [...values, id], (err, data) => {
//         if (err) throw err;
//        return res.json(data);
//     })
// })

// app.put('/user/edit/:id', (req, res) => {

//     const id = req.params.id;
  
//     const { name, sex, dob, salary, department } = req.body;
  
//     // const image = req.file ? req.file.filename : '';
  
//     const sql = 'UPDATE emp SET name = ?, sex = ?, dob = ?, salary = ?, department = ? WHERE id = ?';
  
//     db.query(sql, [name, sex, dob, salary, department, id], (err, result) => {
  
//       if (err) {
  
//         throw err;
  
//       }
  
//       res.json({ message: 'Employee updated successfully' });
  
//     });
  
//   });

app.put('/user/edit/:id', (req, res) => {
    const id = req.params.id;
    const { name, sex, dob, salary, department } = req.body;
  
    const sql = 'UPDATE emp SET name = ?, sex = ?, dob = ?, salary = ?, department = ? WHERE id = ?';
  
    db.query(sql, [name, sex, dob, salary, department, id], (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            res.status(500).json({ error: 'An error occurred while updating employee' });
            return;
        }
        res.json({ message: 'Employee updated successfully' });
    });
});





app.delete("/delemp/:id", (req, res) => {
    const sql = "DELETE FROM emp WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err)  throw err;
        return res.json(data);

    })
})
app.listen(8080, () => { console.log("Started!!"); })
