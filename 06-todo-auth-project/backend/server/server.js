require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const cors = require("cors");

const { User } = require("./models/user");
const { Todo } = require("./models/todo");
var { mongoose } = require("./db/mongoose");
const { authenticate } = require("./middleware/authenticate");

const app = express();
const port = process.env.PORT;

// MIDDLEWWARE
app.use(bodyParser.json());
app.use(cors());

// TODOS

app.post("/todos", authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _userId: req.user._id
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos", authenticate, async (req, res) => {
  try {
    const todos = await Todo.find({ _userId: req.user._id });
    if (!todos) {
      return res.status(404).send();
    }
    res.send({ todos });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/todos/:id", authenticate, async (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    const todo = await Todo.findOne({ _id: id, _userId: req.user._id });
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete("/todos/:id", authenticate, async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    const todo = await Todo.findOneAndRemove({
      _id: id,
      _userId: req.user._id
    });
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch("/todos/:id", authenticate, async (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, _userId: req.user._id },
      { $set: body },
      { new: true }
    );
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  } catch (e) {
    res.status(400).send(e);
  }
});

// USERS

app.post("/users", async (req, res) => {
  try {
    const body = _.pick(req.body, ["email", "password"]);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    const data = {
      user,
      token
    };
    res.header("x-auth", token).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.post("/users/login", async (req, res) => {
  try {
    var body = _.pick(req.body, ["email", "password"]);
    var userObj = new User(body);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    const data = {
      user,
      token
    };
    res.header("x-auth", token).send(data);
  } catch (e) {
    res.status(400).send();
  }
});

app.delete("/users/me/token", authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(port, () => {
  //console.log(`Started on port ${port}`);
});

module.exports = { app };
