import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Container, ContentHeader, Meetup } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/user/meetups');

      const formattedResponse = response.data.map(meetup => {
        return {
          id: meetup.id,
          title: meetup.title,
          date: format(parseISO(meetup.date), "d 'de' MMMM ', às ' HH'h'", {
            locale: pt,
          }),
        };
      });

      setMeetups(formattedResponse);
    }
    loadMeetups();
  }, []);
  return (
    <Container>
      <ContentHeader>
        <h1>Meus meetups</h1>
        <Link to="/meetup">
          <button>Novo meetup</button>
        </Link>
      </ContentHeader>

      <ul>
        {meetups.map(meetup => (
          <Link to={`/meetup/${meetup.id}/details`}>
            <Meetup>
              <strong>{meetup.title}</strong>
              <span>{meetup.date}</span>
            </Meetup>
          </Link>
        ))}
      </ul>
    </Container>
  );
}
