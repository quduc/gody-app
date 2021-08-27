import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';

export const SignIn: FC = () => {
    const navigation = useNavigation<any>();
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => (
                <TouchableOpacity activeOpacity={0.8} style={{ width: 24, height: 24 }} onPress={() => navigation.goBack()}>
                    <FastImage source={require('../../resources/images/back.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            )
        })
    }, [])
    return (
        <CustomBackground>
            <CustomText text="Enter your mobile number:" t2 style={{ color: colors.neutral2, marginTop: 20 }} />
            <View style={styles.phone}>
                <FastImage
                    style={{ width: 30, height: 24 }}
                    source={require('../../resources/images/vietnam_flag.png')}
                />
                <CustomText p1 text="+84" style={{ marginHorizontal: 10 }} />
                <TextInput
                    value="935 007 581"
                    style={{
                        color: colors.neutral1,
                        fontSize: 18,
                        borderLeftWidth: 1,
                        borderLeftColor: colors.neutral1,
                        paddingHorizontal: 10
                    }}
                />
            </View>
            <CustomButton
                title="Send"
                type="primary"
                onPress={() => navigation.navigate("VerifyCode", {
                    phoneNumber: "935 007 581"
                })}
            />
            <CustomText text="Buy cotinuing you may receive an SMS for verification. Message and data rates may apply."
                s style={{ color: colors.neutral2 }} />
        </CustomBackground>
    )
}
const styles = StyleSheet.create({
    phone: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: colors.neutral2,
        height: 48,
        borderRadius: 12,
        alignItems: 'center'
    }
})