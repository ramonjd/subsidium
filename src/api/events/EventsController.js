import Event from './EventModel';

//
// var today = moment().startOf('day')
// var tomorrow = moment(today).add(1, 'days')
//
// MyModel.find({
//   createdAt: {
//     $gte: today.toDate(),
//     $lt: tomorrow.toDate()
//   }
// })

const UsersController  = {

  all(req, res, next) {
    Event.
      find({}).
      exec((err, users) => {
      if (!err) {
        res.json(users);
      } else {
        console.log('Error EventModel:all');
      }
    });
  },

  getEventById(){
    Event.
      findById(req.params.id, (err, event) => {
      if (!err) {
        res.json(event);
      } else {
        console.log('Error EventModel:getEventById');
      }
    });
  },

  getEventsByDate(){},

  getEventsByUserId(){

  },

  getUpcomingEventsByUserId(){
    Event.
      find({
        userId: req.params.userId,
        startDate: { $gte: new Date()},
      }).
      sort({startDate: 'desc'}).
      exec((err, events) => {
        if (!err) {
          res.json(events);
        } else {
          console.log('Error EventModel:getUpcomingEventsByUserId');
        }
      });
  },

  deleteEventById(){},

  createEvent(req, res, next) {

    var event =  new Event({

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
    //   name: {
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
