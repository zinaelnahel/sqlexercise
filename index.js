require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { Pool, Client } = require("pg");
console.log(process.env);
const pool = new Pool();
app.use(express.json());
// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res.rows);
//   pool.end();
// });
// app.get("/api/users", (req, res) => {
//   pool
//     .query("SELECT * FROM users;")
//     .then((data) => res.json(data.rows))
//     .catch((err) => res.status(500).send(err.message));
// });
// app.get("/api/users/:id", (req, res) => {
//   const { id } = req.params;

//   const getOneUser = {
//     text: "SELECT * FROM users WHERE id=$1",
//     values: [id],
//   };

app.get("/api/blogs", (req, res) => {
  pool
    .query("SELECT * FROM blogs;")
    .then((data) => res.json(data.rows))
    .catch((err) => res.status(500).send(err.message));
});
app.get("/api/blogs/:id", (req, res) => {
  const { id } = req.params;

  const getOneBlog = {
    text: "SELECT * FROM blogs WHERE id=$1",
    values: [id],
  };

  pool
    .query(getOneBlog)
    .then((data) => res.json(data.rows))
    .catch((e) => res.status(500).send(e.message));
});
app.post("/api/blogs",(req,res)=>{
  console.log(req.body);
  const{id , blog_title, content, author} = req.body;
  const createOneBlog={
    text: "INSERT INTO blogs (id, blog_title, content, author ) VALUES($1, $2, $3, $4) RETURNING *",
    values: [id , blog_title, content, author], 
  };
   pool
  .query(createOneBlog)
.then((data) => res.status(201).json(data.rows))
 .catch((e) => res.status(500).send(e.message));
 });

// app.post("/api/users", (req, res) => {
//   console.log(req.body);
//   // start by destructuring what you need from the body of the request
//   const { id, first_name, last_name, age, active } = req.body;

//   const createOneUser = {
//     text: "INSERT INTO users (id, first_name, last_name, age, active ) VALUES($1, $2, $3, $4,$5) RETURNING *",
//     values: [id, first_name, last_name, age, active],
//   };

//   // launch your query
//   pool
//     .query(createOneUser)
//     .then((data) => res.status(201).json(data.rows))
//     .catch((e) => res.status(500).send(e.message));
// });
// app.put("/api/users/:id", (req, res) => {
//   const { id, first_name, last_name, age, active } = req.body;

//   const updateOneUser = {
//     text: "UPDATE users SET id=$1, first_name=$2, last_name=$3 , age=$4, active=$5 WHERE id=$1 RETURNING *",
//     values: [id, first_name, last_name, age, active],
//   };

//   pool
//     .query(updateOneUser)
//     .then((data) => res.json(data.rows))
//     .catch((e) => res.status(500).send(e.message));
// });
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
