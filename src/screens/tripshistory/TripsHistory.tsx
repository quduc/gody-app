import { useNavigation } from '@react-navigation/core';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import {
   ActivityIndicator,
   ScrollView,
   StyleSheet,
   View,
   TouchableOpacity,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomText } from '../../components/CustomText';
import FastImage from 'react-native-fast-image';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { getManyTrips } from '../../API';
import { ITripHistory, ObjectResponse } from '../../types';
import moment from 'moment';
import { CustomBackground } from '../../components/CustomBackground';

// click to each trip and navigate to trip details
export const TripsHistory: FC = () => {
   const navigation = useNavigation<any>();
   const [tripHistory, setTripHistory] = useState<ITripHistory[]>([]);
   const [loading, setLoading] = useState<boolean>(false);

   useFocusEffect(
      React.useCallback(() => {
         setLoading(true);
         fetchManyTrips();
         setLoading(false);

         return () => {
            setLoading(false);
            setTripHistory([]);
         };
      }, [])
   );

   const fetchManyTrips = async () => {
      const response = await getManyTrips();
      if (response.__typename !== 'ErrorResponse') {
         setLoading(false);
         setTripHistory(response?.result);
      }
   };

   const TripInforItem = (item: ITripHistory) => {
      const { _id, createdAt, price, driver, status, startLocation, endLocation } = item;
      let time = moment(createdAt).format("dddd, Do YYYY");
      return (
         <TouchableOpacity style={styles.tripInforContainer}
            onPress={() => {
               navigation.navigate("TripDetails", {
                  item
               });
            }}
         >
            {/* time + car info */}
            < View style={{ flex: 2, }}>
               <CustomText text={time} p1 style={{ fontWeight: 'bold' }} />
               <CustomText text={driver?.phone} p2 style={{ color: colors.primary2, fontWeight: 'normal' }} />
               <CustomText text={`${driver?.transport?.brand}-${driver?.transport?.registrationPlate}`} p2 style={{ color: colors.neutral2, fontWeight: 'normal' }} />
               <CustomText text={`${driver?.transport?.type} trip`} s style={{ color: colors.primary1, fontWeight: 'normal' }} />
            </View >

            {/* price + status */}
            < View style={styles.priceInfor} >
               <CustomText text={'$' + price} p1 style={{
                  fontWeight: 'bold',
                  fontSize: 18,
               }} />
               <CustomText text={status == 'finished' ? 'Completed' : 'Canceled'} p2 style={{ color: status == 'finished' ? colors.primary1 : colors.neutral2 }} />
            </View >
         </TouchableOpacity >
      );
   }

   return (
      <CustomBackground>
         {tripHistory ? tripHistory.map((item: ITripHistory) => (
            <TripInforItem
               _id={item._id}
               createdAt={item.createdAt}
               price={item.price}
               driver={item.driver}
               status={item.status}
               startLocation={item.startLocation}
               endLocation={item.endLocation}
               key={item._id}
            />
         )) : (
            <View style={{ flex: 1 }}>
               <FastImage
                  source={require('../../resources/images/noTrips.png')}
                  style={{ width: 350, height: 350 }}
                  resizeMode='contain'
               />
               <CustomText text={'You have not catch any trip.'} t2 style={{ flex: 1, alignSelf: 'center', marginTop: 20 }} />
            </View>
         )}
      </CustomBackground>
   )
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
   },
   tripInforContainer: {
      flexDirection: 'row',
      height: 70,
      width: constants.widthDevice - 40,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 20,
      borderWidth: 1,
      borderColor: colors.primary1,
      borderRadius: 12,
   },
   priceInfor: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center'
   },
});