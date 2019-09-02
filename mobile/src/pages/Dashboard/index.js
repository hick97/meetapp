import React, { useState, useMemo, useEffect } from 'react';
import { TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Background from '../../components/Background';
import MeetupBox from '../../components/MeetupBox';

import api from '../../services/api';

import { Container, Title, CurrentDate, ChevronIcon, List } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );
  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: { date },
      });

      const formattedResponse = response.data.map(meetup => {
        return {
          id: meetup.id,
          title: meetup.title,
          description: meetup.description,
          banner: meetup.banner,
          location: meetup.location,
          date: format(parseISO(meetup.date), "d 'de' MMMM ', às' HH'h'", {
            locale: pt,
          }),
          organizer: meetup.organizer.name,
        };
      });

      setMeetups(formattedResponse);
    }
    loadMeetups();
  }, [date]);
  function handlePrevDay() {
    setDate(subDays(date, 1));
  }
  function handleNextDay() {
    setDate(addDays(date, 1));
  }
  async function handleInscription(id) {
    try {
      await api.get(`meetups/${id}/inscriptions`);

      setMeetups(
        meetups.map(meetup =>
          meetup.id === id
            ? {
                ...meetup,
                inscripted: true,
              }
            : meetup
        )
      );
      Alert.alert('Sucesso!', 'Inscrição realizada com sucesso!');
    } catch (err) {
      Alert.alert('Error', 'Falha ao realizar inscrição');
    }
  }
  return (
    <Background>
      <Container>
        <Title>
          <TouchableOpacity onPress={handlePrevDay}>
            <ChevronIcon name="chevron-left" size={30} />
          </TouchableOpacity>
          <CurrentDate>{dateFormatted}</CurrentDate>
          <TouchableOpacity onPress={handleNextDay}>
            <ChevronIcon name="keyboard-arrow-right" size={30} />
          </TouchableOpacity>
        </Title>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MeetupBox
              data={item}
              onInscription={() => handleInscription(item.id)}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
