import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import * as Network from 'expo-network';
import { SafeAreaView, ScrollView, View, Text, Image, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { map, concat } from 'lodash'
import { getPokemonsApi } from '../util/api'
import { Searchbar, Button } from 'react-native-paper'
import GridPokemon from '../components/GridPokemon'
import { i18n } from '../i18n/translate'
import { useTheme } from 'react-native-paper';

export default function Home () {
    const {colors, theme} = useTheme()
    const [lastCount, setLastCount] = useState(0)
    const [connected, setConnected] = useState(true)
    const [item, setItems] = useState(50)
    const [total, setTotal] = useState(0);
    const [pokemons, setPokemons] = useState(null)
    const [listPokemons, setListPokemons] = useState(null)
    const [search, setSearch] = useState('')

    useEffect(() => {

        (async () => {
            const network = await Network.getNetworkStateAsync();
            setConnected(network.isConnected)
            if (connected) {
                const response = await getPokemonsApi(lastCount)
                setTotal(response.count)
                setPokemons(response.results)
                setListPokemons(response.results)
                storeData(response.results)
            } else {
                const localResponse = await getData()
                setPokemons(localResponse);
                setListPokemons(localResponse)
            }
        })()

    }, [theme])

    const getList = async (item, lastCount) => {
        setLastCount(lastCount += 50)
        const response = await getPokemonsApi(lastCount)

        setTotal(response.count)
        setPokemons(concat(pokemons, response.results))
        setListPokemons(concat(pokemons, response.results))
        const getLocalData = await getData()
        await storeData(concat(getLocalData, response.results))

    }
    const loadMore = () => {
        if (item < total) {

            getList(50, lastCount)
           // console.log('count ', lastCount)
        } else {
            setLastCount(total)
          //  console.log('item ', item)
        }
       // console.log('item ', item)

    }
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('pokemons', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('pokemons')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    const quickSearch = (text) => {

        setSearch(text)
        const filters = text.split('')
        let resultFilter = pokemons;
        for (let fl of filters) {
            resultFilter = resultFilter.filter((item) => {
                const itemData = `${item.name.toUpperCase()}}`;
                const textData = fl.toUpperCase();

                return itemData.indexOf(textData) > -1;
            });
        }
        if (text = '') {
            setListPokemons(pokemons)
        } else {
            setListPokemons(resultFilter)
        }

    }

    return (
        <SafeAreaView>
            <StatusBar style={theme === 'light'? 'dark': 'light'} />
            <TextInput
                testID="search"
                placeholder={i18n.t('search')}
                placeholderTextColor='#999'
                style={{ marginHorizontal: 8, marginVertical: 8, borderWidth:0.5,height:40, borderRadius:8, padding:8}} onChangeText={(text) => quickSearch(text)} />
            {listPokemons && <ScrollView
                testID="pokemons-container"
                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginVertical: 8, marginHorizontal: 4, alignItems: 'center', paddingBottom: 40 }}>
                {map(listPokemons, (pokemon, index) => (
                    <GridPokemon testID="pokemonGrid" key={pokemon.name} item={pokemon} />

                ))
                }
                <View style={{ width: '100%', marginTop: 16 }}>
                    {pokemons && connected && pokemons.length != total && <Button testID="load-button" style={{ flex: 1, marginVertical: 16, width: '100%' }} onPress={() => loadMore(item)}>Load more</Button>}
                </View>
            </ScrollView>}
        </SafeAreaView>
    )
}
