import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';

export const EditAccount: FC = () => {
    const navigation = useNavigation<any>();
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => (
                <TouchableOpacity activeOpacity={0.8} style={{ width: 24, height: 24 }} onPress={() => navigation.navigate("Settings")}>
                    <FastImage source={require('../../resources/images/back.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            )
        })
    }, []);

    const renderVerticalField = (label: string, field?: string, value?: string) => {
        return (
            <View>
                <CustomText text={label} t2 style={{ color: colors.neutral2, marginVertical: 10 }} />
                <TouchableOpacity
                    onPress={() => navigation.navigate("UpdateUserInfo", {
                        labelField: label,
                        infoField: field,
                        fieldValue: value,
                    })}
                    style={styles.info_field}>
                    <CustomText text={value} p1 style={{ color: colors.neutral1 }} />
                    <FastImage
                        style={{ width: 15, height: 15 }}
                        source={require('../../resources/images/forward.png')}
                        resizeMode="contain"
                        tintColor={colors.primary1}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <CustomBackground>
            <View style={styles.user_image}>
                <FastImage
                    style={{ width: 100, height: 100, borderRadius: 100 }}
                    source={require('../../resources/images/Avatar.png')}
                    resizeMode="contain"
                />
            </View>
            {renderVerticalField('First name', 'first_name', 'Push')}
            {renderVerticalField('Last name', 'last_name', 'Puttichai')}
            {renderVerticalField('Phone number', 'phone_number', '9784 2348')}
            {renderVerticalField('Email', 'email', 'pushputtichai789@gmail.com')}
            {renderVerticalField('Password', 'password', '*******')}
        </CustomBackground>
    )
}
const styles = StyleSheet.create({
    user_image: {
        marginVertical: 20,
        alignItems: 'center'
    },
    info_field: {
        height: 48,
        backgroundColor: colors.neutral4,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12
    }
})