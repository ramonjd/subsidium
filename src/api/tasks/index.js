import express from 'express';
import TasksController from './TasksController';

let router = express.Router();
router.get('/', TasksController.all);
router.post('/', TasksController.createTask);

module.exports = router;
