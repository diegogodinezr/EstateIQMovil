import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//screens
import HomeTabScreen from "./screens/HomeTabScreen";
import DiscoverScreen from "./screens/DiscoverScreen";
import AccountScreen from "./screens/AccountScreen";
import WelcomeScreen from "./screens/WelcomeScreen"; 
import MessagesScreen from "./screens/MessagesScreen";
import AddScreen from "./screens/AddScreen";
import RegisterScreen from "./screens/RegisterScreen"; // Importa RegisterScreen
import LoginScreen from "./screens/LoginScreen"; // Importa LoginScreen
import AccountNotifications from "./screens/AccountNotifications"; 
import AccountProfile from "./screens/AccountProfile"; 
import OpenChat from "./screens/OpenChat"; // Importa OpenChat

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                tabBarActiveTintColor: '#FFC157',
                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle: {
                    fontSize: 14, 
                    fontWeight: 'bold', 
                    marginBottom: 5, 
                },
                tabBarStyle: {
                    height: 60, 
                }
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeTabScreen}
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="home" size={35} color={focused ? '#FFC157' : 'black'} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Discover"
                component={DiscoverScreen}
                options={{
                    tabBarLabel: 'Descubrir',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="compass" size={35} color={focused ? '#FFC157' : 'black'} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Add"
                component={AddScreen}
                options={{
                    tabBarLabel: 'Agregar',
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="add-circle" size={35} color={focused ? '#FFC157' : 'black'} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Messages"
                component={MessagesStackScreen} // Cambia a MessagesStackScreen
                options={{
                    tabBarLabel: 'Mensajes',
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="chat" size={35} color={focused ? '#FFC157' : 'black'} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarLabel: 'Cuenta',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="account" size={35} color={focused ? '#FFC157' : 'black'} />
                    ),
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}

// Crea un Stack Navigator específico para las pantallas de mensajes
function MessagesStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="MessagesScreen" 
                component={MessagesScreen} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="OpenChat" 
                component={OpenChat} 
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    );
}

function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen 
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Home"
                    component={MyTabs} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Register"
                    component={RegisterScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Login"
                    component={LoginScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="ProfileScreen" 
                    component={AccountProfile} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="NotificationsScreen" 
                    component={AccountNotifications} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen
                    name="Account"
                    component={AccountScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigation;
