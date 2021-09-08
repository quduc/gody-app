import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useEffect, useState } from 'react';
import { FC } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, FlatList, ListRenderItem } from 'react-native';
import FastImage from 'react-native-fast-image';

import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';

interface IPromotionCodeItem {
   id: number;
   promoteCode: string;
   fee: number
}

const promotionCode: IPromotionCodeItem[] = [
   { "id": 1, "promoteCode": 'PROMOTE_1', fee: 10000 },
   { "id": 2, "promoteCode": 'PROMOTE_2', fee: 20000 },
   { "id": 3, "promoteCode": 'PROMOTE_3', fee: 15000 },
   { "id": 4, "promoteCode": 'PROMOTE_4', fee: 12000 },
   { "id": 5, "promoteCode": 'PROMOTE_5', fee: 16000 },
   { "id": 6, "promoteCode": 'PROMOTE_6', fee: 16000 },
   { "id": 7, "promoteCode": 'PROMOTE_7', fee: 16000 },
   { "id": 8, "promoteCode": 'PROMOTE_8', fee: 16000 },
   { "id": 9, "promoteCode": 'PROMOTE_9', fee: 16000 },
   { "id": 10, "promoteCode": 'PROMOTE_10', fee: 16000 },
];

export const AddPromotionCode: FC = () => {

   const [code, setCode] = useState('');

   const navigation = useNavigation<any>();
   useEffect(() => {
      navigation.setOptions({
         headerTransparent: false,
      })
   }, []);


   // change and set the promotion code and call API to apply the fee
   const selectCode = (item: IPromotionCodeItem) => {
      setTimeout(() => {
         setCode(item.promoteCode);
      }, 500);
   }


   const promoteItem: any = ({ item }: { item: IPromotionCodeItem }) => {
      <View style={styles.promoteCode}>
         <FastImage
            style={{ width: 30, height: 24 }}
            source={require('../../resources/images/gift.png')}
         />
         <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
         }}>
            {/* config and display the fee number */}
            <CustomText text={item.promoteCode} t3 style={{ color: colors.neutral2 }} />
            <CustomText text={`- ${item.fee}đ`} t3 style={{ color: colors.neutral2 }} />
         </View>
      </View>
   };

   return (
      <CustomBackground>
         <CustomText text="Enter your promotion code:" p2 style={{ color: colors.neutral2, fontWeight: 'bold' }} />
         <View style={
            [styles.promoteCode, {
               borderColor: colors.neutral2,
               marginBottom: 10
            }]}>
            <FastImage
               style={{ width: 22, height: 22, marginRight: 20 }}
               source={require('../../resources/images/gift.png')}
               tintColor="red"
            />
            <TextInput
               placeholder="PROMOTION CODE"
               value={code}
               style={{
                  color: colors.neutral1,
                  fontSize: 18,
                  fontWeight: 'bold',
                  borderLeftWidth: 1,
                  borderColor: colors.neutral2,
                  paddingHorizontal: 10,
                  paddingLeft: 20,
               }}
            />
         </View>

         <View style={{
            height: constants.heightDevice * 0.65,
            borderColor: colors.neutral3,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingVertical: 5
         }}>
            <FlatList<IPromotionCodeItem>
               keyExtractor={(item: IPromotionCodeItem) => item.id.toString()}
               data={promotionCode}
               maxToRenderPerBatch={4}
               renderItem={({ item }: { item: IPromotionCodeItem }) => (
                  <TouchableOpacity style={styles.promoteCode}
                     onPress={() => selectCode(item)}
                  >
                     <View style={{
                        flex: 1,
                        paddingTop: 5,
                        transform: [
                           { rotateZ: "14deg" },
                           // { scale: 1 }
                        ]
                     }}>
                        <FastImage
                           style={{ width: 26, height: 26, marginRight: 20 }}
                           source={require('../../resources/images/godypass.png')}
                           resizeMode={FastImage.resizeMode.center}
                           tintColor={colors.primary1}
                        />
                     </View>

                     <View style={{
                        flex: 6,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                     }}>
                        {/* config and display the fee number */}
                        <CustomText text={item.promoteCode} t2 style={{
                           color: colors.neutral2
                        }} />
                        <CustomText text={`${item.fee}đ`} t2 style={{
                           color: colors.neutral1,
                           paddingRight: 30,
                           fontSize: 19,
                           fontWeight: 'bold',
                           lineHeight: 20,
                        }} />
                     </View>
                  </TouchableOpacity>
               )}

            />
         </View>

         <CustomButton
            title="Confirm"
            type="primary"
         />

      </CustomBackground>

   )
}

const styles = StyleSheet.create({
   promoteCode: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: colors.neutral3,
      height: 45,
      borderRadius: 12,
      alignItems: 'center'
   }
});