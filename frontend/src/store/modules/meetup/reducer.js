import produce from 'immer';

const INITIAL_STATE = {
  meetups: [],
  loading: false,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/GET_MEETUPS_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@meetup/GET_MEETUPS_SUCCESS': {
        draft.meetups = action.payload.meetups;
        draft.loading = false;
        break;
      }

      case '@meetup/STORE_MEETUPS_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@meetup/STORE_MEETUPS_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@meetup/UPDATE_MEETUP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/UPDATE_MEETUP_SUCCESS': {
        draft.loading = false;
        break;
      }

      case '@meetup/CANCEL_MEETUP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/CANCEL_MEETUP_SUCCESS': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
