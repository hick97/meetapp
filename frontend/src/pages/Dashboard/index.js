import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { getMeetupsRequest } from '../../store/modules/meetup/actions';

import { Container, ContentHeader, Meetup } from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();

  const meetups = useSelector(state => {
    const response = state.meetup.meetups;

    const formattedResponse = response.map(meetup => {
      return {
        id: meetup.id,
        title: meetup.title,
        date: format(parseISO(meetup.date), "d 'de' MMMM ', às ' HH'h'", {
          locale: pt,
        }),
      };
    });

    return formattedResponse;
  });

  useEffect(() => {
    dispatch(getMeetupsRequest());
  }, [dispatch]);
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
          <Link key={meetup.id} to={`/meetup/${meetup.id}/details`}>
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
