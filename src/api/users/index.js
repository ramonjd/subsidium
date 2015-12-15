import express from 'express';
import UsersController from './UsersController';

let router = express.Router();
router.get('/', UsersController.all);
router.get('/:id', UsersController.getUserById);
router.post('/', UsersController.createUser);
router.put('/', UsersController.updateUserById);
router.delete('/', UsersController.deleteUsersById);

module.exports = router;
