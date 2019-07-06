var router = require("express").Router();
var Controller = require('../controllers');
//router.use(require("./protection"));

//GET ROUTES:

//Get all User Data for logged in user**
router.get("/user", (req, res) => {
    //console.log("Hit /user route, user is: ",req.user);
    Controller.User.getOne(req.user._id)
        .then(result => res.json(result))
        .catch(err => res.json(
            {error: 
                {message: "Couldn't Retrieve User",
                value: err}
            }));
});

//Get all User Data for given user [Util route, remove upon deploy]
router.get("/user/:userId", (req, res) => {
    //console.log("Hit /user/:userName route, user is: ",req.user);
    Controller.User.getOne(req.params.userId)
        .then(result => res.json(result))
        .catch(err => res.json(
            {error: 
                {message: "Couldn't Retrieve User",
                value: err}
            }));
});

//Get 5 usernames like given username
router.get("/user/:userName/fuzzy", (req, res) => {
    //console.log("Get Fuzzy");
    Controller.User.getFuzzy(req.params.userName)
        .then(result => res.json(result))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve User",
                value: err}
            }));
});

//Get project data from db by user*
router.get("/projects", (req, res) => {
    //console.log("Hit /projects route, user is: ",req.user);
    Controller.Project.getAllByUser(req.user._id)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve Project",
                value: err}
            }));
});

router.get("/projects/user/:userId", (req, res) => {
    //console.log("Hit /projects route, user is: ",req.user);
    Controller.Project.getAllByUser(req.params.userId)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve Project",
                value: err}
            }));
});

//Get project data from db by project*
router.get("/project/:projectId", (req, res) => {
    //console.log("Hit /project/:projectId route, user is: ",req.user);
    Controller.Project.getOneById(req.params.projectId)
        .then(result => { res.json(result) })
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve Project",
                value: err}
            }));
});

//Get sprint data from db by project**
router.get("/sprints/:projectId", (req, res) => {
    // console.log("Hit /sprints/:projectId route, user is: ",req.user);
    Controller.Sprint
        .getAllByProject(req.params.projectId)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve Sprint",
                value: err}
            }));
});

//Get task data from db by project**(untested)
router.get("/tasks/project/:projectId", (req, res) => {
    //console.log("Hit /tasks/project/:projectId route, user is: ",req.user);
    Controller.Task
        .getAllByProject(req.params.projectId)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve Task",
                value: err}
            }));
});

//Get task data from db by sprint**
router.get("/tasks/sprint/:sprintId", (req, res) => {
    //console.log("Hit /tasks/:sprintId route, user is: ",req.user);
    Controller.Task
        .getAllBySprint(req.params.sprintId)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve Tasks",
                value: err}
            }));
});

//Get task data from db by user *
router.get("/tasks/user/:userId", (req, res) => {
    //console.log("Hit /tasks/:user route, user is: ",req.user);
    Controller.Task
        .getAllByUser(req.params.userId)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve Project",
                value: err}
            }));
});

//POST ROUTES:

//Create new user
router.post("/users/:userName", (req, res) => {
    //console.log("Hit /user route, user is: ",req.user);
    Controller.User.invite(req.params.userName)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Create User",
                value: err}
            }));
});

//Create new project**
router.post("/projects", (req, res) => {
    //console.log("Hit /projects route, user is: ",req.user);
    Controller.Project.create(req.body)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Create Project",
                value: err}
            }));
});

//Create new sprint**
router.post("/sprints", (req, res) => {
    //console.log("Hit /sprints route, user is: ",req.user);
    Controller.Sprint
        .create(req.body)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Create Sprint",
                value: err}
            }));
});

//Create new task**
router.post("/tasks", (req, res) => {
    //console.log("Hit /tasks route, user is: ",req.user);
    Controller.Task
        .create(req.body)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Create Task",
                value: err}}
        ));
});

//PUT ROUTES

//Edit a project**
router.put("/projects/:projectId", (req, res) => {
    //console.log("Hit /projects/:projectId route, user is: ",req.user);
    Controller.Project
        .updateOneById(req.params.projectId, req.body)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Edit Prjoect",
                value: err}
            }));
});

router.put("/projects/:projectId/addContributor/:userId", (req, res) => {
    //console.log("Hit /projects/add route, user is: ",req.user);
    Controller.Project.addUser(req.params, "contributor")
        .then(result => res.send(result))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Edit Prjoect",
                value: err}
            }));
});

router.put("/projects/:projectId/addOwner/:userId", (req, res) => {
    //console.log("Hit /projects/add route, user is: ",req.user);
    Controller.Project.addUser(req.params, "owner")
        .then(result => res.send(result))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Edit Prjoect",
                value: err}
            }));
});

router.put("/projects/:projectId/removeContributor/:userId", (req, res) => {
    //console.log("Hit /projects/remove route, user is: ",req.user);
    Controller.Project.removeUser(req.params, "contributor")
        .then(result => res.send(result))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Edit Prjoect",
                value: err}
            }));
});

router.put("/projects/:projectId/removeOwner/:userId", (req, res) => {
    //console.log("Hit /projects/remove route, user is: ",req.user);
    Controller.Project.removeUser(req.params, "owner")
        .then(result => res.send(result))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Edit Prjoect",
                value: err}
            }));
});

//Edit a sprint**
router.put("/sprints/:sprintId", (req, res) => {
    //console.log("Hit /sprints/:sprintId route, user is: ",req.user);
    Controller.Sprint
        .updateOneById(req.params.sprintId, req.body)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Update Sprint",
                value: err}
            }));
});

//Edit a task**
router.put("/tasks/:taskId", (req, res) => {
    console.log(req);
    console.log("Hit /tasks/:taskId route, user is: ", req.user);
    Controller.Task
        .updateOneById(req.params.taskId, req.body)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Update Task",
                value: err}
            }));
});

//DELETE ROUTES

//Delete a project**
router.delete("/projects/:projectId", (req, res) => {
    //console.log("Hit /projects/:projectId route, user is: ",req.user);
    Controller.Project
        .deleteOneById(req.params.projectId)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Delete Project",
                value: err}
            }));
});

//Delete a sprint**
router.delete("/sprints/:sprintId", (req, res) => {
    //console.log("Hit /sprints/:sprintId route, user is: ",req.user);
    Controller.Sprint
        .deleteOneById(req.params.sprintId)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Delete Sprint",
                value: err}
            }));
});

//Delete a task **
router.delete("/tasks/:taskId", (req, res) => {
    //console.log("Hit /tasks/:taskId route, user is: ",req.user);
    Controller.Task
        .deleteOneById(req.params.taskId)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Delete Project",
                value: err}
            }));
});

module.exports = router;
