import { RouteProp, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { FC, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { getDistanceAndTime } from '../../API';
import { CustomButton } from '../../components/CustomButton';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomTextFieldWithIcon } from '../../components/CustomTextFiledWithIcon';
import { GooglePlacesInput } from '../../components/GooglePlacesInput';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { socket } from '../../socketIO';
import { useStore } from '../../store/useStore';
import { DriverLocation, Location } from '../../types';
import { calculateFare } from '../../utils/CalculateFare';
import { destination as mockDestination } from '../../mockData';
interface Props {
    // route: RouteProp<{ params: { origin: Location } }, 'params'>
}

export const Search: FC<Props> = observer((props) => {
    const navigation = useNavigation<any>();
    const store = useStore();
    const [destination, setDestination] = useState<Location>(mockDestination);
    const [loading, setLoading] = useState<boolean>(false);
    const [nearByDrivers, setNearByDrivers] = useState<DriverLocation[]>();


    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => <CustomHeaderLeft type='goback' onPress={() => navigation.goBack()} />
        })
    }, []);


    const onGoToChooseCar = async () => {
        setLoading(true);
        const response = await getDistanceAndTime(store.booking?.origin, store.booking?.destination);
        if (response.__typename !== 'ErrorResponse') {
            const totalFare = calculateFare(response.rows[0].elements[0].distance, response.rows[0].elements[0].duration);

            store.saveBooking({
                ...store.booking!,
                distance: response.rows[0].elements[0].distance,
                duration: response.rows[0].elements[0].duration,
                fare: totalFare
            })

            navigation.navigate("ChooseCar", {
                defaultFare: store.booking?.fare
            });
        } else {
            Alert.alert(
                "",
                `${response.error}`,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        }

        //update vị trí người dùng *) origin
        // socket.emit("updateLocation", {
        //     "longitude": 105.7940398,
        //     "latitude": 20.9808164
        // });

        // socket.on("updateLocation", (response) => {
        //     console.log(response);
        // });


        // store.saveBooking({
        //     ...store.booking!,
        //     destination: mockDestination,
        //     distance: {
        //         value: 12.800,
        //         text: '12.8kms'
        //     },
        //     duration: {
        //         value: 1140,
        //         text: '19ms',
        //     },
        //     fare: 24,
        //     nearByDrivers,
        //     defaultFare: 24,

        // })
        // setTimeout(() => {
        //     setLoading(false);
        //     navigation.navigate("ChooseCar", {
        //         defaultFare: store.booking?.fare
        //     });
        // }, 2000);
    }
    return (
        <View style={styles.container} >
            <View style={styles.row}>
                <View style={styles.dot} />
                <View style={{ width: 10 }} />
                <View style={{ width: constants.widthDevice - 60 }}>
                    <GooglePlacesInput
                        defaultValue={store.booking?.origin.description}
                        placeholder={store.booking?.origin.description}
                    />
                </View>

            </View>
            <View style={styles.row}>
                <View style={styles.dot} />
                <View style={{ width: 10 }} />
                <View style={{ width: constants.widthDevice - 60 }}>
                    <GooglePlacesInput

                        onPress={(data, detail = null) => setDestination({
                            location: detail.geometry.location,
                            description: data.description
                        })}
                    />
                </View>
            </View>
            <CustomTextFieldWithIcon
                text="Add home"
                icon={require('../../resources/images/star.png')}
            />
            <CustomTextFieldWithIcon
                text="Set location on map"
                icon={require('../../resources/images/home.png')}
            />

            <View style={{ width: constants.widthDevice - 40, height: 48, marginTop: 100 }}>
                <CustomButton
                    onPress={onGoToChooseCar}
                    title="Next"
                    type="primary"
                />
            </View>
            <LoadingOverlay loading={loading} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: colors.background,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dot: {
        position: 'absolute',
        top: 25,
        left: -5,
        width: 16,
        height: 16,
        borderRadius: 16,
        backgroundColor: colors.primary1,

    }
})

