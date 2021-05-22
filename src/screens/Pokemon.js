import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import { ProgressBar, Colors, Badge, Divider, ActivityIndicator, Title } from 'react-native-paper'
import { forEach, map, slice, concat } from 'lodash'
import { getPokemonDetail } from '../util/api'
import { i18n } from '../i18n/translate'

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

    const transformText = (text) => {
        return text.replace('-', '_')
    }
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
                                <Badge style={styles.type}>{item.type.name.toUpperCase()}</Badge>
                            ))}
                        </View>
                        <View style={styles.types}>
                            <Text style={styles.data}>{i18n.t('height')}: {detail.height}</Text>
                            <Text style={styles.data}>{i18n.t('weight')}: {detail.weight}</Text>
                        </View>
                        <Text style={styles.name}>{detail.name.toUpperCase()}</Text>

                    </View>
                    <Divider />
                    <ScrollView style={styles.statsContainer}>


                        <Title>{i18n.t('stats')}</Title>
                        {map(detail.stats, (item) => (
                            <View style={styles.statsRow}>
                                <View style={styles.statsName}>
                                    <Text>{i18n.t(transformText(item.stat.name))} :</Text>
                                </View>
                                <View style={styles.progressContainer}>
                                    <ProgressBar progress={item.base_stat / 300} color={Colors.blue700} style={{ height: 8 }} />
                                </View>
                                <View style={styles.amount}>

                                    <Text style={{ marginHorizontal: 8 }}>{item.base_stat}</Text>
                                </View>

                            </View>
                        ))}
                        <Divider />
                        <Title>{i18n.t('moves')}</Title>
                        {map(detail.moves, (item, index) => (
                            <View style={styles.movesRow}>
                                <View style={styles.moveName}>
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
    data: {
        fontSize: 12,
        marginHorizontal: 4
    },
    name: {
        fontSize: 24,
        fontWeight: '500',
        marginVertical: 8
    },
    statsContainer: {
        width: '100%',
        paddingTop: 16,
        marginHorizontal: 8,
        paddingBottom: 24,
        marginBottom: 8
    },
    type: {
        backgroundColor: Colors.grey300,
        marginHorizontal: 4,
        marginBottom: 4
    },
    statsRow: {
        flexDirection: 'row',
        marginVertical: 8,
        width: '100%'
    },
    statsName: {
        width: '20%',
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    progressContainer: {
        width: '60%',
        justifyContent: 'center'
    },
    amount: {
        width: '20%', flexDirection: 'row', alignItems: 'center'
    },
    movesRow: {
        flexDirection: 'row',
        marginVertical: 8,
        width: '100%'
    },
    moveName: {
        paddingRight: 8,
        flexDirection: 'row'
    },
})