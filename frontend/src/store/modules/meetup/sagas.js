import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';
import {
  updateMeetupSuccess,
  getMeetupsSuccess,
  cancelMeetupSuccess,
  meetupsFailure,
  storeMeetupsSuccess,
} from './actions';

export function* getMeetups() {
  try {
    const response = yield call(api.get, '/user/meetups');
    const meetups = response.data;

    yield put(getMeetupsSuccess(meetups));
  } catch (err) {
    yield put(meetupsFailure());
    toast.error('Falha ao listar meetups');
  }
}

export function* storeMeetup({ payload }) {
  try {
    const { data } = payload;
    yield call(api.post, '/meetups', data);

    yield put(storeMeetupsSuccess());
    toast.success('Meetup criado com sucesso');
    history.push('/dashboard');
  } catch (err) {
    yield put(meetupsFailure());
    toast.error('Falha ao criar meetup');
  }
}

export function* updateMeetup({ payload }) {
  try {
    const { data, id } = payload;
    yield call(api.put, `/meetups/${id}`, data);

    yield put(updateMeetupSuccess());
    toast.success('Meetup atualizado com sucesso');
    history.push('/dashboard');
  } catch (err) {
    yield put(meetupsFailure());
    toast.error('Falha ao atualizar meetup');
  }
}

export function* cancelMeetup({ payload }) {
  try {
    const { id: meetupId } = payload;
    yield call(api.delete, `/meetups/${meetupId}`);

    yield put(cancelMeetupSuccess());
    toast.success('Meetup cancelado com sucesso');
    history.push('/dashboard');
  } catch (err) {
    yield put(meetupsFailure());
    toast.error('Falha ao cancelar meetup');
  }
}

export default all([
  takeLatest('@meetup/GET_MEETUPS_REQUEST', getMeetups),
  takeLatest('@meetup/CANCEL_MEETUP_REQUEST', cancelMeetup),
  takeLatest('@meetup/STORE_MEETUPS_REQUEST', storeMeetup),
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup),
]);
