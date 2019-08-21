import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class InscriptionMail {
  get key() {
    return 'InscriptionMail';
  }

  async handle({ data }) {
    const { meetup, participant } = data;

    console.log('A fila executou.');

    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: `Nova inscrição na Meetup ${meetup.title}`,
      template: 'inscription',
      context: {
        email: participant.email,
        meetup: meetup.title,
        organizer: meetup.User.name,
        participant: participant.name,
        date: format(
          parseISO(meetup.date),
          "'Dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        location: meetup.location,
      },
    });
  }
}

export default new InscriptionMail();
