import { RouteProp, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { FC, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { CustomTextFieldWithIcon } from '../../components/CustomTextFiledWithIcon';
import { GooglePlacesInput } from '../../components/GooglePlacesInput';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { useStore } from '../../store/useStore';
import { Location } from '../../types';

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

    store.saveBooking({
        ...store.booking!, destination
    })
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => (
                <TouchableOpacity activeOpacity={0.8} style={{ width: 24, height: 24 }} onPress={() => navigation.goBack()}>
                    <Image source={require('../../resources/images/back.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            )
        })
    }, [])
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
                    onPress={() => navigation.navigate("ChooseCar")}
                    title="Next"
                    type="primary"
                />
            </View>
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

