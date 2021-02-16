import { Router } from 'express';
import auth from './auth';
import user from './user';
import feedback from './feedback';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/feedbacks', feedback);

export default routes;
