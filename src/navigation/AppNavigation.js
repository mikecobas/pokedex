import React, { useState, useEffect, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@react-navigation/native'
import { Image, TouchableOpacity } from 'react-native'
import Home from '../screens/Home'
import Pokemon from '../screens/Pokemon'
import { Ionicons } from '@expo/vector-icons';
import ThemeContext from '../contexts/Theme/themeContext'
const Stack = createStackNavigator();

function LogoTitle () {
    return (
        <Image
            style={{ width: 90, height: 40, resizeMode: 'contain' }}
            source={require('../../assets/pokemon_logo.png')}
        />
    );
}

function Toggle () {
    const themeContext = useContext(ThemeContext)
    const { theme, changeTheme } = themeContext;
    const { colors } = useTheme()
    const [dark, setDark ]=  useState('light')
  
    useEffect(() => {
        (() => {
            if (theme === 'dark') {
              setDark('dark')
            } else {
                setDark('ligth')
          }  
        })()
    }, [theme])
    return (
    <>
        { dark === 'dark' ?
            <TouchableOpacity style={{ marginHorizontal: 16 }} onPress={()=>changeTheme('light')}>
                <Ionicons name="moon" size={24} color={colors.icon} />
            </TouchableOpacity> :
                <TouchableOpacity style={{ marginHorizontal: 16 }} onPress={() => changeTheme('dark')}>
                <Ionicons name="sunny" size={24} color={colors.icon} />
            </TouchableOpacity>
        }
</>
    )
}
export default function AppStack () {
    const { colors } = useTheme()
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primary,
                    borderColor: 'transparent',
                    shadowColor: 'transparent',
                    shadowRadius: 0,
                    shadowOffset: {
                        height: 0,
                    }
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },

            }}>
            <Stack.Screen
                name="home"
                component={Home}
                options={{
                    headerRight: props => <Toggle {...props} />,
                    headerTitle: props => <LogoTitle {...props} />

                }}

            />
            <Stack.Screen
                name="pokemon"
                component={Pokemon}
                options={{
                    headerRight: props => <Toggle {...props} />,
                    headerTitle: props => <LogoTitle {...props} />
                }}

            />

        </Stack.Navigator>
    )
}