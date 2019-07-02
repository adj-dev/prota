export default class mockData {
  constructor() {
    this.tasks = [
      {
        _id: 'MVP_1',
        title: "Do something",
        assignee: {
          username: "testguy",
          display_name: "Testee Mctesterson",
          avatar_url: "https://avatars3.githubusercontent.com/u/14286088?v=4"
        },
        description: "DO IT. JUST DO IT. DON'T LET YOUR DREAMS BE DREAMS",
        status: "IN_PROGRESS"
      },
      {
        _id: 'MVP_2',
        title: "Do something else",
        assignee: {},
        description: "You got this.",
        status: "OPEN"
      }
    ];
    this.sprints = [
      {
        name: "MVP_1",
        start_date: Date.now(),
        end_date: Date.now() + 10,
        status: "IN_PROGRESS",
        tasks: this.tasks
      },
      {
        name: "MVP_2",
        start_date: Date.now(),
        end_date: Date.now() + 10,
        status: "DONE",
        tasks: [
          {
            title: "Something new here!!!!",
            assignee: {},
            description: "You got this.",
            status: "OPEN"
          }
        ]
      }
    ];
    this.projects = [
      {
        _id: "1",
        name: "First Project",
        created_by: "Andrew Johnson",
        owners: ["John", "Andrew"],
        contributors: ["Testee McTesterson", "Nhu", "Adam"],
        status: "ON_TRACK",
        sprints: this.sprints
      },
      {
        _id: "2",
        name: "Second Project",
        created_by: "Richie Nhu",
        owners: ["John", "Andrew"],
        contributors: ["Testee McTesterson", "Kieran", "Nhu", "Adam"],
        status: "AT_RISK",
        sprints: this.sprints
      },
      {
        _id: "3",
        name: "Third Project",
        created_by: "Andrew John",
        owners: ["John", "Andrew"],
        contributors: ["Testee McTesterson", "Nhu", "Adam"],
        status: "ON_TRACK",
        sprints: this.sprints
      },
      {
        _id: "4",
        name: "Fourth Project",
        created_by: "Andrew John",
        owners: ["John", "Andrew"],
        contributors: ["Testee McTesterson", "Nhu", "Adam"],
        status: "ON_TRACK",
        sprints: this.sprints
      }
    ];

    this.user = {
      username: "testguy",
      display_name: "Testee McTesterson",
      avatar_url: "https://avatars3.githubusercontent.com/u/14286088?v=4",
      projects: this.projects
    };
  }

  getUser = () => {
    return this.user;
  };
  getProjects = () => {
    return this.projects;
  };
  getSprints = () => {
    return this.sprints;
  };
  getTasks = () => {
    return this.tasks;
  };
  getTasksBySprintId = id => {
    let result = [];
    this.tasks.forEach(task => {
      if (task._id === id) {
        result.push(task);
      }
    })
    return result;
  }
}
