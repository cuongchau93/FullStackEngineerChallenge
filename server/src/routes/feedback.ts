import { Router } from 'express';
import FeedbackController from '../controllers/FeedbackController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

//Get all feedbacks
router.get('/', [checkJwt, checkRole(['ADMIN'])], FeedbackController.listAll);

//Get all self feedbacks
router.post(
  '/self',
  [checkJwt, checkRole(['ADMIN'])],
  FeedbackController.getAllSelf,
);

//Create a new feedback
router.post('/', [checkJwt], FeedbackController.newFeedback);

//Delete one feedback
router.delete('/:id([0-9]+)', [checkJwt], FeedbackController.deleteFeedback);

export default router;
