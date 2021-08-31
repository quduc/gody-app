/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, StatusBar, View } from 'react-native';
import { RootStack } from './src/routes/RootStack';
import { AuthStore } from './src/store/authStore';
import { StoreProvider } from './src/store/storeContext';

const authStore = new AuthStore();
const App = () => {

  return (
    <StoreProvider store={authStore}>
      <View style={{ flex: 1 }}>
        <RootStack />
        <StatusBar barStyle={'light-content'} />
      </View>
    </StoreProvider>
  )
};



export default App;

// const [locationStatus, setLocationStatus] = useState<string>();
// const [currentLatitude, setCurrentLatiture] = useState<any>();
// const [currentLongitude, setCurrentLongitude] = useState<any>();
// useEffect(() => {
//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'ios') {
//       getOneTimeLocation();
//       subscribeLocationLocation();
//     } else {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           //To Check, If Permission is granted
//           getOneTimeLocation();
//           subscribeLocationLocation();
//         } else {
//           setLocationStatus('Permission Denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     }
//   };
//   requestLocationPermission();
//   return () => {
//     Geolocation.clearWatch(watchID);
//   };
// }, []);

// const getOneTimeLocation = () => {
//   setLocationStatus('Getting Location ...');
//   Geolocation.getCurrentPosition(
//     //Will give you the current location
//     (position) => {
//       setLocationStatus('You are Here');

//       //getting the Longitude from the location json
//       const currentLongitude =
//         JSON.stringify(position.coords.longitude);

//       //getting the Latitude from the location json
//       const currentLatitude =
//         JSON.stringify(position.coords.latitude);

//       //Setting Longitude state
//       setCurrentLongitude(currentLongitude);

//       //Setting Longitude state
//       setCurrentLatiture(currentLatitude);
//     },
//     (error) => {
//       setLocationStatus(error.message);
//     },
//     {
//       enableHighAccuracy: false,
//       timeout: 30000,
//       maximumAge: 1000
//     },
//   );
// };

// const subscribeLocationLocation = () => {
//   watchID = Geolocation.watchPosition(
//     (position) => {
//       //Will give you the location on location change

//       setLocationStatus('You are Here');
//       console.log(position);

//       //getting the Longitude from the location json        
//       const currentLongitude =
//         JSON.stringify(position.coords.longitude);

//       //getting the Latitude from the location json
//       const currentLatitude =
//         JSON.stringify(position.coords.latitude);

//       //Setting Longitude state
//       setCurrentLongitude(currentLongitude);

//       //Setting Latitude state
//       setCurrentLatiture(currentLatitude);
//     },
//     (error) => {
//       setLocationStatus(error.message);
//     },
//     {
//       enableHighAccuracy: false,
//       maximumAge: 1000
//     },
//   );
// };
// console.log({currentLatitude},{currentLongitude});