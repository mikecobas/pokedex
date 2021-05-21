import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, View, Text, Image } from 'react-native'
import { forEach, map, slice, concat } from 'lodash'
import { getPokemonsApi } from '../util/api'
import { Searchbar, Button } from 'react-native-paper'
import GridPokemon from '../components/GridPokemon'

export default function Home () {

    const [lastCount, setLastCount] = useState(0)
    const [item, setItems] = useState(50)
    const [total, setTotal] = useState(0);
    const [pokemons, setPokemons] = useState(null)
    const [listPokemons, setListPokemons] = useState(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (item == 50) {
            (async () => {
                const response = await getPokemonsApi(lastCount)
                setTotal(response.count)
                setPokemons(response.results)
                setListPokemons(response.results)
            })()
        }
    }, [])

    const getList = async (item, lastCount) => {
        setLastCount(lastCount += 50)
        const response = await getPokemonsApi(lastCount)

        setTotal(response.count)
        setPokemons(concat(pokemons, response.results))
        setListPokemons(concat(pokemons, response.results))
    }
    const loadMore = () => {
        if (item < total) {

            getList(50, lastCount)
            console.log('count ', lastCount)
        } else {
            setLastCount(total)
            console.log('item ', item)
        }
        console.log('item ', item)

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
            <StatusBar style="auto" />
            <Searchbar
                placeholder="Search pokemon"
                style={{ marginHorizontal: 8, marginVertical: 8 }} onChangeText={(text) => quickSearch(text)} />
            <ScrollView
                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginVertical: 8, marginHorizontal: 4, alignItems: 'center', paddingBottom: 40 }}>
                {map(listPokemons, (pokemon, index) => (
                    <GridPokemon key={pokemon.name} item={pokemon} />

                ))
                }
                <View style={{ width: '100%', marginTop: 16 }}>
                    {pokemons && pokemons.length != total && <Button style={{ flex: 1, marginVertical: 16, width: '100%' }} onPress={() => loadMore(item)}>Load more</Button>}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
