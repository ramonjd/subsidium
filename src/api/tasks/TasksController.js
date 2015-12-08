import Task from './TaskModel';


const TasksController  = {

  all(req, res, next) {
    Task.
      find({}).
      exec((err, users) => {
      if (!err) {
        res.json(users);
      } else {
        console.log('Error TasksController:all');
        return next(err);
      }
    });
  },

  createTask(req, res, next) {

    var task =  new Task({
      name: req.body.name,
      description: req.body.description,
      type : req.body.type
    });

    task.save((err) => {
      if (!err) {
        res.json(201, task);
      } else {
        console.log('Error TasksController:createTask');
        return next(err);
      }
    });

  }

};
export default TasksController;
