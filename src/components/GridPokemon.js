import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function GridPokemon (props) {
    const navigation = useNavigation()
    const route = useRoute()
    const { name, url } = props.item
    const id = url.split('/')

    const goPokemonView = (id) => {
        navigation.navigate('pokemon', {
            id
        })
    }


    return (
        <TouchableOpacity style={{ width: '30%', marginVertical: 4, marginHorizontal: 4, }} onPress={() => goPokemonView(id[6])}>
            <View style={{ alignItems: 'center', padding: 4, backgroundColor: '#fff' }}>
                <Image source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id[6]}.png`,
                }}
                    style={{ width: 200, height: 100, resizeMode: 'contain' }} />
                <Text>{id[6]}</Text>
                <Text>{name}</Text>
            </View>
        </TouchableOpacity>

    )
}
