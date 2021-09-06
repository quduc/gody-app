import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AddPayment } from '../screens/addpayment/AddPayment';
import { ChooseCar } from '../screens/choosecar/ChooseCar';
import { ChoosePayment } from '../screens/choosepayment/ChoosePayment';
import { ConfirmBooking } from '../screens/confirmbooking/ConfirmBooking';
import { Home } from '../screens/home/Home';
import { Search } from '../screens/search/Search';
import { UpComingTrip } from '../screens/upcomingtrip/UpComingTrip';

const Stack = createStackNavigator();

export const BookingStack = () => {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerLeftContainerStyle: { paddingLeft: 20 },
                headerStyle: { shadowColor: 'transparent' },
                headerTransparent: true,
            })}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerTitle: "",
                }} />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    headerTitle: "Search",
                }} />
            <Stack.Screen
                name="ChooseCar"
                component={ChooseCar}
                options={{
                    headerTitle: "",
                }} />
            <Stack.Screen
                name="ChoosePayment"
                component={ChoosePayment}
                options={{
                    headerTitle: "Select payment",
                }} />
            <Stack.Screen
                name="AddPayment"
                component={AddPayment}
                options={{
                    headerTitle: "Add payment",
                }} />
            <Stack.Screen
                name="ConfirmBooking"
                component={ConfirmBooking}
                options={{
                    headerTitle: "",
                }} />
            <Stack.Screen
                name="UpComingTrip"
                component={UpComingTrip}
                options={{
                    headerTitle: "",
                }} />
        </Stack.Navigator>
    )
}