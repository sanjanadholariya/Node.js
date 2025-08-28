const express = require('express');
const port = 3000;
const app = express();

let users = [];

app.set('view engine', 'ejs');

app.use(express.urlencoded())

app.get('/', (req, res) => {
  return res.render('users', {
    users: users
  });
})

app.get('/addusers', (req, res) => {
  return res.render('addusers');
})

app.post('/allusers', (req, res) => {

  const { name, email, password } = req.body;

  const obj = {
    id: Math.floor(Math.random() * 10000),
    name,
    email,
    password
  }

  users.push(obj);

  res.redirect('/')

})

app.get('/deleteuser', (req, res) => {
  let id = req.query.id
  const updatedUsers = users.filter(val => val.id != id);
  users = updatedUsers;
  res.redirect('/')
})

app.get('/edituser', (req, res) => {
  let id = req.query.id;
  console.log(id);
  let single = users.find((val) => val.id == id)
  res.render('edituser', {
    single: single
  })

})

app.post('/updatedusers', (req, res) => {
  const { id, editname, editemail, editpassword } = req.body;
  let up = users.map((val) => {
    if (val.id == id) {
      
      return{
        ...val,
        name : editname,
        email : editemail,
        password : editpassword
      }
    }
    return val;
  })
  console.log(up);
  
  users = up;
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);

})