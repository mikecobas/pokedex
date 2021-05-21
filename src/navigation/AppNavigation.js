import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Image } from 'react-native'
import Home from '../screens/Home'
import Pokemon from '../screens/Pokemon'

const Stack = createStackNavigator();

function LogoTitle () {
    return (
        <Image
            style={{ width: 90, height: 40, resizeMode: 'contain' }}
            source={require('../../assets/pokemon_logo.png')}
        />
    );
}
export default function AppStack () {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#E3350D',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen
                name="home"
                component={Home}
                options={{ headerTitle: props => <LogoTitle {...props} /> }}

            />
            <Stack.Screen
                name="pokemon"
                component={Pokemon}
                options={{ headerTitle: props => <LogoTitle {...props} /> }}

            />

        </Stack.Navigator>
    )
}