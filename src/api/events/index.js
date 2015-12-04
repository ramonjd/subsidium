import express from 'express';
import EventsController from './EventsController';

let router = express.Router();
router.get('/', EventsController.all);

module.exports = router;
