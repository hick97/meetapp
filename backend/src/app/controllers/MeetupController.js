import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parseISO, isBefore, isAfter, startOfDay, endOfDay } from 'date-fns';

import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  // Listing meetups with filter
  async index(req, res) {
    const { date, page = 1 } = req.query;

    const where = {};

    // If date filter exists
    if (date) {
      const marked_date = parseISO(date);

      where.date = {
        [Op.between]: [startOfDay(marked_date), endOfDay(marked_date)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['url', 'id', 'path'],
        },
      ],
      limit: 10,
      offset: (page - 1) * 10,
    });

    res.json(meetups);
  }

  // Listing meetups by logged user
  async listByUser(req, res) {
    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['url', 'id', 'name'],
        },
      ],
    });

    res.json(meetups);
  }

  async store(req, res) {
    // Schema validation to meetup store
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Cheking if meetup date has passed
    const { title, description, location, banner_id, date } = req.body;
    const dateToStart = parseISO(date);

    if (isBefore(dateToStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permited' });
    }

    // Cheking if user have others meetups in the same hour.
    const checkAvailability = await Meetup.findOne({
      where: {
        user_id: req.userId,
        date,
      },
    });

    if (checkAvailability) {
      return res.status(400).json({ error: 'Meetup date is not available' });
    }

    const meetup = await Meetup.create({
      title,
      description,
      location,
      banner_id,
      date,
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    // Schema validation to meetup update
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      banner_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { date: newDate } = req.body;
    const meetupId = req.params.id;

    // Cheking if meetup already exists and logged user is organizer
    const meetupExists = await Meetup.findOne({
      where: { id: meetupId, user_id: req.userId },
    });

    if (!meetupExists) {
      return res.status(401).json({ error: 'Update not allowed' });
    }

    const meetup = await Meetup.findByPk(meetupId);

    // Checking if meetup has already happened
    if (!isAfter(meetup.date, new Date())) {
      return res.status(400).json({ error: 'Meetup has already happened' });
    }

    if (newDate) {
      // Cheking if meetup date has passed
      const dateToStart = parseISO(newDate);

      if (isBefore(dateToStart, new Date())) {
        return res.status(400).json({ error: 'Past dates are not permited' });
      }
    }

    // Updating meetup
    await meetup.update(req.body);

    const {
      id,
      title,
      description,
      location,
      date,
      banner,
      organizer,
    } = await Meetup.findByPk(meetupId, {
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['url', 'id', 'path'],
        },
      ],
    });

    return res.json({
      id,
      title,
      description,
      location,
      date,
      banner,
      organizer,
    });
  }

  async delete(req, res) {
    // Cheking if meetup already exists and user is organizer
    const meetupExists = await Meetup.findOne({
      where: {
        id: req.params.id,
        user_id: req.userId,
      },
    });

    if (!meetupExists) {
      return res.status(401).json({ error: 'Remotion not allowed' });
    }

    // Cheking if meetup has already happened
    const meetup = await Meetup.findByPk(req.params.id);

    if (!isAfter(meetup.date, new Date())) {
      return res.status(400).json({ error: 'Meetup has already happened' });
    }
    // Destroying meetup
    await meetup.destroy();

    return res.status(200);
  }
}

export default new MeetupController();
