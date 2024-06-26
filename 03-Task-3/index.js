const express = require("express");
const { v4: uuidv4 } = require("uuid");

const server = express();
const port = 5000;

server.use(express.json());
// server.use(express.urlencoded({ extended: false }));
// server.use(function (request, response, next) {
//   console.log(request.protocol, request.url, request.method);
//   next();
// });

server.get("/", function (request, response) {
  response.send("Hellloooo people");
});

let tasksArray = [];

server.post("/tasks", function (request, response) {
  console.log(request.body);
  const { title, body, status } = request.body;
  const newTask = {
    id: uuidv4(),
    title,
    body,
    status,
  };
  tasksArray.push(newTask);
  response.status(201).json(newTask);
});

// GET endpoint to get a list of all tasks
server.get("/taskArray", (request, response) => {
  response.json(tasksArray);
});

// GET endpoint to get a task by its ID
server.get("/tasks/:id", function (request, response) {
  const task = tasksArray.find((each) => each.id === request.params.id);
  console.log(task);
  if (task) {
    response.json(task);
  } else {
    response.status(404).json({ message: "Task not found" });
  }
});

// Start from here
// PUT endpoint to change the title and body of a task
server.put("/tasks/:id", (req, res) => {
  const task = tasksArray.find((each) => each.id === req.params.id);
  if (task) {
    const { title, body } = req.body;
    task.title = title;
    task.body = body;
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// PATCH endpoint to change the status of a task
server.patch("/tasks/:id/status", (req, res) => {
  const task = tasksArray.find((each) => each.id === req.params.id);
  if (task) {
    const { status } = req.body;
    task.status = status;
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

server.delete("/tasks/:id", (req, res) => {
  tasksArray = tasksArray.filter((t) => t.id !== req.params.id);
  res.send("Record deleted");
});

server.listen(port, function () {
  console.log("server is up");
});
