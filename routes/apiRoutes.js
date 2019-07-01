var router = require("express").Router();
var projectController = require("../controllers/projectController");
var sprintController = require("../controllers/projectController");
var taskController = require("../controllers/projectController");
var userController = require("../controllers/userController");



//router.use(require("./protection"));

//GET ROUTES:

//Get User Data*
router.get("/user", (req, res) => {
    console.log("Hit /user route, user is: ",req.user);
    res.json(req.user);
});


//Get sprint data from db by project*
router.get("/sprints/:projectId", (req, res) => {
    console.log("Hit /sprints/:projectId route, user is: ",req.user);
    sprintController
        .getAllbyProject(req.params.projectId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Get task data from db by sprint*
router.get("/tasks/:sprintId", (req, res) => {
    console.log("Hit /tasks/:sprintId route, user is: ",req.user);
    taskController
        .getAllbySprint(req.params.sprintId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Get task data from db by user *
router.get("/tasks/:user", (req, res) => {
    console.log("Hit /tasks/:user route, user is: ",req.user);
    taskController
        .getAllByUser(req.params.user)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//POST ROUTES:

//Find/Create a new user if necessary*
router.post("/user", (req, res) => {
    console.log("Hit /user route, user is: ",req.user);
    userController
        .findOrCreate(req.user) //Double check that this is correct
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Create new project*
router.post("/projects", (req, res) => {
    console.log("Hit /projects route, user is: ",req.user);
    projectController
        .create(req.body)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Create new sprint*
router.post("/sprints", (req, res) => {
    console.log("Hit /sprints route, user is: ",req.user);
    sprintController
        .create(req.body)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Create new task*
router.post("/tasks", (req, res) => {
    console.log("Hit /tasks route, user is: ",req.user);
    taskController
        .create(req.body)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//PUT ROUTES

//Edit a project*
router.put("/projects/:projectId", (req, res) => {
    console.log("Hit /projects/:projectId route, user is: ",req.user);
    projectController
        .updateOneById(req.body.params.projectId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Edit a sprint*
router.put("/sprints/:sprintId", (req, res) => {
    console.log("Hit /sprints/:sprintId route, user is: ",req.user);
    sprintController
        .updateOneById(req.params.sprintId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Edit a task*
router.put("/tasks/:taskId", (req, res) => {
    console.log("Hit /tasks/:taskId route, user is: ",req.user);
    taskController
        .updateOneById(req.params.taskId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//DELETE ROUTES

//Delete a project*
router.delete("/projects/:projectId", (req, res) => {
    console.log("Hit /projects/:projectId route, user is: ",req.user);
    projectController
        .deleteOneById(req.params.projectId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Delete a sprint*
router.delete("/sprints/:sprintId", (req, res) => {
    console.log("Hit /sprints/:sprintId route, user is: ",req.user);
    sprintController
        .deleteOneById(req.params.sprintId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));

});

//Delete a task
router.delete("/tasks/:taskId", (req, res) => {
    console.log("Hit /tasks/:taskId route, user is: ",req.user);
    taskController
        .deleteOneById(req.params.taskId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});




module.exports = router;
