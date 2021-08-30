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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

LogBox.ignoreLogs(['ReactNativeFiberHostComponent']);
LogBox.ignoreLogs(['Mapbox warning Falling back']);
// LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
// MapboxGL.setAccessToken(constants.MapBoxKey);

interface Props {
    navigation: any; //open drawer
}
export const Home: FC<Props> = (props) => {
    const navigation = useNavigation<any>();
    const [keyword, setKeyword] = useState<string>();
    const [origin, setOrigin] = useState<Location>();
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
        })
    }, [])
    return (
        <View style={styles.container} >
            <View style={styles.map}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={StyleSheet.absoluteFillObject}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
            <View style={styles.search}>
                <GooglePlacesInput
                    onPress={(data, detail = null) => setOrigin({
                        location: detail.geometry.location,
                        description: data.description
                    })}
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
    }
});
{/* <MapboxGL.MapView
                style={styles.map}
                logoEnabled={false}
            >
                <MapboxGL.Camera
                    zoomLevel={15}
                    centerCoordinate={[106.606120, 16.612990]}
                />
                <MapboxGL.PointAnnotation id="1" coordinate={origin
                    ? [origin.location.lng, origin.location.lat]
                    : [106.606120, 16.612990]} />
            </MapboxGL.MapView> */}
{/* <View style={styles.search}>
                <GooglePlacesInput
                    onPress={(data, detail = null) => setOrigin({
                        location: detail.geometry.location,
                        description: data.description
                    })}
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
            </View> */}