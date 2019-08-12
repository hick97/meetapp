import express from 'express';

import UserController from './app/controllers/UserController';

const routes = express.Router();

routes.post('/user', UserController.store);

export default routes;
