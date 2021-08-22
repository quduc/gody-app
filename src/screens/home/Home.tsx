import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { LogBox, StyleSheet, View, TouchableOpacity } from 'react-native';
import constants from '../../contants/contants';
import { CustomTextFieldWithIcon } from '../../components/CustomTextFiledWithIcon';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesInput } from '../../components/GooglePlacesInput';
import FastImage from 'react-native-fast-image';
import { colors } from '../../contants/colors';
import { CustomText } from '../../components/CustomText';
import { CustomButton } from '../../components/CustomButton';

LogBox.ignoreLogs(['ReactNativeFiberHostComponent']);
LogBox.ignoreLogs(['Mapbox warning Falling back']);
// LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
MapboxGL.setAccessToken(constants.MapBoxKey);

interface Props {
    navigation: any; //open drawer
}
export const Home: FC<Props> = (props) => {
    const navigation = useNavigation<any>();
    const [keyword, setKeyword] = useState<string>();
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
        })
    }, [])
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
                <GooglePlacesInput />
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
                        {/* btn car booking */}
                        <View style={{ width: 117, marginRight: 20 }}>
                            <CustomButton
                                onPress={() => navigation.navigate({ name: "Search" })}
                                title="Trips"
                                type="primary"
                                leftIcon={require('../../resources/images/car.png')}
                            />
                        </View>
                        <View style={{ width: 117 }}>
                            <CustomButton
                                onPress={() => navigation.navigate({ name: "Search" })}
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