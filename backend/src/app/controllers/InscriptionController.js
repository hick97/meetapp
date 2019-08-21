import { Op } from 'sequelize';
import { isBefore } from 'date-fns';
import Inscription from '../models/Inscription';
import Meetup from '../models/Meetup';

import Queue from '../../lib/Queue';
import InscriptionMail from '../jobs/InscriptionMail';
import User from '../models/User';

class InscriptionController {
  async index(req, res) {
    // list all inscriptions of logged user
    const inscriptions = await Inscription.findAll({
      where: {
        // logged is a participant
        participant_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          required: true,
          // find inscriptions where dates are greater than current date
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
        },
      ],
      // ordering by meetup date
      order: [[Meetup, 'date']],
    });

    return res.json(inscriptions);
  }

  async store(req, res) {
    // Getting variables
    const { id: meetup_id } = req.params;
    const participant_id = req.userId;

    // Getting meetup data by user interest
    const meetup = await Meetup.findByPk(meetup_id, {
      include: [User],
    });

    // Cheking if user is meetup organizer
    const isOrganizer = await Meetup.findOne({
      where: {
        id: meetup_id,
        user_id: participant_id,
      },
    });

    if (isOrganizer) {
      return res.status(400).json({
        error: 'Inscription is not allowed, user is meetup organizer',
      });
    }

    // Checking if meetup has already happened
    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({ error: 'Meetup has already happened' });
    }

    // Checking if user inscription exists in meetup
    const inscriptionExists = await Inscription.findOne({
      where: {
        meetup_id,
        participant_id,
      },
    });

    if (inscriptionExists) {
      return res.status(400).json({
        error: 'Inscription is not allowed, user is already a participant',
      });
    }

    // Checking if user have others meetups in the same hour
    const userIsBusy = await Inscription.findOne({
      where: {
        participant_id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (userIsBusy) {
      return res.status(400).json({
        error:
          'Inscription is not allowed, user is already has two meetups at the same hour',
      });
    }

    // Creating user inscription
    const inscription = await Inscription.create({
      meetup_id,
      participant_id,
    });

    const participant = await User.findByPk(participant_id);

    // Queuing email
    await Queue.add(InscriptionMail.key, {
      meetup,
      participant,
    });

    return res.json(inscription);
  }
}

export default new InscriptionController();
