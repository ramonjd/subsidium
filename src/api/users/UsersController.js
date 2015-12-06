import User from './UserModel';

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

  createUser(req, res, next) {
    var user =  new User({
      username : req.body.username,
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


    //
    // {
    //   id: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     index: true,
    //     default: mongoose.Types.ObjectId
    //   },
    //   password: String,
    //   username: {
    //     type: String,
    //     default: '',
    //     required: true
    //   },
    //   contact : {
    //     mobile : { type: String, default: ''},
    //     email : { type: String, default: ''}
    //   },
    //   dateJoined: { type: Date, default: Date.now }
    // }



    // User.findOne({email: req.body.email}, function(err, existingUser) {
    //   if(existingUser) {
    //     req.flash('errors', { msg: 'Account with that email address already exists' });
    //   }
    //   user.save(function(err) {
    //     if(err) return next(err);
    //     req.logIn(user, function(err) {
    //       if(err) return next(err);
    //       console.log('Successfully created');
    //       res.end('Success');
    //     });
    //   });
    // });

  }

};
export default UsersController;
