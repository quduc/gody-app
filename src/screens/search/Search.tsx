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
import { useStore } from '../../store/useStore';
import { Location } from '../../types';
import { calculateFare } from '../../utils/CalculateFare';

interface Props {
    // route: RouteProp<{ params: { origin: Location } }, 'params'>
}
const destinationDummy = {
    "location": {
        "lat": 16.6328871,
        "lng": 106.7383723
    },
    "description": "Green Hotel"
}
export const Search: FC<Props> = observer((props) => {
    const navigation = useNavigation<any>();
    const store = useStore();
    const [destination, setDestination] = useState<Location>(destinationDummy);

    const [loading, setLoading] = useState<boolean>(false);

    store.saveBooking({
        ...store.booking!, destination
    })
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => <CustomHeaderLeft type='goback' onPress={() => navigation.goBack()} />
        })
    }, []);

    const onGoToChooseCar = async () => {
        setLoading(true);
        const response = await getDistanceAndTime(store.booking?.origin, store.booking?.destination);
        if (response.status === 'OK') {
            const totalFare = calculateFare(response.rows[0].elements[0].distance, response.rows[0].elements[0].duration);
            store.saveBooking({
                ...store.booking!,
                distance: response.rows[0].elements[0].distance,
                duration: response.rows[0].elements[0].duration,
                fare: totalFare
            })
            navigation.navigate("ChooseCar");
        } else {
            Alert.alert(
                "",
                `${response.error_message}`,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        }
        setLoading(false);
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
                        defaultValue={destination.description}
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

