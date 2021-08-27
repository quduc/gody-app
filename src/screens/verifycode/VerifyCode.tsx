import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';

interface Props {
    route: RouteProp<{ params: { phoneNumber: number } }, 'params'>
}
export const VerifyCode: FC<Props> = ({ route: { params: { phoneNumber } } }) => {
    const navigation = useNavigation<any>();
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => (
                <TouchableOpacity activeOpacity={0.8} style={{ width: 24, height: 24 }} onPress={() => navigation.navigate("SignUp")}>
                    <FastImage source={require('../../resources/images/back.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            )
        })
    }, [])
    return (
        <CustomBackground>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <CustomText
                    text="Please enter the 4-digit code send to you at " p1
                />
                <CustomText
                    text={phoneNumber} t2 style={{ color: colors.primary1 }}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',

            }}>
                <TextInput
                    placeholder="000000"
                    style={styles.input}
                />
                <TouchableOpacity>
                    <FastImage
                        source={require('../../resources/images/delete.png')}
                        style={{ width: 20, height: 20, marginBottom: -26 }}
                        tintColor={colors.neutral2}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginTop: 100 }}>
                <CustomText text="Didn't recieve it?" style={{ color: colors.neutral1 }} t2 />
                <CustomText text="Request new code in 00:28" style={{ color: colors.neutral2 }} t2 />
            </TouchableOpacity>
            <CustomButton
                type="primary"
                title="Submit"
                onPress={() => navigation.navigate("Home")}
            />
        </CustomBackground>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 30,
        fontSize: 24,
        fontWeight: 'bold',
        width: '80%',
    }
})