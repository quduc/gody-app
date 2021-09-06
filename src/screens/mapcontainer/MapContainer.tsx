import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Location } from '../../types';

interface Props {
    origin?: Location;
}
const originDummy = {
    "location": {
        "lat": 16.6131186,
        "lng": 106.5982646
    },
    "description": "31 Lê Quý Đôn, An Hà, Lao Bảo, Hướng Hóa, Quảng Trị"
}
export const MapContainer: FC<Props> = (props) => {
    const { origin } = props;
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
                latitude: originDummy.location.lat,
                longitude: originDummy.location.lng,
                latitudeDelta: 0.008922,
                longitudeDelta: 0.008421,
            }}
        >
            {origin &&
                <Marker
                    key='origin'
                    coordinate={{ latitude: origin.location.lat, longitude: origin.location.lng }}

                />
            }
        </MapView>
    )
}