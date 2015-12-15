import User from './UserModel'

const UsersController  = {

  all(req, res, next) {
    User.find({}).exec(function(err, users) {
      if (!err) {
        res.json(users);
      } else {
        res.json(500, err);
        console.log('Error UsersController:all');
      }
    });
  },

  getUserById(req, res, next) {
    User.findById(req.params.id, function (err, user) {
      if (!err) {
        res.json(user);
      } else {
        res.json(500, err);
        console.log('Error UsersController:getUserById');
      }
    });
  },


  updateUserById(req, res, next) {
    var updateObject = req.body;
    User.
      findByIdAndUpdate(req.body.id, updateObject, (err, user) => {
        if (!err) {
          res.json(user);
        } else {
          res.json(422, err);
          console.log('Error UsersController:updateUserById');
        }
    });
  },
  deleteUserById(req, res, next) {
    User.
      findByIdAndRemove(req.params.id, (err, user) => {
        if (!err) {
          res.json(200, user);
        } else {
          res.json(422, err);
          console.log('Error UsersController:deleteUserById');
        }
    });
  },
  createUser(req, res, next) {
    var user =  new User({
      name : req.body.name,
      email : req.body.email
    });

    user.save((err) => {
      if (!err) {
        res.json(201, user);
      } else {
        console.log('Error UsersController:createUser');
        return next(err);
      }
    });

  }

};
export default UsersController;
