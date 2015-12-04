import Activity from './ActivityModel';


const ActivitiesController  = {

  all(req, res, next) {
    Activity.
      find({}).
      exec((err, users) => {
      if (!err) {
        res.json(users);
      } else {
        console.log('Error ActivitiesController:all');
        return next(err);
      }
    });
  },

  createActivity(req, res, next) {

    var activity =  new Activity({
      name: req.body.name,
      description: req.body.description,
      type : req.body.type
    });

    activity.save((err) => {
      if (!err) {
        res.json(201, activity);
      } else {
        console.log('Error ActivitiesController:createActivity');
        return next(err);
      }
    });

  }

};
export default ActivitiesController;
