import React, { useState, useEffect, useContext } from 'react';
import { Appearance } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation'
import ThemeState from './src/contexts/Theme/themeState'
import ThemeContext from './src/contexts/Theme/themeContext';
import { LightTheme } from './src/util/theme/LightTheme';
import { DarkTheme } from './src/util/theme/DarkTheme';

const App = () => {
  const themeContext = useContext(ThemeContext)
  const { theme } = themeContext
  const [themeDesign, setTheme] = useState()

  useEffect(() => {
    (async () => {
      if (theme === 'dark') {
        setTheme('dark');

      } else {
        setTheme('ligth');
      }
    })()
  }, [theme])



  return (

    <NavigationContainer theme={themeDesign === 'dark' ? DarkTheme : LightTheme}>
      <AppNavigation />
    </NavigationContainer>

  );
}

const MainApp = () => {
  return (
    <ThemeState>
      <PaperProvider>
        <App />
      </PaperProvider>

    </ThemeState>
  )
}

export default MainApp