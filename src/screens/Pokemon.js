import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import { ProgressBar, Colors, Badge, Divider, ActivityIndicator, Title } from 'react-native-paper'
import { forEach, map, slice, concat } from 'lodash'
import { getPokemonDetail } from '../util/api'

export default function Pokemon (props) {
    const { route } = props;
    const { params } = route;
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await getPokemonDetail(params.id)
            console.log(response.stats)
            setDetail(response)
            setLoading(false)
        })()

    }, [params.id])

    return (
        <>
            {detail && !loading &&
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Image source={{
                            uri: `${detail.sprites.front_default}`,
                        }}
                            style={styles.image} />
                        <View style={styles.types}>
                            {map(detail.types, (item) => (
                                <Badge>{item.type.name.toUpperCase()}</Badge>
                            ))}
                        </View>
                        <View style={styles.types}>
                            <Text >Height : {detail.height}</Text>
                            <Text >Weight : {detail.weight}</Text>
                        </View>
                        <Text style={styles.name}>{detail.name.toUpperCase()}</Text>

                    </View>
                    <Divider />
                    <ScrollView style={styles.statsContainer}>


                        <Title>Stats</Title>
                        {map(detail.stats, (item) => (
                            <View style={{ flexDirection: 'row', marginVertical: 8, width: '100%' }}>
                                <View style={{ width: '20%', paddingRight: 8, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text>{item.stat.name.toUpperCase()} :</Text>
                                </View>
                                <View style={{ width: '60%', justifyContent: 'center' }}>
                                    <ProgressBar progress={item.base_stat / 300} color={Colors.blue700} style={{ height: 8 }} />
                                </View>
                                <View style={{ width: '20%', flexDirection: 'row', alignItems: 'center' }}>

                                    <Text style={{ marginHorizontal: 8 }}>{item.base_stat}</Text>
                                </View>

                            </View>
                        ))}
                        <Divider />
                        <Title>Moves</Title>
                        {map(detail.moves, (item, index) => (
                            <View style={{ flexDirection: 'row', marginVertical: 8, width: '100%' }}>
                                <View style={{ paddingRight: 8, flexDirection: 'row' }}>
                                    <Text>{index + 1} {item.move.name.toUpperCase().replace('-', ' ')}</Text>
                                </View>


                            </View>
                        ))}
                    </ScrollView>

                </View>
            }

            {loading && <ActivityIndicator animating={true} color={Colors.red800} />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerContainer: {
        alignItems: 'center',
        padding: 4,
        backgroundColor: '#fff'
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    types: {
        flexDirection: 'row'
    },
    name: {
        fontSize: 24,
        fontWeight: '500',
        marginVertical: 8
    },
    statsContainer: {
        width: '100%',
        paddingTop: 16,
        marginHorizontal: 8
    }
})