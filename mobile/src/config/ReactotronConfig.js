import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.0.22' })
    .useReactNative(reactotronRedux())
    .useReactNative(sagaPlugin())
    .connect();

  tron.clear();

  console.tron = tron;
}