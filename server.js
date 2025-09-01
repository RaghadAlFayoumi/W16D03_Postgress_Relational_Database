const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");
app.use(express.json());
const { pool } = require("./db");
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const query = `INSERT INTO users (name, email) VALUES ($1,$2) RETURNING * `;
  const users = [name, email];
  pool.query(query, users)
  .then((result) => {
    res
      .status(201)
      .json({
        message: "user created",
        user: result.rows,
      }) 
  })
  .catch((err) => {
    res.status(400).json({
      message: err.message,
    });
  });
})
  app.post("/orders", (req, res) => {
    const { price, user_id } = req.body;
    const query = `INSERT INTO users (price ,user_id) VALUES ($1,$2) RETURNING id,price,user_id,created_at  `;
    const order = [price, user_id];
    pool.query(query,order)
    .then((result) => {
        res
          .status(201)
          .json({
            message: "order created",
            user: result.rows,
          }) 
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });

    
    
    

  });


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server run on http://localhost:${PORT}`);
});
