
import React from 'react';
import { render, act, waitFor } from '@testing-library/react-native'
import renderer from 'react-test-renderer';

let component;
import Home from '../src/screens/Home';

describe('<Home />', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve([
                {
                    "count": 1118,
                    "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
                    "previous": null,
                    "results": [
                        {
                            "name": "bulbasaur",
                            "url": "https://pokeapi.co/api/v2/pokemon/1/"
                        },
                        {
                            "name": "ivysaur",
                            "url": "https://pokeapi.co/api/v2/pokemon/2/"
                        },
                        {
                            "name": "venusaur",
                            "url": "https://pokeapi.co/api/v2/pokemon/3/"
                        },
                        {
                            "name": "charmander",
                            "url": "https://pokeapi.co/api/v2/pokemon/4/"
                        },
                        {
                            "name": "charmeleon",
                            "url": "https://pokeapi.co/api/v2/pokemon/5/"
                        },
                        {
                            "name": "charizard",
                            "url": "https://pokeapi.co/api/v2/pokemon/6/"
                        },
                        {
                            "name": "squirtle",
                            "url": "https://pokeapi.co/api/v2/pokemon/7/"
                        },
                        {
                            "name": "wartortle",
                            "url": "https://pokeapi.co/api/v2/pokemon/8/"
                        },
                        {
                            "name": "blastoise",
                            "url": "https://pokeapi.co/api/v2/pokemon/9/"
                        },
                        {
                            "name": "caterpie",
                            "url": "https://pokeapi.co/api/v2/pokemon/10/"
                        },
                        {
                            "name": "metapod",
                            "url": "https://pokeapi.co/api/v2/pokemon/11/"
                        },
                        {
                            "name": "butterfree",
                            "url": "https://pokeapi.co/api/v2/pokemon/12/"
                        },
                        {
                            "name": "weedle",
                            "url": "https://pokeapi.co/api/v2/pokemon/13/"
                        },
                        {
                            "name": "kakuna",
                            "url": "https://pokeapi.co/api/v2/pokemon/14/"
                        },
                        {
                            "name": "beedrill",
                            "url": "https://pokeapi.co/api/v2/pokemon/15/"
                        },
                        {
                            "name": "pidgey",
                            "url": "https://pokeapi.co/api/v2/pokemon/16/"
                        },
                        {
                            "name": "pidgeotto",
                            "url": "https://pokeapi.co/api/v2/pokemon/17/"
                        },
                        {
                            "name": "pidgeot",
                            "url": "https://pokeapi.co/api/v2/pokemon/18/"
                        },
                        {
                            "name": "rattata",
                            "url": "https://pokeapi.co/api/v2/pokemon/19/"
                        },
                        {
                            "name": "raticate",
                            "url": "https://pokeapi.co/api/v2/pokemon/20/"
                        }
                    ]
                }
            ]),
        }));
        component = render(<Home />)
    })

    it("Renderiza correctamente", async () => {
        expect(component).toBeDefined();
        expect(component.getByTestId('search')).toBeDefined();
        expect(component.queryAllByTestId('pokemons-container').length).toEqual(0);
        expect(await component.queryAllByTestId('pokemons-container')).toBeDefined();
        expect(await component.queryAllByTestId('pokemonGrid')).toBeDefined();

    })


});