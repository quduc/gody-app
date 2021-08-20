import React, { useEffect, useRef } from 'react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../contants/colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CustomTextFieldWithIcon } from './CustomTextFiledWithIcon';
import { CustomPlacesItem } from './CustomPlacesItem';
interface Props {
    placeholder?: string;
}
export const GooglePlacesInput: FC<Props> = (props) => {
    // const ref = useRef<any>();

    // useEffect(() => {
    //     ref.current?.clear();
    // }, []);
    return (
        <GooglePlacesAutocomplete
            // ref={ref}
            placeholder='Search your location'
            disableScroll={false}
            renderRow={(data, index) => {
                return (
                    <CustomPlacesItem
                        text={data.description}
                    />
                )
            }}
            fetchDetails={true}
            styles={{
                container: {
                    flex: 0,
                    width:'100%'
                },
                textInput: {
                    width: '80%',
                    backgroundColor: colors.neutral4,
                    borderRadius: 12,
                    paddingHorizontal: 20,
                    height: 48,
                    marginVertical: 10
                },
            }}

            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            enablePoweredByContainer={false}
            query={{
                key: 'AIzaSyDe_0_v2DGBnYrEnMMAicfX1xW6_SYztSs',
                language: 'vi',
                components: 'country:vn',

            }}
            onFail={(err) => console.log(err)}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 48,
        marginVertical: 10,
        width: '100%',
    }
})
