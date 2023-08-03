import { Platform } from "react-native";

//export const URI = "http://localhost:9090/api/v1/"

let URI = ''
if(Platform.OS === 'ios'){
    URI = 'http://localhost:9090/api/v1/';
}else if(Platform.OS === 'android'){
    URI = 'http://10.0.2.2:9090/api/v1/'
}

export {URI}