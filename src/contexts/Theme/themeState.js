/* eslint-disable import/no-anonymous-default-export */
import React, {useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeReducer from './themeReducer';
import themeContext from './themeContext'
import {
    THEME_DARK,
    THEME_LIGHT
} from '../../types';

const ThemeState = (props) => {
    const initialState = {
        theme:  AsyncStorage.getItem('darkmode')
    }

    const [state, dispatch] = useReducer(themeReducer, initialState);

    const changeTheme = (theme) => {
        if (theme==='dark') {
            dispatch({
                type: THEME_DARK
            });
        } else {
            dispatch({
                type: THEME_LIGHT
            });
       }

        
    }
    
    return (
        <themeContext.Provider
            value={{
                theme: state.theme,
                changeTheme
        }} 
        >
            {
                props.children
            }
        </themeContext.Provider>
    )

}


export default ThemeState
