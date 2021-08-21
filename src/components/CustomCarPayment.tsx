import { TouchableOpacity } from '@gorhom/bottom-sheet';
import React from 'react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from '../contants/colors';
import { CustomText } from './CustomText';

interface Props { }
export const CustomCarPayment: FC<Props> = (props) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FastImage
                    style={{
                        width: 62,
                        height: 40,
                        marginRight: 10
                    }}
                    source={require('../resources/images/visa.png')}
                    resizeMode="contain"
                />
                <CustomText text="*** 9999" p1 />
            </View>
            <FastImage
                source={require('../resources/images/forward.png')}
                style={{ width: 12, height: 12 }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 52,
        backgroundColor: colors.white,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,

        marginVertical: 15
    }
})