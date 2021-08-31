import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { LogBox, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import constants from '../../contants/contants';
import { CustomTextFieldWithIcon } from '../../components/CustomTextFiledWithIcon';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesInput } from '../../components/GooglePlacesInput';
import { colors } from '../../contants/colors';
import { CustomButton } from '../../components/CustomButton';
import { Location } from '../../types';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import Geolocation from '@react-native-community/geolocation';

LogBox.ignoreLogs(['ReactNativeFiberHostComponent']);
LogBox.ignoreLogs(['Mapbox warning Falling back']);
// LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
// MapboxGL.setAccessToken(constants.MapBoxKey);

interface Props {
    navigation: any;
}

//TODO: set dummy origin location
const originDummy = {
    "location": {
        "lat": 16.6077752,
        "lng": 106.6043628
    },
    "description": "31 Lê Quý Đôn, An Hà, Lao Bảo, Hướng Hóa, Quảng Trị"
}
export const Home: FC<Props> = (props) => {
    const navigation = useNavigation<any>();
    const [keyword, setKeyword] = useState<string>();
    const [origin, setOrigin] = useState<Location>(originDummy);
    const [userLocation, setUserLocation] = useState<any>();

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerLeft: () => (
                <TouchableOpacity activeOpacity={0.8} style={{ width: 24, height: 24 }} onPress={() => navigation.openDrawer()}>
                    <Image source={require('../../resources/images/list.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            )
        });
        Geolocation.getCurrentPosition(info => setUserLocation({
            longitude: info.coords.longitude,
            latitude: info.coords.latitude
        }));
    }, [])

    const getUserLocation = () => {
        Geolocation.getCurrentPosition(info => setUserLocation({
            longitude: info.coords.longitude,
            latitude: info.coords.latitude
        }));
    }

    return (
        <View style={styles.container} >
            <View style={styles.map}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={StyleSheet.absoluteFillObject}

                    initialRegion={{
                        latitude: 16.6131203,
                        longitude: 106.5982622,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {origin &&
                        <Marker
                            key='origin'
                            coordinate={{ latitude: origin.location.lat, longitude: origin.location.lng }}

                        >
                            <FastImage
                                source={require('../../resources/images/car_map.png')}
                                style={{ width: 16, height: 32 }}
                            />
                        </Marker>
                    }
                </MapView>
            </View>
            <View style={styles.search}>
                <GooglePlacesInput
                    // onPress={(data, detail = null) => setOrigin({
                    //     location: detail.geometry.location,
                    //     description: data.description
                    // })}
                    defaultValue={originDummy.description}
                />
                <View >
                    <CustomTextFieldWithIcon
                        text="Add home"
                        icon={require('../../resources/images/star.png')}
                    />
                    <CustomTextFieldWithIcon
                        text="Set location on map"
                        icon={require('../../resources/images/home.png')}
                    />
                    <View style={{ width: constants.widthDevice - 40, height: 48, marginTop: 30, flexDirection: 'row' }}>
                        <View style={{ width: 117, marginRight: 20 }}>
                            <CustomButton
                                onPress={() => navigation.navigate("Search", { origin })}
                                title="Trips"
                                type="primary"
                                leftIcon={require('../../resources/images/car.png')}
                            />
                        </View>
                        <View style={{ width: 117 }}>
                            <CustomButton
                                onPress={() => navigation.navigate("Search", { origin })}
                                title="Eats"
                                type="light"
                                leftIcon={require('../../resources/images/food.png')}
                            />
                        </View>

                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={getUserLocation}
                style={styles.location_btn}
            >
                <FastImage
                    style={{ width: 25, height: 25 }}
                    source={require('../../resources/images/marker.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: constants.heightDevice * 0.5,
        width: constants.widthDevice,
    },
    search: {
        marginTop: -15,
        height: constants.heightDevice * 0.5 + 15,
        width: constants.widthDevice,
        padding: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: 'white',
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
    location_btn: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 48,
        backgroundColor: colors.white,
        right: 15,
        top: constants.heightDevice / 2 - 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
