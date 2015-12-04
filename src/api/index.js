import users from './users/';
import events from './events/';
import activities from './activities/';

export default function(app) {
  app.use('/api/users', users);
  app.use('/api/activities', activities);
  app.use('/api/events', events);
};
