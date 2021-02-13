import { Router } from "express";
  import FeedbackController from "../controllers/FeedbackController";
  import { checkJwt } from "../middlewares/checkJwt";

  const router = Router();

  //Create a new feedback
  router.post("/", [checkJwt], FeedbackController.newFeedback);

  //Delete one feedback
  router.delete(
    "/:id([0-9]+)",
    [checkJwt],
    FeedbackController.deleteFeedback
  );

  export default router;