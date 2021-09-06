import { useNavigation } from '@react-navigation/core';
import { observer } from 'mobx-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { CustomButton } from '../../components/CustomButton';
import { CustomCardPayment } from '../../components/CustomCardPayment';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { useStore } from '../../store/useStore';
import MapViewDirections from 'react-native-maps-directions';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { MapContainer } from '../mapcontainer/MapContainer';





interface Props { }
export const ConfirmBooking: FC<Props> = observer((props) => {
    const store = useStore();
    const { booking } = store;
    const navigation = useNavigation<any>();
    const bottomSheetModalRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['55%', '75%'], []);
    // const [isOpenFullModal, setIsOpenFullModal] = useState<boolean>(false);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <CustomHeaderLeft type='goback' onPress={() => navigation.goBack()} />
        })
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.map}>
                <MapContainer />
            </View>
            <BottomSheet
                ref={bottomSheetModalRef}
                index={0}
                // onChange={() => setIsOpenFullModal(!isOpenFullModal)}
                snapPoints={snapPoints}>
                <BottomSheetScrollView contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <FastImage
                            style={{ width: 250, height: 127, marginBottom: 10 }}
                            source={booking?.car_service.image}
                            resizeMode="cover"
                        />
                    </View>
                    <View>
                        <View style={styles.bookingInfo}>
                            <View>
                                <CustomText t2 text={booking?.car_service.name} style={{ color: colors.neutral1 }} />
                                <CustomText p1 text="4:04pm drop-off" style={{ color: colors.neutral2 }} />
                                <CustomText p1 text={booking?.car_service.description} style={{ color: colors.neutral2 }} />
                            </View>
                            <View>
                                <CustomText t1 text={`${booking?.fare}$`} style={{ color: colors.primary1 }} />
                            </View>
                        </View>
                        <CustomCardPayment
                            cardInfo="*** 9999"
                            iconRight={require('../../resources/images/forward.png')}
                            iconLeft={require('../../resources/images/visa.png')}
                            onPress={() => navigation.navigate("ChoosePayment")}
                        />
                        <View style={{ width: constants.widthDevice - 40, height: 48, marginTop: 10 }}>
                            <CustomButton type="primary" title={`Submit`} onPress={() => navigation.navigate("UpComingTrip")} />
                        </View>

                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: constants.heightDevice * 0.45,
        width: constants.widthDevice,
    },
    bookingInfo: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 100,
        backgroundColor: colors.white,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,

        marginVertical: 10
    }
});