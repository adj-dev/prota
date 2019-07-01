var router = require("express").Router();
var projectController = require("../controllers/projectController");
var sprintController = require("../controllers/projectController");
var taskController = require("../controllers/projectController");
var userController = require("../controllers/userController");



//router.use(require("./protection"));

//GET ROUTES:

//Get User Data
router.get("/user", (req, res) => {
    console.log("Hit /user route, user is: ",req.user);
    res.json(req.user);
});


//Get sprint data from db by project
router.get("/sprints/:projectId", (req, res) => {
    console.log("Hit /sprints/:projectId route, user is: ",req.user);

});

//Get task data from db by sprint
router.get("/tasks/:sprintId", (req, res) => {
    console.log("Hit /tasks/:projectId route, user is: ",req.user);

});

//Get task data from db by user
router.get("/tasks/:sprintId", (req, res) => {
    console.log("Hit /tasks/:sprintId route, user is: ",req.user);
});

//POST ROUTES:

//Find/Create a new user if necessary
router.post("/user", (req, res) => {
    console.log("Hit /user route, user is: ",req.user);

});

//Create new project
router.post("/projects", (req, res) => {
    console.log("Hit /projects route, user is: ",req.user);

});

//Create new sprint
router.post("/sprints", (req, res) => {
    console.log("Hit /sprints route, user is: ",req.user);

});

//Create new task
router.post("/tasks", (req, res) => {
    console.log("Hit /tasks route, user is: ",req.user);

});

//PUT ROUTES

//Edit a project
router.put("/projects/:projectId", (req, res) => {
    console.log("Hit /projects/:projectId route, user is: ",req.user);

});

//Edit a sprint
router.put("/sprints/:sprintId", (req, res) => {
    console.log("Hit /sprints/:sprintId route, user is: ",req.user);

});

//Edit a task
router.put("/tasks/:taskId", (req, res) => {
    console.log("Hit /tasks/:taskId route, user is: ",req.user);

});

//DELETE ROUTES

//Delete a project
router.delete("/projects/:projectId", (req, res) => {
    console.log("Hit /projects/:projectId route, user is: ",req.user);

});

//Delete a sprint
router.delete("/sprints/:sprintId", (req, res) => {
    console.log("Hit /sprints/:sprintId route, user is: ",req.user);

});

//Delete a task
router.delete("/tasks/:taskId", (req, res) => {
    console.log("Hit /tasks/:taskId route, user is: ",req.user);

});




module.exports = router;
