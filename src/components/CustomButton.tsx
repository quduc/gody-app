import React, { Component, FC, ReactNode } from 'react';
import { Image, StyleSheet, TextStyle, TouchableOpacity, View, ViewProps } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from '../contants/colors';
import { CustomText } from './CustomText';

interface Props extends ViewProps {
    title: string;
    onPress?: () => void;
    styleTitle?: TextStyle;
    leftIcon?: any;
    type: 'primary' | 'light';
};

export const CustomButton: FC<Props> = (props) => {
    const { title, onPress, type, leftIcon } = props;
    var buttonColors: string = ''
    var textColor: string = '';
    switch (type) {
        case 'primary':
            textColor = colors.black;
            buttonColors = colors.primary1
            break;
        case 'light':
            textColor = colors.black;
            buttonColors = colors.neutral4;
            break;
    }

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: buttonColors }]} onPress={onPress} >
            {leftIcon && (<FastImage
                style={{ width: 20, height: 20, marginRight: 10 }}
                source={leftIcon}
            />)}
            <CustomText text={title} t2 />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical:10,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        borderRadius: 8
    },
    title: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
    }
})