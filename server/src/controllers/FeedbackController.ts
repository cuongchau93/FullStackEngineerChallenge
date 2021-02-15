import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from '../entity/User';
import { Feedback } from '../entity/Feedback';

class FeedbackController {
  static newFeedback = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { description, belongsTo } = req.body;
    const creatorId = res.locals.jwtPayload.userId;

    let feedback = new Feedback();
    feedback.description = description;
    feedback.givenBy = creatorId;
    feedback.belongsTo = belongsTo;

    //Validade if the parameters are ok
    const errors = await validate(feedback);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const feedbackRepository = getRepository(Feedback);
    try {
      await feedbackRepository.save(feedback);
    } catch (e) {
      res.status(409).send({ message: 'Error while saving feedback', e });
      return;
    }

    //If all ok, send 201 response
    res.status(201).send({ message: 'Feedback created' });
  };

  static deleteFeedback = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const feedbackRepository = getRepository(Feedback);
    try {
      await feedbackRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send({ message: 'Feedback not found' });
      return;
    }
    feedbackRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}

export default FeedbackController;
