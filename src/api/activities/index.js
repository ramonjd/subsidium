import express from 'express';
import ActivitiesController from './ActivitiesController';

let router = express.Router();
router.get('/', ActivitiesController.all);
router.post('/', ActivitiesController.createActivity);

module.exports = router;
