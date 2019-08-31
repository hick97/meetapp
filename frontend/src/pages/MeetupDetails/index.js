import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../services/api';

import { cancelMeetupRequest } from '../../store/modules/meetup/actions';

import { Container, ContentHeader, Content, ContentFooter } from './styles';

export default function MeetupDetails(props) {
  const dispatch = useDispatch();

  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetupDetails() {
      const { id: meetupId } = props.match.params;

      const response = await api.get(`/meetups/${meetupId}`);

      const unformattedDate = response.data.date;

      response.data.date = format(
        parseISO(unformattedDate),
        "d 'de' MMMM ', às ' HH'h'",
        {
          locale: pt,
        }
      );

      setMeetup(response.data);
    }

    loadMeetupDetails();
  }, [meetup.date, props]);

  async function handleCancel() {
    const { id: meetupId } = props.match.params;
    dispatch(cancelMeetupRequest(meetupId));
  }
  return (
    <Container>
      <ContentHeader>
        <h1>{meetup.title}</h1>

        <div>
          <Link to={`/meetup/${meetup.id}`}>
            <button>Editar</button>
          </Link>

          <button onClick={handleCancel}>Cancelar</button>
        </div>
      </ContentHeader>
      <Content>
        {meetup.banner && (
          <img src={meetup.banner.url} alt="Banner da Meetup" />
        )}
        <p> {meetup.description}</p>
      </Content>
      <ContentFooter>
        <span>{meetup.date}</span>
        <span>{meetup.location}</span>
      </ContentFooter>
    </Container>
  );
}

MeetupDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
