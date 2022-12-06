import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screen/HomeScreen.js';
import SettingsScreen from './Screen/SettingsScreen.js';
import Navigation from './components/Navigation.js';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function HomeScreenStack({ active }) {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: 'Home',
                    navigation: () => {
                        <Navigation navigationProps={active} />;
                    },
                }}
            />
        </Stack.Navigator>
    );
}

function SettingScreenStack({ active }) {
    return (
        <Stack.Navigator initialRouteName="SettingsScreen">
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                    navigation: () => {
                        <Navigation navigationProps={active} />;
                    },
                }}
            />
        </Stack.Navigator>
    );
}

export default function Navigator(props) {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
        // drawerContent={SideBar}

        >
            <Drawer.Screen
                name="HomeScreenStack"
                options={{ drawerLabel: 'Home Screen' }}
                component={HomeScreenStack}
            />
            <Drawer.Screen
                name="SettingScreenStack"
                options={{ drawerLabel: 'Setting Screen' }}
                component={SettingScreenStack}
            />
        </Drawer.Navigator>
    );
}
