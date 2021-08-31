import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { AddPaymentMethod } from '../../components/AddPaymentMethod';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomCardPayment } from '../../components/CustomCardPayment';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';

interface Props { }
export const ChoosePayment: FC<Props> = observer((props) => {

    const navigation = useNavigation<any>();
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => <CustomHeaderLeft type="goback" onPress={() => navigation.navigate("ChooseCar")} />
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

            <View style={{ width: constants.widthDevice - 40, height: 48, marginTop: 10, marginBottom: 20 }}>
                <CustomButton
                    type="primary"
                    title="User payment method"
                />
            </View>
        </CustomBackground>
    )
});