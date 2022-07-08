const express = require("express");
const { Router } = require("express");
const pool = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");

// app.use(
//   cookieSession({
//     name: "session",
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours
//   })
// );

router.get("/", (request, response, next) => {
  pool.query("SELECT * FROM creators ORDER BY id ASC", (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.get("/:id", (request, response, next) => {
  const { id } = request.params;

  pool.query("SELECT * FROM creators WHERE id=$1", [id], (err, res) => {
    if (err) return next(err);
    if (res.rows.length === 0)
      return response.json({
        error: true,
        message: "The creator does not exist",
      });
    response.json(res.rows[0]);
  });
});

//CREATE ROUTE FOR CREATORS/QUIZ

router.get("/:id/quizzes", (request, response, next) => {
  const { id } = request.params;

  pool.query("SELECT * FROM quizzes WHERE creators_id=$1", [id], (err, res) => {
    if (err) return next(err);
    if (res.rows.length === 0)
      return response.json({
        error: true,
        message: "There are no quizzes under this user",
      });
    response.json(res.rows);
  });
});

router.post("/", (request, response, next) => {
  const { username, email, first_name, last_name, password } = request.body;

  pool.query(
    "INSERT INTO creators (username, email, first_name, last_name, password) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [username, email, first_name, last_name, bcrypt.hashSync(password, 8)],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows[0]);
    }
  );
});

router.put("/:id", (request, response, next) => {
  const { id } = request.params;
  const keys = ["username", "email", "first_name", "last_name", "password"];

  const fields = [];

  keys.forEach((key) => {
    if (request.body[key]) fields.push(key);
  });

  fields.forEach((field, index) => {
    pool.query(
      `UPDATE creators SET ${field}=($1) WHERE id=($2)`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err);
        if (index === fields.length - 1) response.redirect("/creators");
      }
    );
  });
});

router.delete("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query("DELETE FROM creators WHERE id=($1)", [id], (err, res) => {
    if (err) return next(err);

    response.redirect("/creators");
  });
});

//FOR SIGN-IN

router.post("/signin", (request, response, next) => {
  const { username, password } = request.body;

  pool.query(
    "SELECT * FROM creators WHERE username=$1",
    [username],
    (err, res) => {
      if (err) return next(err);
      if (res.rows.length === 0)
        return response.json({
          error: true,
          message: "The username does not exist",
        });

      response.json(res.rows[0]);
      const user = res.rows[0];
      console.log("USER ID", user);

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!",
        });
      }

      //   const token = jwt.sign({ id: user.id }, "brushUp-secet-key", {
      //     expiresIn: 86400, // 24 hours
      //   });

      //   request.session.token = token;

      //   return res.status(200).send({
      //     id: user.id,
      //     username: user.username,
      //   });
    }
  );
});

router.post("/signout", (request, response) => {
  request.session = null;
  return request.status(200).send({
    message: "You've been signed out!",
  });
  if (err) return next(err);
});

module.exports = router;
