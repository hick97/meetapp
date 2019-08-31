export function getMeetupsRequest() {
  return {
    type: '@meetup/GET_MEETUPS_REQUEST',
  };
}

export function getMeetupsSuccess(meetups) {
  return {
    type: '@meetup/GET_MEETUPS_SUCCESS',
    payload: { meetups },
  };
}

export function storeMeetupRequest(data) {
  return {
    type: '@meetup/STORE_MEETUPS_REQUEST',
    payload: { data },
  };
}

export function storeMeetupsSuccess() {
  return {
    type: '@meetup/STORE_MEETUPS_SUCCESS',
  };
}
export function updateMeetupRequest(data, id) {
  return {
    type: '@meetup/UPDATE_MEETUP_REQUEST',
    payload: { data, id },
  };
}
export function updateMeetupSuccess() {
  return {
    type: '@meetup/UPDATE_MEETUP_SUCCESS',
  };
}

export function cancelMeetupRequest(id) {
  return {
    type: '@meetup/CANCEL_MEETUP_REQUEST',
    payload: { id },
  };
}
export function cancelMeetupSuccess() {
  return {
    type: '@meetup/CANCEL_MEETUP_SUCCESS',
  };
}

export function meetupsFailure() {
  return {
    type: '@meetup/MEETUPS_FAILURE',
  };
}
