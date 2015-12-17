import User from './UserModel'

const UsersController  = {

  all(req, res, next) {
    User.find({}).exec(function(err, users) {
      if (!err) {
        res.status(200).json(users)
      } else {
        res.status(500).json(err)
        console.log('Error UsersController:all');
      }
    });
  },

  getUserById(req, res, next) {
    User.findById(req.params.id, function (err, user) {
      if (!err) {
        res.json(user);
      } else {
        res.status(500).json(err)
        console.log('Error UsersController:getUserById');
      }
    });
  },


  updateUserById(req, res, next) {

    User.
      findByIdAndUpdate(req.body.id, req.body.data, {new : true}, (err, user) => {
        if (!err) {
          res.status(200).json(user)
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
          res.status(200).json(user)
        } else {
          res.status(422).json(err)
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
        res.status(201).json(user)
      } else {
        console.log('Error UsersController:createUser');
        return next(err);
      }
    });

  }

};
export default UsersController;
