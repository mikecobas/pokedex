import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useRoute, useTheme } from '@react-navigation/native'

export default function GridPokemon (props) {
    const { colors } = useTheme()
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
            <View style={{ alignItems: 'center', padding: 4, backgroundColor: colors.backgroundCard, position:'relative' }}>
                <View style={{position:'absolute', left:2, top:2}}>
                    <Text style={{ color: colors.text, textTransform: 'capitalize',  paddingVertical:5, paddingHorizontal:10, fontSize:12 }}>{id[6]}</Text>
                </View>
                <Image source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id[6]}.png`,
                }}
                    style={{ width: 180, height: 90, resizeMode: 'contain',marginVertical:4,marginHorizontal:4 }} />
                <Text style={{ color: colors.text, textTransform: 'capitalize' }}>{name}</Text>

            </View>
        </TouchableOpacity>

    )
}
