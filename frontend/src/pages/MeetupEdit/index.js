import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { updateMeetupRequest } from '../../store/modules/meetup/actions';

import api from '../../services/api';

import { Container } from './styles';

import BannerInput from '../../components/BannerInput';

const schema = Yup.object().shape({
  title: Yup.string().required('O e-mail é obrigatório'),
  description: Yup.string().required('A senha é obrigatória'),
  date: Yup.date().required('A data é obrigatória'),
  location: Yup.string().required('A localização é obrigatória'),
  banner_id: Yup.number().required('A imagem é obrigatória.'),
});

export default function MeetupEdit(props) {
  const dispatch = useDispatch();

  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [meetup, setMeetup] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    async function loadMeetupDetails() {
      const { id: meetupId } = props.match.params;

      const response = await api.get(`/meetups/${meetupId}`);

      const { data } = response;

      setMeetup(data);
      setFile(data.banner.id);
      setPreview(data.banner.url);
      setSelectedDate(data.date);
    }

    loadMeetupDetails();
  }, [props.match.params]);

  async function handleFileChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  function handleDateChange(date) {
    setSelectedDate(date);
  }
  async function handleSubmit({ title, location, description }) {
    const { id: meetupId } = props.match.params;
    const data = {
      banner_id: file,
      location,
      title,
      description,
      date: selectedDate,
    };
    dispatch(updateMeetupRequest(data, meetupId));
  }
  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit} initialData={meetup}>
        <BannerInput
          name="banner_id"
          preview={preview}
          file={file}
          handleChange={handleFileChange}
        />
        <Input name="title" placeholder="Título do Meetup" />
        <Input
          multiline
          placeholder="Descrição completa"
          value={meetup.description}
          name="description"
        />

        <Input name="location" type="text" placeholder="Localização" />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Data do evento"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Horário do evento"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <div className="submit">
          <button type="submit">Salvar meetup</button>
        </div>
      </Form>
    </Container>
  );
}

MeetupEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
