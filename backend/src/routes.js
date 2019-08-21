import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import InscriptionController from './app/controllers/InscriptionController';

import authMiddleware from './app/middlewares/auth';

const routes = express.Router();
const upload = multer(multerConfig);

/* Sessions and Users */

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

/* Files */

routes.post('/files', upload.single('file'), FileController.store);

/* Meetups */

routes.get('/meetups', MeetupController.index);

routes.get('/user/meetups', MeetupController.listByUser);

routes.post('/meetups', MeetupController.store);

routes.put('/meetups/:id', MeetupController.update);

routes.delete('/meetups/:id', MeetupController.delete);

/* Inscriptions */

routes.get('/user/inscriptions', InscriptionController.index);

routes.post('/meetups/:id/inscriptions', InscriptionController.store);

export default routes;
