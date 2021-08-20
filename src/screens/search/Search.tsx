import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CustomButton } from '../../components/CustomButton';
import { CustomTextFieldWithIcon } from '../../components/CustomTextFiledWithIcon';
import { GooglePlacesInput } from '../../components/GooglePlacesInput';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';


export const Search = () => {
    const navigation = useNavigation<any>();
    useEffect(() => {
        navigation.setOptions({
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
                    <GooglePlacesInput />
                </View>

            </View>
            <View style={styles.row}>
                <View style={styles.dot} />
                <View style={{ width: 10 }} />
                <View style={{ width: constants.widthDevice - 60 }}>
                    <GooglePlacesInput />
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
                    onPress={() => navigation.navigate({ name: "Search" })}
                    title="Next"
                    type="primary"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 100
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

