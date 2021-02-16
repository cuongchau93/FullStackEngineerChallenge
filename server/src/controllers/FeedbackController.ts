import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { Feedback } from '../entity/Feedback';
import { User } from '../entity/User';

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
      const feedbacks = await feedbackRepository
        .createQueryBuilder('feedback')
        .where('feedback.belongsToId = :id or feedback.givenById = :id', {
          id: self,
        })
        .leftJoinAndSelect('feedback.belongsTo', 'forUser')
        .leftJoinAndSelect('feedback.givenBy', 'asignee')
        .select(
          'feedback.id, description, forUser.username as belongsTo, asignee.username as givenBy',
        )
        .getRawMany();

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

  static editFeedback = async (req: Request, res: Response) => {
    //Get parameters from the body
    const id = req.params.id;
    let { description, belongsToId, givenById } = req.body;
    const userId = res.locals.jwtPayload.userId;

    //Get user role from the database
    const userRepository = getRepository(User);
    const feedbackRepository = getRepository(Feedback);

    let user: User;
    try {
      let feedback = await feedbackRepository.findOneOrFail(id);
      user = await userRepository.findOneOrFail(userId);
      if (belongsToId || givenById) {
        if (user.role !== 'ADMIN') {
          res
            .status(401)
            .send({ message: 'Only admin can change these properties' });
        } else if (feedback.description.length > 0) {
          res.status(409).send({
            message:
              'These properties cannot be changed because description is not empty',
          });
        } else {
          feedback.givenById = givenById;
          feedback.belongsToId = belongsToId;
        }
      }

      //Validate the new values on model
      feedback.description = description;
      const errors = await validate(feedback);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }

      await feedbackRepository.save(feedback);
    } catch (e) {
      res.status(409).send({ message: 'Error while updating feedback', e });
    }

    res.status(204).send();
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
