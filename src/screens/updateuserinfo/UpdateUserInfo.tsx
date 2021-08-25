import { RouteProp } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';

interface Props {
    route: RouteProp<{
        params: {
            infoField: string;
            fieldValue: string;
            labelField: string;
        }
    }, 'params'>
}
export const UpdateUserInfo: FC<Props> = ({ route: { params: { infoField, fieldValue, labelField } } }) => {
    const navigation = useNavigation<any>();
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => (
                <TouchableOpacity activeOpacity={0.8} style={{ width: 24, height: 24 }} onPress={() => navigation.navigate("EditAccount")}>
                    <FastImage source={require('../../resources/images/back.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            )
        })
    }, []);
    return (
        <CustomBackground>
            <View style={{ marginTop: 10 }}>
                <CustomText text={labelField} t2 style={{ color: colors.neutral2 }} />
                <CustomInput
                    value={fieldValue}
                />
            </View>
            <CustomButton
                type="primary"
                title={`Update ${labelField}`}
            />
        </CustomBackground>
    )
}