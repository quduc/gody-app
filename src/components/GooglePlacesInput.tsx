import React, { useEffect, useRef } from 'react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../contants/colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CustomPlacesItem } from './CustomPlacesItem';
interface Props {
    placeholder?: string;
    onPress?: (data: any, detail: any) => void;
    defaultValue?: string;
}
export const GooglePlacesInput: FC<Props> = (props) => {

    return (
        <>
            {props.onPress ? (
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
                            width: '100%'
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

                    onPress={props.onPress}
                    enablePoweredByContainer={false}
                    query={{
                        key: 'AIzaSyASkeupHzdx79vDHyE-uXmG_0-8i01OvEs',
                        language: 'vi',
                        components: 'country:vn',

                    }}
                    onFail={(err) => console.log(err)}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />
            ) : (

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
                    textInputProps={{
                        value: props.defaultValue
                    }}
                    fetchDetails={true}
                    styles={{
                        container: {
                            flex: 0,
                            width: '100%'
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

                    onPress={props.onPress}
                    enablePoweredByContainer={false}
                    query={{
                        key: 'AIzaSyDFiUkkl5Uj-i3WDus4RLS_nf4M2TNDPwA',
                        language: 'vi',
                        components: 'country:vn',

                    }}
                    onFail={(err) => console.log(err)}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />
            )}

        </>
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
