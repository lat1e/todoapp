const express = require('express')
const app = express()
const port = 3000


let todos = [];

// application/json
app.use(express.json());
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/Test', (req, res) => {
  res.send('Hello World!')
})

app.post('/add', function(req, res){
    todos = req.body;
    res.send(req.body);    // JSON 응답
});

app.get('/todos', function(req, res){
    console.log("todos: " + todos);
    res.json(todos);
});

// simple file server using express
app.use(express.static('../client'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})