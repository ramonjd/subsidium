import express from 'express';
import UsersController from './UsersController';

let router = express.Router();
router.get('/', UsersController.all);
router.post('/', UsersController.createUser);
router.put('/', UsersController.updateUserById);

module.exports = router;