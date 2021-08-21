import MapboxGL from '@react-native-mapbox-gl/maps';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomButton } from '../../components/CustomButton';
import { CustomCardPayment } from '../../components/CustomCardPayment';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { CarService } from '../../types';

interface Props {

}

const carServices: CarService[] = [
    {
        "id": 1,
        "type": 1,
        "name": "GodyX",
        "description": "Affordable rides, all to yourself",
        "image": require('../../resources/images/godyX.png'),
        "price": 25,
        "seats": 4,
        "time": "1-4 min"
    },
    {
        "id": 2,
        "type": 2,
        "name": "GodyPremium",
        "description": "Affordable rides, all to yourself",
        "image": require('../../resources/images/godyPremium.png'),
        "price": 35,
        "seats": 4,
        "time": "1-4 min"
    },
    {
        "id": 3,
        "type": 3,
        "name": "GodyLuxury",
        "description": "Affordable rides, all to yourself",
        "image": require('../../resources/images/godyLuxury.png'),
        "price": 25,
        "seats": 4,
        "time": "1-4 min"
    }
]
export const ChooseCar: FC<Props> = (props) => {

    const [service, setService] = useState<number>(1);

    const navigation = useNavigation<any>();
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity activeOpacity={0.8} style={{ width: 24, height: 24 }} onPress={() => navigation.navigate("Search")}>
                    <FastImage source={require('../../resources/images/back.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            )
        })
    }, [])

    const CarServiceItem = ({ carService }: any) => {
        return (
            <TouchableOpacity
                onPress={() => setService(carService.id)}
                style={service === carService.id ? styles.carServiceItemActive : styles.carServiceItem}
            >
                <FastImage
                    style={{ width: 120, height: 59, marginBottom: 10 }}
                    source={carService.image}
                    resizeMode="cover"
                />
                <CustomText text={carService.name} t2 style={{ textAlign: 'center', fontSize: 14 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'center' }}>
                    <FastImage
                        style={{ width: 12, height: 12, marginRight: 5 }}
                        source={require('../../resources/images/user.png')}
                        tintColor={colors.neutral2}
                    />
                    <CustomText text={carService.seats} s style={{ color: colors.neutral1 }} />
                    <FastImage
                        style={{ width: 12, height: 12, marginLeft: 10, marginRight: 5 }}
                        source={require('../../resources/images/clock.png')}
                        tintColor={colors.neutral2}
                    />
                    <CustomText text={carService.time} s style={{ color: colors.neutral1 }} />
                </View>
                <CustomText text={carService.description} s style={{ marginTop: 10, color: colors.neutral2, textAlign: 'center' }} />
                <CustomText text={`$ ${carService.price}`} t1 style={{ marginTop: 15, color: colors.primary1, textAlign: 'center' }} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container} >
            <MapboxGL.MapView
                style={styles.map}
                logoEnabled={false}
            >
                <MapboxGL.Camera
                    zoomLevel={15}
                    centerCoordinate={[106.606120, 16.612990]}
                />
                <MapboxGL.PointAnnotation id="1" coordinate={[106.606120, 16.612990]} />
            </MapboxGL.MapView>
            <View style={styles.search}>
                <CustomText text="Chooose a trip or swipe up for more" t2 />
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {carServices.map((car: CarService) => {
                            return (
                                <CarServiceItem key={car.id} carService={car} />
                            )
                        })}
                    </ScrollView>
                    <CustomCardPayment
                        cardInfo="*** 9999"
                        iconRight={require('../../resources/images/forward.png')}
                        iconLeft={require('../../resources/images/visa.png')}
                        onPress={() => navigation.navigate("ChoosePayment")}
                    />
                    <View style={{ width: constants.widthDevice - 40, height: 48, marginTop: 10 }}>
                        <CustomButton type="primary" title="Next" />
                    </View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: constants.heightDevice * 0.45,
        width: constants.widthDevice,
    },
    search: {
        marginTop: -15,
        height: constants.heightDevice * 0.55 + 15,
        width: constants.widthDevice,
        padding: 20,
        paddingTop: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: '#fafafa',
        paddingBottom: 80
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