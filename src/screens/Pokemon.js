import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, ScrollView, Modal, SafeAreaView, TouchableOpacity } from 'react-native'
import { ProgressBar, Colors, Badge, Divider, ActivityIndicator, Title, IconButton, List, Subheading, Paragraph } from 'react-native-paper'
import { map } from 'lodash'
import { getAbility, getPokemonDetail, getTypeInfo } from '../util/api'
import { i18n } from '../i18n/translate'

export default function Pokemon (props) {
    const { route } = props;
    const { params } = route;
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState(null);
    const [ability, setAbility] = useState(null)
    const [types, setTypes] = useState(null)
    const [typeDetail, setTypeDetail] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showAbility, setShowAbility] = useState(false)

    useEffect(() => {
        (async () => {
            const response = await getPokemonDetail(params.id)
            //console.log(response.stats)
            setDetail(response)
            setTypes(response.types)
            setLoading(false)
        })()

    }, [params.id])

    const transformText = (text) => {
        return text.replace('-', '_')
    }

    const getTypeDetail = async (id) => {
        setShowModal(!showModal)
        const response = await getTypeInfo(id)
        setTypeDetail(response)
    }

    const closeModal = () => {
        setShowModal(false)
        setShowAbility(false)
    }

    const type = (type, index) => {
        const typeId = type.url.split('/')

        switch (type.name) {
            case 'grass':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.grass}>{type.name.toUpperCase()}</Badge>
                break;
            case 'normal':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.normal}>{type.name.toUpperCase()}</Badge>
                break;
            case 'poison':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.poison}>{type.name.toUpperCase()}</Badge>
                break;
            case 'psychic':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.psychic}>{type.name.toUpperCase()}</Badge>
                break;
            case 'ground':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.ground}>{type.name.toUpperCase()}</Badge>
                break;
            case 'ice':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.ice}>{type.name.toUpperCase()}</Badge>
                break;
            case 'fire':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.fire}>{type.name.toUpperCase()}</Badge>
                break;
            case 'rock':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.rock}>{type.name.toUpperCase()}</Badge>
                break;
            case 'dragon':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.dragon}>{type.name.toUpperCase()}</Badge>
                break;
            case 'water':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.water}>{type.name.toUpperCase()}</Badge>
                break;
            case 'bug':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.bug}>{type.name.toUpperCase()}</Badge>
                break;
            case 'dark':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.dark}>{type.name.toUpperCase()}</Badge>
                break;
            case 'fighting':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.fighting}>{type.name.toUpperCase()}</Badge>
                break;
            case 'ghost':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.ghost}>{type.name.toUpperCase()}</Badge>
                break;
            case 'steel':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.steel}>{type.name.toUpperCase()}</Badge>
                break;
            case 'flying':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.flying}>{type.name.toUpperCase()}</Badge>
                break;
            case 'electric':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.electric}>{type.name.toUpperCase()}</Badge>
                break;
            case 'fairy':
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.fairy}>{type.name.toUpperCase()}</Badge>
                break;

            default:
                return <Badge key={index} onPress={() => getTypeDetail(typeId[6])} style={styles.type}>{type.name.toUpperCase()}</Badge>
                break;
        }

    }

    const getAbilityDetail = async (id) => {
        setShowAbility(!showModal)
        const response = await getAbility(id)
        setAbility(response)
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
                        <View>
                            <Text style={styles.name}>{detail.name.toUpperCase()}</Text>
                            <View style={styles.types}>
                                {types && map(types, (item, index) => (
                                    type(item.type, index)
                                ))}
                            </View>
                            <View style={styles.types}>
                                <Text style={styles.data}>{i18n.t('height')}: {detail.height}</Text>
                                <Text style={styles.data}>{i18n.t('weight')}: {detail.weight}</Text>
                            </View>

                        </View>

                    </View>
                    <Divider />
                    <ScrollView style={styles.statsContainer}>
                        <Title>Abilities</Title>
                        <View style={{ flexDirection: 'row' }}>
                            {detail.abilities && map(detail.abilities, (item, index) => (

                                <TouchableOpacity key={index} onPress={() => getAbilityDetail(item.ability.name)}>
                                    <Badge style={[styles.type, { marginHorizontal: 8, fontSize: 12 }]}>{item.ability.name.toUpperCase()} </Badge>
                                </TouchableOpacity>

                            ))}
                        </View>
                        <Title style={{ paddingVertical: 8 }}>{i18n.t('stats')}</Title>
                        {map(detail.stats, (item, index) => (
                            <View key={index} style={styles.statsRow}>
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
                            <View key={index} style={styles.movesRow}>
                                <View style={styles.moveName}>
                                    <Text>{index + 1} {item.move.name.toUpperCase().replace('-', ' ')}</Text>
                                </View>


                            </View>
                        ))}

                    </ScrollView>
                    <Modal visible={showModal} onDismiss={closeModal}
                        animationType='slide'
                        presentationStyle='pageSheet'
                    >
                        {typeDetail && <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' }}>
                            <Title>{typeDetail.name.toUpperCase()}</Title>
                            <IconButton icon="close"
                                color={Colors.black}
                                size={20}
                                onPress={closeModal}
                            />
                        </View>}

                        <ScrollView style={{ padding: 20 }}>
                            <Subheading>Damage relations</Subheading>
                            {typeDetail?.damage_relation && <List.AccordionGroup>
                                {typeDetail?.damage_relations?.no_damage_to && <List.Accordion title="No damage to" id="1">
                                    {(map(typeDetail.damage_relations.no_damage_to, (data, index) => (
                                        <List.Item title={data.name} key={index} />
                                    )))}
                                    {typeDetail.damage_relations?.no_damage_to == 0 && <Text style={styles.noInfo}>No related information</Text>}
                                </List.Accordion>}
                                {typeDetail.damage_relations?.no_damage_from && <List.Accordion title="No damage from" id="2">
                                    {(map(typeDetail.damage_relations.no_damage_from, (data, index) => (
                                        <List.Item title={data.name} key={index} />
                                    )))}
                                    {typeDetail.damage_relations?.no_damage_from == 0 && <Text style={styles.noInfo}>No related information</Text>}
                                </List.Accordion>}

                                {typeDetail.damage_relations?.half_damage_to && <List.Accordion title="Half damage to" id="3">
                                    {(map(typeDetail.damage_relations.half_damage_to, (data, index) => (
                                        <List.Item title={data.name} key={index} />
                                    )))}
                                    {typeDetail.damage_relations?.half_damage_to == 0 && <Text style={styles.noInfo}>No related information</Text>}
                                </List.Accordion>}
                                {typeDetail.damage_relations?.half_damage_from && <List.Accordion title="Half damage from" id="4">
                                    {(map(typeDetail.damage_relations.half_damage_from, (data, index) => (
                                        <List.Item title={data.name} key={index} />
                                    )))}
                                    {typeDetail.damage_relations?.half_damage_from == 0 && <Text style={styles.noInfo}>No related information</Text>}
                                </List.Accordion>}
                                {typeDetail.damage_relations?.double_damage_to && <List.Accordion title="Double damage to" id="5">
                                    {(map(typeDetail.damage_relations.double_damage_to, (data, index) => (
                                        <List.Item title={data.name} key={index} />
                                    )))}
                                    {typeDetail.damage_relations?.double_damage_to == 0 && <Text style={styles.noInfo}>No related information</Text>}
                                </List.Accordion>}
                                {typeDetail.damage_relations?.double_damage_from && <List.Accordion title="Double damage from" id="6">
                                    {(map(typeDetail.damage_relations.double_damage_from, (data, index) => (
                                        <List.Item title={data.name} key={index} />
                                    )))}
                                    {typeDetail.damage_relations?.double_damage_from == 0 && <Text style={styles.noInfo}>No related information</Text>}
                                </List.Accordion>}



                            </List.AccordionGroup>}

                        </ScrollView>
                    </Modal>
                    <Modal visible={showAbility} onDismiss={closeModal}
                        animationType='slide'
                        presentationStyle='pageSheet'
                    >
                        {ability && <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' }}>
                            <Title>{ability.name.toUpperCase()}</Title>
                            <IconButton icon="close"
                                color={Colors.black}
                                size={20}
                                onPress={closeModal}
                            />
                        </View>}
                        <View style={{ padding: 20 }}>
                            <Subheading>Short Effect</Subheading>
                            <Paragraph>{ability?.effect_entries[0].short_effect}</Paragraph>
                            <Divider style={{ marginVertical: 8 }} />
                            <Subheading>Effect</Subheading>
                            <Paragraph>{ability?.effect_entries[0].effect}</Paragraph>
                        </View>

                        <ScrollView style={{ padding: 20 }}>

                            <List.AccordionGroup>

                                <List.Accordion title="Pokemon List" id="7">
                                    {ability && (map(ability.pokemon, (data, index) => (
                                        <List.Item title={data.pokemon.name} key={index} />
                                    )))}
                                </List.Accordion>






                            </List.AccordionGroup>

                        </ScrollView>
                    </Modal>

                </View>
            }

            {loading && <ActivityIndicator animating={true} color={Colors.red800} />}
            <SafeAreaView />
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
        backgroundColor: '#fff',
        flexDirection: 'row'
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

        marginHorizontal: 8
    },
    type: {
        backgroundColor: Colors.grey300,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    grass: {
        backgroundColor: Colors.green300,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    normal: {
        backgroundColor: Colors.blueGrey100,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    poison: {
        backgroundColor: Colors.purple400,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    psychic: {
        backgroundColor: Colors.pink400,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    ground: {
        backgroundColor: Colors.amber500,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    ice: {
        backgroundColor: Colors.cyanA200,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    fire: {
        backgroundColor: Colors.red400,
        color: Colors.white,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    rock: {
        backgroundColor: Colors.brown400,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    dragon: {
        backgroundColor: Colors.indigo400,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    water: {
        backgroundColor: Colors.blue400,
        color: Colors.white,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    bug: {
        backgroundColor: Colors.lime400,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    dark: {
        backgroundColor: Colors.grey900,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    fighting: {
        backgroundColor: Colors.brown800,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    ghost: {
        backgroundColor: Colors.indigo800,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    steel: {
        backgroundColor: Colors.grey400,
        color: Colors.white,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    flying: {
        backgroundColor: Colors.lightBlue400,
        color: Colors.white,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    electric: {
        backgroundColor: Colors.yellow400,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
    },
    fairy: {
        backgroundColor: Colors.pinkA100,
        color: Colors.white,
        marginHorizontal: 4,
        marginBottom: 4,
        paddingHorizontal: 4
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
        alignItems: 'center',
        marginHorizontal: 4
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
    noInfo: {
        paddingTop: 10,
        paddingHorizontal: 20

    }
})