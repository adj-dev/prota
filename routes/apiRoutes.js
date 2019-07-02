var router = require("express").Router();
var Controller = require('../controllers');
//router.use(require("./protection"));

//GET ROUTES:

//Get User Data**
router.get("/user", (req, res) => {
    //console.log("Hit /user route, user is: ",req.user);
    res.json(req.user);
});

router.get("/user/:userName", (req, res) => {
    //console.log("Hit /user/:userName route, user is: ",req.user);
    Controller.User.getOne(req.params.userName)
        .then(result => res.json(result));
});

router.get("/user/:userName/fuzzy", (req, res) => {
    //console.log("Get Fuzzy");
    Controller.User.getFuzzy(req.params.userName)
        .then(result => res.json(result));
});

//Get project data from db by user*
router.get("/projects", (req, res) => {
    //console.log("Hit /projects route, user is: ",req.user);
    Controller.Project.getAllByUser("5d193074b909d55f1c48a7c9")
        .then(results => res.json(results))
        .catch(err => res.json(err));
});

//Get project data from db by project*
router.get("/project/:projectId", (req, res) => {
    
});

//Get sprint data from db by project**
router.get("/sprints/:projectId", (req, res) => {
    console.log("Hit /sprints/:projectId route, user is: ",req.user);
    Controller.sprintController
        .getAllbyProject(req.params.projectId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Get task data from db by sprint**
router.get("/tasks/sprint/:sprintId", (req, res) => {
    console.log("Hit /tasks/:sprintId route, user is: ",req.user);
    Controller.taskController
        .getAllbySprint(req.params.sprintId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Get task data from db by user *
router.get("/tasks/user/:userId", (req, res) => {
    console.log("Hit /tasks/:user route, user is: ",req.user);
    Controller.taskController
        .getAllByUser(req.params.userId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//POST ROUTES:

//Find/Create a new user if necessary*
//router.post("/user", Controller.userController.findOrCreate);

//Create new project**
router.post("/projects", (req, res) => {
    console.log("Hit /projects route, user is: ",req.user);
    Controller.projectController.create(req.body)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Create new sprint**
router.post("/sprints", (req, res) => {
    console.log("Hit /sprints route, user is: ",req.user);
    Controller.sprintController
        .create(req.body)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Create new task**
router.post("/tasks", (req, res) => {
    console.log("Hit /tasks route, user is: ",req.user);
    Controller.taskController
        .create(req.body)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//PUT ROUTES

//Edit a project**
router.put("/projects/:projectId", (req, res) => {
    console.log("Hit /projects/:projectId route, user is: ",req.user);
    Controller.projectController
        .updateOneById(req.body.params.projectId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Edit a sprint**
router.put("/sprints/:sprintId", (req, res) => {
    console.log("Hit /sprints/:sprintId route, user is: ",req.user);
    Controller.sprintController
        .updateOneById(req.params.sprintId, req.body)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Edit a task**
router.put("/tasks/:taskId", (req, res) => {
    console.log("Hit /tasks/:taskId route, user is: ",req.user);
    Controller.taskController
        .updateOneById(req.params.taskId, req.body)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//DELETE ROUTES

//Delete a project**
router.delete("/projects/:projectId", (req, res) => {
    console.log("Hit /projects/:projectId route, user is: ",req.user);
    Controller.projectController
        .deleteOneById(req.params.projectId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Delete a sprint**
router.delete("/sprints/:sprintId", (req, res) => {
    console.log("Hit /sprints/:sprintId route, user is: ",req.user);
    Controller.sprintController
        .deleteOneById(req.params.sprintId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));

});

//Delete a task **
router.delete("/tasks/:taskId", (req, res) => {
    console.log("Hit /tasks/:taskId route, user is: ",req.user);
    Controller.taskController
        .deleteOneById(req.params.taskId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});




module.exports = router;
