import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
interface Props { };

export const RootStack: FC<Props> = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

