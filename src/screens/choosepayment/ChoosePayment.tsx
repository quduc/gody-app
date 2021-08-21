import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { AddPaymentMethod } from '../../components/AddPaymentMethod';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomCardPayment } from '../../components/CustomCardPayment';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';

interface Props { }
export const ChoosePayment: FC<Props> = (props) => {

    const navigation = useNavigation<any>();
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => (
                <TouchableOpacity activeOpacity={0.8} style={{ width: 24, height: 24 }} onPress={() => navigation.navigate("ChooseCar")}>
                    <FastImage source={require('../../resources/images/back.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            )
        })
    }, [])
    return (
        <CustomBackground>
            <CustomText text="Payment methods" t2 style={{ color: colors.neutral2, marginTop: 20 }} />
            <CustomCardPayment
                cardInfo="GODY Cash"
                iconLeft={require('../../resources/images/logo.png')}
            // onPress={() => navigation.navigate("ChoosePayment")}
            />
            <CustomCardPayment
                cardInfo="*** 9999"
                iconRight={require('../../resources/images/checked.png')}
                iconLeft={require('../../resources/images/visa.png')}
            // onPress={() => navigation.navigate("ChoosePayment")}
            />

            <AddPaymentMethod
                title="Add Payment methods"
                onPress={() => navigation.navigate("AddPayment")}
            />

            <CustomText
                text="Save up to 15% on all routes when you ride with Gody and Pool in the San Francisco metropolitan  area. Discounts may vary by trip. Save up to 15% on all routes when you ride with Gody and Pool in the San Francisco metropolitan  area. Discounts may vary by trip. Save up to 15% on all routes when you ride with Gody and Pool in the San Francisco metropolitan  area. Discounts may vary by trip. Save up to 15% on all routes when you ride with Gody and Pool in the San Francisco metropolitan  area. Discounts may vary by trip."
                p2
            />
            <CustomText text="Promotion codes" t2 style={{ color: colors.neutral2, marginTop: 20 }} />
            <AddPaymentMethod title="Add promotion codes" />

            <View style={{ width: constants.widthDevice - 40, height: 48, marginTop: 10 }}>
                <CustomButton
                    type="primary"
                    title="User payment method"
                />
            </View>
        </CustomBackground>
    )
}