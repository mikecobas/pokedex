/* eslint-disable import/no-anonymous-default-export */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    THEME_DARK,
    THEME_LIGHT
} from '../../types';



export default (state, action) => {
    switch (action.type) {

        case THEME_DARK:
            AsyncStorage.setItem('darkmode','dark')
            return {
                theme: 'dark'
            }
        case THEME_LIGHT:
            AsyncStorage.setItem('darkmode','light')
            return {
                theme: 'light'
            }

        default:
            console.log('default')
            return state;

    }
}