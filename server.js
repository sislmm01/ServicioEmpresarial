const express = require('express')
const db = require('./database.js');

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
  const {username, password, firstname, lastname, email} = req.body
  const sql = `
    INSERT INTO users (username, password, firstname, lastname, email) 
    VALUES ('${username}', '${password}', '${firstname}', '${lastname}', '${email}');`;
  db.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ message: `error: ${error}` })
    } else {
      res.status(201).json({ message: "User created successfully" })
    }
  })
})

app.put("/edit/:id", (req, res) => {
  const {username, password, firstname, lastname, email} = req.body
  const sql = `
    UPDATE users
    Set username = '${username}', 
        password = '${password}',
        firstname = '${firstname}',
        lastname = '${lastname}',
        email = '${email}'
    WHERE id = ${req.params.id};`;
  db.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ message: `error: ${error}` })
    } else {
      res.status(201).json({ message: "User updated successfully" })
    }
  })
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