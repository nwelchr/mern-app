import { AppRegistry } from 'react-native';
import App from './client/App';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
]);

AppRegistry.registerComponent('quidproquo', () => App);
