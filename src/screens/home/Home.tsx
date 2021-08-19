import React from 'react';
import { FC } from 'react';
import { CustomBackground } from '../../components/CustomBackground';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { LogBox, StyleSheet, View } from 'react-native';
import constants from '../../contants/contants';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { colors } from '../../contants/colors';
import { CustomSearch } from '../../components/CustomSearch';
import { CustomTextFieldWithIcon } from '../../components/CustomTextFiledWithIcon';

LogBox.ignoreLogs(['ReactNativeFiberHostComponent']);

MapboxGL.setAccessToken(constants.MapBoxKey);

interface Props { }
export const Home: FC<Props> = (props) => {
    return (
        <CustomBackground style={{ paddingHorizontal: 0 }}>
            <View style={styles.container}>
                <MapboxGL.MapView
                    style={styles.map}
                    logoEnabled={false}
                // zoomEnabled={true}
                >
                    <MapboxGL.Camera
                        zoomLevel={15}
                        centerCoordinate={[106.606120, 16.612990]}
                    />
                    <MapboxGL.PointAnnotation id="1" coordinate={[106.606120, 16.612990]} />
                    <BottomSheet
                        index={0}
                        snapPoints={[constants.heightDevice * 0.35, constants.heightDevice]}
                    >
                        <BottomSheetScrollView
                            style={{ backgroundColor: colors.white }}
                            contentContainerStyle={{ padding: 20 }}>
                            <CustomSearch />
                            <CustomTextFieldWithIcon
                                text="Add home"
                                icon={require('../../resources/images/star.png')}
                            />
                            <CustomTextFieldWithIcon
                                text="Set location on map"
                                icon={require('../../resources/images/home.png')}
                            />
                        </BottomSheetScrollView>
                    </BottomSheet>
                </MapboxGL.MapView>
            </View>
        </CustomBackground>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    container: {
        height: constants.heightDevice,
        width: constants.widthDevice,
    },
    map: {
        flex: 1
    }
});