var router = require("express").Router();
var Controller = require('../controllers');
//router.use(require("./protection"));

//GET ROUTES:

//Get all User Data for logged in user**
router.get("/user", (req, res) => {
    //console.log("Hit /user route, user is: ",req.user);
    Controller.User.getOne(req.user.username)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

//Get all User Data for given user [Util route, remove upon deploy]
router.get("/user/:userName", (req, res) => {
    //console.log("Hit /user/:userName route, user is: ",req.user);
    Controller.User.getOne(req.params.userName)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

//Get 5 usernames like given username
router.get("/user/:userName/fuzzy", (req, res) => {
    //console.log("Get Fuzzy");
    Controller.User.getFuzzy(req.params.userName)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

//Get project data from db by user*
router.get("/projects", (req, res) => {
    //console.log("Hit /projects route, user is: ",req.user);
    Controller.Project.getAllByUser(req.user.username)
        .then(results => res.json(results))
        .catch(err => res.json(err));
});

router.get("/projects/user/:userName", (req, res) => {
    //console.log("Hit /projects route, user is: ",req.user);
    Controller.Project.getAllByUser(req.params.userName)
        .then(results => res.json(results))
        .catch(err => res.json(err));
});

//Get project data from db by project*
router.get("/project/:projectId", (req, res) => {
    //console.log("Hit /project/:projectId route, user is: ",req.user);
    Controller.Project.getOneById(req.params.projectId)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

//Get sprint data from db by project**
router.get("/sprints/:projectId", (req, res) => {
    // console.log("Hit /sprints/:projectId route, user is: ",req.user);
    Controller.Sprint
        .getAllByProject(req.params.projectId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Get task data from db by project**(untested)
router.get("/tasks/project/:projectId", (req, res) => {
    //console.log("Hit /tasks/project/:projectId route, user is: ",req.user);
    Controller.Task
        .getAllByProject(req.params.projectId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Get task data from db by sprint**
router.get("/tasks/sprint/:sprintId", (req, res) => {
    //console.log("Hit /tasks/:sprintId route, user is: ",req.user);
    Controller.Task
        .getAllBySprint(req.params.sprintId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Get task data from db by user *
router.get("/tasks/user/:userId", (req, res) => {
    //console.log("Hit /tasks/:user route, user is: ",req.user);
    Controller.Task
        .getAllByUser(req.params.userId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//POST ROUTES:

//Create new user
router.post("/users/:userName", (req, res) => {
    //console.log("Hit /user route, user is: ",req.user);
    Controller.User.create({"username": req.params.userName})
        .then(results => res.json(results))
        .catch(err => res.json(err));
});

//Create new project**
router.post("/projects", (req, res) => {
    //console.log("Hit /projects route, user is: ",req.user);
    Controller.Project.create(req.body)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Create new sprint**
router.post("/sprints", (req, res) => {
    //console.log("Hit /sprints route, user is: ",req.user);
    Controller.Sprint
        .create(req.body)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Create new task**
router.post("/tasks", (req, res) => {
    //console.log("Hit /tasks route, user is: ",req.user);
    Controller.Task
        .create(req.body)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//PUT ROUTES

//Edit a project**
router.put("/projects/:projectId", (req, res) => {
    //console.log("Hit /projects/:projectId route, user is: ",req.user);
    Controller.Project
        .updateOneById(req.params.projectId, req.body)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

router.put("/projects/:projectId/addContributor/:userName", (req, res) => {
    //console.log("Hit /projects/add route, user is: ",req.user);
    Controller.Project.addUser(req.params, "contributor");
    res.json("Route Reached");
});

router.put("/projects/:projectId/addOwner/:userName", (req, res) => {
    //console.log("Hit /projects/add route, user is: ",req.user);
    Controller.Project.addUser(req.params, "owner");
    res.json("Route Reached");
});

router.put("/projects/:projectId/removeContributor/:userName", (req, res) => {
    //console.log("Hit /projects/remove route, user is: ",req.user);
    Controller.Project.removeUser(req.params, "contributor");
    res.json("Route Reached");
});

router.put("/projects/:projectId/removeOwner/:userName", (req, res) => {
    //console.log("Hit /projects/remove route, user is: ",req.user);
    Controller.Project.removeUser(req.params, "owner");
    res.json("Route Reached");
});

//Edit a sprint**
router.put("/sprints/:sprintId", (req, res) => {
    //console.log("Hit /sprints/:sprintId route, user is: ",req.user);
    Controller.Sprint
        .updateOneById(req.params.sprintId, req.body)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Edit a task**
router.put("/tasks/:taskId", (req, res) => {
    //console.log("Hit /tasks/:taskId route, user is: ",req.user);
    Controller.Task
        .updateOneById(req.params.taskId, req.body)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//DELETE ROUTES

//Delete a project**
router.delete("/projects/:projectId", (req, res) => {
    //console.log("Hit /projects/:projectId route, user is: ",req.user);
    Controller.Project
        .deleteOneById(req.params.projectId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Delete a sprint**
router.delete("/sprints/:sprintId", (req, res) => {
    //console.log("Hit /sprints/:sprintId route, user is: ",req.user);
    Controller.Sprint
        .deleteOneById(req.params.sprintId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

//Delete a task **
router.delete("/tasks/:taskId", (req, res) => {
    //console.log("Hit /tasks/:taskId route, user is: ",req.user);
    Controller.Task
        .deleteOneById(req.params.taskId)
        .then(results =>res.json(results))
        .catch(err => res.json(err));
});

module.exports = router;
