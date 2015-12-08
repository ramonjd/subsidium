import users from './users/';
import events from './events/';
import tasks from './tasks/';

export default function(app) {
  app.use('/api/users', users);
  app.use('/api/tasks', tasks);
  app.use('/api/events', events);
};
