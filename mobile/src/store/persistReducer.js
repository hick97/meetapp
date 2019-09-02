import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// Using local storage to persist reducers
export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'meetapp',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
