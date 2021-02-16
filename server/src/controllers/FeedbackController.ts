import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { Feedback } from '../entity/Feedback';

class FeedbackController {
  static listAll = async (req: Request, res: Response) => {
    const feedbackRepository = getRepository(Feedback);

    try {
      const feedbacks = await feedbackRepository.find({
        select: ['id', 'description', 'givenById', 'belongsToId'],
      });
      res.send(feedbacks);
    } catch (e) {
      res.status(500).send({ message: 'Error while getting feedback', e });
      return;
    }
  };

  static getAllSelf = async (req: Request, res: Response) => {
    const feedbackRepository = getRepository(Feedback);
    const self = res.locals.jwtPayload.userId;

    try {
      const feedbacks = await feedbackRepository.find({
        where: [
          // getting all given or own feedbacks
          {
            belongsTo: self,
          },
          {
            givenBy: self,
          },
        ],
        select: ['id', 'description', 'givenBy', 'belongsTo'],
      });
      res.send(feedbacks);
    } catch (e) {
      res.status(500).send({ message: 'Error while getting feedback', e });
      return;
    }
  };

  static newFeedback = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { description, belongsToId, givenById } = req.body;

    let feedback = new Feedback();
    feedback.description = description;
    feedback.givenById = givenById;
    feedback.belongsToId = belongsToId;

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
