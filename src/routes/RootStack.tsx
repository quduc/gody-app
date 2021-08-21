import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Home } from '../screens/home/Home';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { CustomText as Text } from '../components/CustomText';
import { colors } from '../contants/colors';
import FastImage from 'react-native-fast-image';
import constants from '../contants/contants';
import { DrawerItemProps } from '../types';
import { Search } from '../screens/search/Search';
import { ChooseCar } from '../screens/choosecar/ChooseCar';
import { GodyPass } from '../screens/godypass/GodyPass';
import { ChoosePayment } from '../screens/choosepayment/ChoosePayment';
import { AddPayment } from '../screens/addpayment/AddPayment';
const Drawer = createDrawerNavigator();
interface Props { };

const drawerItems: DrawerItemProps[] = [
    {
        "id": 0,
        "name": "Your trip",
        "screen": "YourTrip",
        "icon": require('../resources/images/yourtrip.png')
    },
    {
        "id": 1,
        "name": "Payment",
        "screen": "Payment",
        "icon": require('../resources/images/payment.png')
    },
    {
        "id": 2,
        "name": "Help",
        "screen": "Help",
        "icon": require('../resources/images/help.png')
    },
    {
        "id": 3,
        "name": "GODY Pass",
        "screen": "GodyPass",
        "icon": require('../resources/images/godypass.png')
    },
    {
        "id": 4,
        "name": "Send a gift",
        "screen": "SendAGift",
        "icon": require('../resources/images/gift.png')
    },
    {
        "id": 5,
        "name": "Free trip",
        "screen": "FreeTrip",
        "icon": require('../resources/images/free.png')
    },
    {
        "id": 6,
        "name": "Settings",
        "screen": "Settings",
        "icon": require('../resources/images/settings.png')
    },
]
export const RootStack: FC<Props> = () => {



    const CustomDrawerContent = (props: any) => {
        const DrawerItem = ({ item }: DrawerItemProps | any) => {
            return (
                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => props.navigation.navigate(item.screen)}
                >
                    <FastImage
                        style={styles.icon}
                        source={item.icon}
                    />
                    <Text text={item.name} t2 style={{ marginLeft: 20 }} />
                </TouchableOpacity>
            )
        }
        return (
            <DrawerContentScrollView {...props} style={{ backgroundColor: colors.neutral4, flex: 1 }}>
                <View style={styles.userInfo}>
                    <View style={styles.row}>
                        <View>
                            <Text text="Push Puttichai" t2 style={{ marginVertical: 5 }} />
                            <Text text="0989 999 999" s style={{ color: colors.neutral2 }} />
                        </View>
                        <FastImage
                            style={styles.avatar}
                            source={require('../resources/images/Avatar.png')}
                        />
                    </View>
                </View>
                <View style={{ height: constants.heightDevice - 220, paddingHorizontal: 20 }}>
                    {drawerItems.map((item: DrawerItemProps) => <DrawerItem key={item.id} item={item} />)}
                </View>
                <View style={styles.signOut}>
                    <TouchableOpacity style={styles.row}>
                        <FastImage
                            source={require('../resources/images/sign-out.png')}
                            style={styles.icon}
                            tintColor={colors.primary1}
                        />
                        <Text text="Sign Out" t2 style={{ marginLeft: 30 }} />
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>
        )
    }
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={props => <CustomDrawerContent {...props} />}
                initialRouteName="Home"
                screenOptions={({ navigation }) => ({
                    headerLeftContainerStyle: { paddingLeft: 20 },
                    headerStyle: { shadowColor: 'transparent' },
                    headerTransparent: true,
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}>
                            <Image
                                source={require('../resources/images/list.png')}
                                style={[styles.icon]}
                            />
                        </TouchableOpacity>
                    )
                })}
            >
                <Drawer.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerTitle: "",
                    }} />
                <Drawer.Screen
                    name="Search"
                    component={Search}
                    options={{
                        headerTitle: "Search",
                    }} />
                <Drawer.Screen
                    name="ChooseCar"
                    component={ChooseCar}
                    options={{
                        headerTitle: "",
                    }} />
                <Drawer.Screen
                    name="ChoosePayment"
                    component={ChoosePayment}
                    options={{
                        headerTitle: "Select payment",
                    }} />
                <Drawer.Screen
                    name="AddPayment"
                    component={AddPayment}
                    options={{
                        headerTitle: "Add payment",
                    }} />
                <Drawer.Screen
                    name="GodyPass"
                    component={GodyPass}
                    options={{
                        headerTitle: "GODY Pass",
                    }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60
    },
    userInfo: {
        height: 100,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    drawerItem: {
        flexDirection: 'row',
        borderRadius: 4,
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        height: 60,
        marginVertical: 5,
        alignItems: 'center'
    },
    signOut: {
        height: 60,
        paddingTop: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderTopColor: colors.neutral3,
        borderTopWidth: 1
    }
});
