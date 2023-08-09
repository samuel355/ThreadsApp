import {Platform} from 'react-native';

let URI = '';

if (Platform.OS === 'ios') {
  //URI = 'https://threads-clone-ten.vercel.app/api/v1';
  URI = 'http://localhost:9090/api/v1'
} else {
  //URI = 'https://threads-clone-ten.vercel.app/api/v1';
  URI = 'http://localhost:9090/api/v1';
}

export {URI};
