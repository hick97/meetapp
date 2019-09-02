import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Background from '../../components/Background';
import MeetupBox from '../../components/MeetupBox';

import api from '../../services/api';

import { Container, List } from './styles';

export default function Inscriptions() {
  const [inscriptions, setInscriptions] = useState([]);

  useEffect(() => {
    async function loadInscriptions() {
      const response = await api.get('user/inscriptions');

      const formattedResponse = response.data.map(meetup => {
        return {
          id: meetup.id,
          title: meetup.Meetup.title,
          description: meetup.Meetup.description,
          banner: meetup.Meetup.banner,
          location: meetup.Meetup.location,
          date: format(
            parseISO(meetup.Meetup.date),
            "d 'de' MMMM ', às' HH'h'",
            {
              locale: pt,
            }
          ),
          organizer: meetup.Meetup.organizer.name,
        };
      });

      setInscriptions(formattedResponse);
    }
    loadInscriptions();
  }, []);

  async function handleCancel(id) {
    try {
      await api.delete(`user/inscriptions/${id}`);

      setInscriptions(
        inscriptions.map(meetup =>
          meetup.id === id
            ? {
                ...meetup,
                canceled: true,
              }
            : meetup
        )
      );

      Alert.alert('Sucesso!', 'Inscrição cancelada com sucesso!');
    } catch (err) {
      Alert.alert('Error', 'Falha ao cancelar inscrição');
    }
  }
  return (
    <Background>
      <Container>
        <List
          data={inscriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MeetupBox data={item} onCancel={() => handleCancel(item.id)} />
          )}
        />
      </Container>
    </Background>
  );
}

Inscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
