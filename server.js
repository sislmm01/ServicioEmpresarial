const express = require('express')
const db = require('./database.js');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
// const multer = require('multer');
const cors = require('cors');

const app = express()
const port = 3000
// const upload = multer() // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors()); // to allow connections to localhost

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// get users
app.get('/users', (req, res) => {
  const sql = "SELECT * FROM users;"
  db.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ message: `error: ${error}` })
    } else {
      res.status(200).json({ message: "success", response: results })
    }
  });
})

// create user
app.post('/new', (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    const {username, password, firstname, lastname, email} = fields;
    const sql = `
      INSERT INTO users (username, password, firstname, lastname, email) 
      VALUES ('${username[0]}', '${password[0]}', '${firstname[0]}', '${lastname[0]}', '${email[0]}');`;
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ message: `error: ${error}` })
      } else {
        res.status(201).json({ message: "User created successfully" })
      }
    })
  });
})

app.get("/user/:id", (req, res) => {
  const sql = `SELECT * FROM users WHERE id = ${req.params.id};`;
  db.query(sql, (error, result) => {
    if (error) {
      res.status(500).json({ message: `error: ${error}` })
    } else {
      if (result) {
        res.status(200).json({ message: "success", user: result[0] })
      } else {
        res.status(200).json({ message: "User not found", user: null })
      }
    }
  })
})

app.put("/edit/:id", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    const sql = `
      UPDATE users
      Set username = '${fields.username[0]}', 
          firstname = '${fields.firstname[0]}',
          lastname = '${fields.lastname[0]}',
          email = '${fields.email[0]}'
      WHERE id = ${req.params.id};`;
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ message: `error: ${error}` })
      } else {
        res.status(201).json({ message: "User updated successfully" })
      }
    })
  });
})

// DELETE
app.delete("/delete/:id", (req, res) => {
  
  const sql = `
    DELETE FROM users        
    WHERE id = ${req.params.id};`;
  db.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ message: `error: ${error}` })
    } else {
      res.status(200).json({ message: "User deleted successfully" })
    }
  })
})


app.listen(port, () => {
  console.log(`Node app listening at http://localhost:${port}`)
})