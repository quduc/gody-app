import { useNavigation } from '@react-navigation/core';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { useStore } from '../../store/useStore';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { MapContainer } from '../mapcontainer/MapContainer';
import { CustomText } from '../../components/CustomText';
import { CustomTextFieldWithIcon } from '../../components/CustomTextFiledWithIcon';
import { BookingDetail } from '../bookingdetail/BookingDetail';


interface Props { }
export const UpComingTrip: FC<Props> = observer(() => {

    const store = useStore();
    const { booking } = store;
    const navigation = useNavigation<any>();
    const bottomSheetModalRef = useRef<BottomSheet>(null);
    const snapPoints = ['35%', '100%'];
    const snapPointsFinding = ['35%', '100%'];
    const [finding, setFinding] = useState<boolean>(true);
    const [isOpenFullModal, setIsOpenFullModal] = useState<boolean>(false);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <CustomHeaderLeft type='goback' onPress={() => navigation.goBack()} />
        })
    }, [])

    useEffect(() => {
        confirmBooking();
    }, [])
    const confirmBooking = async () => {
        //TODO: API Booking
        setFinding(false);
    }




    return (
        <View style={styles.container}>
            <View style={styles.map}>
                <MapContainer />
            </View>
            <BottomSheet
                ref={bottomSheetModalRef}
                index={0}
                onChange={() => setIsOpenFullModal(!isOpenFullModal)}
                snapPoints={snapPoints}>
                <BottomSheetScrollView contentContainerStyle={{
                    paddingVertical: 20,
                }}>
                    {finding && (
                        <View style={{ paddingHorizontal: 20 }}>
                            <CustomText
                                t2
                                style={{ color: colors.neutral1, marginBottom: 20 }}
                                text="Looking for a ride ....."
                            />
                            <ActivityIndicator style={{ alignItems: 'center', justifyContent: 'center' }} animating size="small" color={colors.primary1} />
                            <CustomTextFieldWithIcon
                                icon={require('../../resources/images/home.png')}
                                text={booking?.origin.description}

                            />
                            <CustomTextFieldWithIcon
                                icon={require('../../resources/images/marker.png')}
                                text={booking?.destination.description}

                            />
                        </View>
                    )}
                    {!finding && (
                        <BookingDetail
                            isOpenFullModal={isOpenFullModal}
                        />
                    )}
                </BottomSheetScrollView>
            </BottomSheet >
        </View >
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: constants.heightDevice * 0.65,
        width: constants.widthDevice,
    },
    btn: {
        flexDirection: 'row',
        width: 117,
        height: 44,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary1,
        marginRight: 20
    },
    carServiceItem: {
        width: 148,
        height: 230,
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        backgroundColor: colors.background,
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 2
    },
    carServiceItemActive: {
        width: 148,
        height: 230,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.primary1,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        backgroundColor: colors.background,
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginLeft: 10,
        marginTop: 15
    }
});