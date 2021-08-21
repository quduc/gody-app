import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';

export const AddPayment: FC = () => {

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
            <CustomButton
                type="light"
                leftIcon={require('../../resources/images/visa.png')}
                title="Visa/Master card"
            />
        </CustomBackground>
    )
}