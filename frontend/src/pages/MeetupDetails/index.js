import React, { useState, useEffect, useRef } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Container, ContentHeader, Content, ContentFooter } from './styles';

export default function MeetupDetails(props) {
  const [meetup, setMeetup] = useState([]);
  const prevProps = useRef(props);

  useEffect(() => {
    async function loadMeetupDetails() {
      const { id: meetupId } = prevProps.current.match.params;

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
  }, [meetup.date, prevProps]);
  function handleCancel() {}
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
