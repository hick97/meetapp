import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {
  Container,
  Banner,
  Info,
  Title,
  Date,
  Location,
  Organizer,
  InscriptionButton,
  ButtonText,
  Text,
  InfoIcon,
} from './styles';

export default function MeetupBox({ data, onInscription, onCancel }) {
  return (
    <Container>
      <Banner
        source={{
          uri: data.banner
            ? data.banner.url
            : 'https://api.adorable.io/avatar/50/banner.png',
        }}
      />
      <Info>
        <Title>{data.title}</Title>
        <Date>
          <InfoIcon name="event" size={13} />
          <Text>{data.date}</Text>
        </Date>
        <Location>
          <InfoIcon name="event" size={13} />
          <Text>{data.location}</Text>
        </Location>
        <Organizer>
          <InfoIcon name="person" size={13} />
          <Text>Organizador: {data.organizer}</Text>
        </Organizer>

        {onCancel !== null || data.inscripted ? null : (
          <InscriptionButton onPress={onInscription}>
            <ButtonText>Realizar inscrição</ButtonText>
          </InscriptionButton>
        )}
        {onCancel === null || data.canceled ? null : (
          <InscriptionButton onPress={onCancel}>
            <ButtonText>Cancelar inscrição</ButtonText>
          </InscriptionButton>
        )}
      </Info>
    </Container>
  );
}

MeetupBox.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    organizer: PropTypes.string.isRequired,
    canceled: PropTypes.bool,
    inscripted: PropTypes.bool,
    banner: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onInscription: PropTypes.func,
  onCancel: PropTypes.func,
};

MeetupBox.defaultProps = {
  onInscription: null,
  onCancel: null,
};
