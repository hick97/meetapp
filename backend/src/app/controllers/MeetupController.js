import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import { isBefore, isAfter, startOfHour, parseISO} from 'date-fns';
import Meetup from '../models/Meetup';


class MeetupController {
  //TODO: list meetups with filter
  async index(){}

  // Listing meetups by logged user
  async listByUser(req, res){
    const meetups = await Meetup.findAll({
      where:{
        user_id: req.userId,
      }
    })

    res.json(meetups)
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
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
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
      return res.status(400).json({ error: 'Update not allowed' });
    }
    
    const meetup = await Meetup.findByPk(meetupId);

    // TODO: Checking if meetup has already happened
    if (!(isAfter(meetup.dataValues.date, new Date()))) {
      return res.status(400).json({ error: 'Meetup has already happened' });
    }

    if(!!newDate){
      // Cheking if meetup date has passed
      const dateToStart = startOfHour(parseISO(newDate));

      if (isBefore(dateToStart, new Date())) {
        return res.status(400).json({ error: 'Past dates are not permited' });
      }
    }

    // Updating meetup
    const updatedMeetup = await meetup.update(req.body);

    return res.json(updatedMeetup);

  }

  async delete(req, res) {
    // Cheking if meetup already exists
    const meetupExists = await Meetup.findOne({
      where: { id: req.params.id },
    });

    if (!meetupExists) {
      return res.status(400).json({ error: 'Meetup not found.' });
    }

    const meetup = await Meetup.findByPk(req.params.id);
    // Destroying meetup
    await meetup.destroy();

    return res.status(200);
  }
}

export default new MeetupController();
