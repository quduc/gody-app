import { useNavigation } from '@react-navigation/core';
import { observer } from 'mobx-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomButton } from '../../components/CustomButton';
import { CustomCardPayment } from '../../components/CustomCardPayment';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { useStore } from '../../store/useStore';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { MapContainer } from '../mapcontainer/MapContainer';
import { socket } from '../../socketIO';
import { User } from '../../types';

import LottieView from 'lottie-react-native';



interface Props { }
export const ConfirmBooking: FC<Props> = observer((props) => {
    const store = useStore();
    const { booking } = store;
    const navigation = useNavigation<any>();
    const bottomSheetModalRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['55%', '75%'], []);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <CustomHeaderLeft type='goback' onPress={() => navigation.goBack()} />
        })
    }, [])

    const onWatingDriverAccept = () => {
        setShowModal(true);
        bottomSheetModalRef.current?.close();
    }
    const onRequestBooking = () => {
        socket.emit('customerBooking', {
            "startLocation": {
                "name": "Học viện Kỹ thuật mật mã",
                "longitude": 105.7940398,
                "latitude": 20.9808164
            },
            "endLocation": {
                "name": "Bến xe Mỹ Đình",
                "longitude": 105.7762636,
                "latitude": 21.0291669
            },
            "transport": {
                "numberOfSeats": 4,
                "type": "economy"
            },
            "distance": "2000",  //meters
            "paymentOption": {
                "paymentType": "card",
                "paymentAmount": 25,
                "cardId": "123123" // id thẻ nếu thanh toán bằng thẻ
            }
        });

        // socket.on('driverConfirmBookingResponse', (res) => {
        //     setShowModal(true);
        //     bottomSheetModalRef.current?.close();
        //     if (res) {
        //         navigation.navigate("UpComingTrip")
        //     }
        // });
        navigation.navigate("UpComingTrip")
        // onWatingDriverAccept();
    }

    const renderWatingModal = () => {
        return (
            <View style={styles.modal}>
                <CustomText t2 text="Looking for a ride ..." style={{ textAlign: 'center' }} />
                <LottieView style={{
                    width: constants.widthDevice - 200,
                    height: constants.widthDevice - 200,
                }} source={require('../../resources/images/waiting.json')} autoPlay loop />
                <CustomButton type="primary" title="Cancel Booking" onPress={() => {
                    setShowModal(false);
                    bottomSheetModalRef.current?.snapTo(0);
                }} />

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={showModal ? styles.mapFull : styles.map}>
                <MapContainer />
            </View>
            {
                showModal && renderWatingModal()
            }
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
                            <CustomButton type="primary" title={`Submit`} onPress={onRequestBooking} />
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
    mapFull: {
        height: constants.heightDevice,
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
    },
    modal: {
        position: 'absolute',
        width: constants.widthDevice - 80,
        height: constants.widthDevice - 80,
        top: (constants.heightDevice - (constants.widthDevice - 80)) / 2,
        left: 40,
        backgroundColor: colors.white,
        borderRadius: 5,
        padding: 20,
        alignItems:'center'
    }
});