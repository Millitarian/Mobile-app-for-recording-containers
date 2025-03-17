import * as React from 'react';
import { View, Text, Button, Pressable} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

// Screens
import QrGenScreen from './screens/QrGenScreen';
import Welcome from './screens/Welcome';
import SearchScreen from './screens/SearchScreen';
import DbScreen from './screens/DbScreen';
import QrScreen from './screens/QrScreen';
import ViewAll from './screens/ViewAll';

// Screen names
const SearchName = 'Search';
const DbName = 'DataBase';
const QrName = 'QrCode';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Container(){
    return(
            <Tab.Navigator
            initialRouteName={SearchName}
            screenOptions={({route}) => ({
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: { paddingBottom: 15, fontSize: 10}, 
                tabBarStyle: {padding: 10, height: 70},
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === SearchName){
                        iconName = focused ? 'search' : 'search-outline'
                    } else if (rn === DbName) {
                        iconName = focused ? 'list' : 'list-outline'
                    } else if (rn === QrName) {
                        iconName = focused ? 'qr-code' : 'qr-code-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}
            >

            <Tab.Screen name={SearchName} component={SearchScreen}/>
            <Tab.Screen name={DbName} component={DbScreen}/>
            <Tab.Screen name={QrName} component={QrScreen}/>

            </Tab.Navigator>
    )
}


export default function MainContainer(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" options={{headerShown: false }} component={Welcome}/>
                <Stack.Screen name="Main" options={{headerShown: false }} component={Container}/>
                <Stack.Screen name="AllInfo" component={ViewAll}/>
                <Stack.Screen name="QrGenScreen" component={QrGenScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}