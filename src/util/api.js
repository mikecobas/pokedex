import { API_URL } from './constants'

export async function getPokemonsApi (offset = 0, limit = 50) {
    try {

        const url = `${API_URL}pokemon/?offset=${offset}&limit=${limit}`

        const response = await fetch(url)
        const result = await response.json()
        return result

    } catch (error) {
        console.log(error)
        return null
    }

}

export async function getPokemonDetail (id) {
    try {

        const url = `${API_URL}pokemon/${id}`

        const response = await fetch(url)
        const result = await response.json()
        return result

    } catch (error) {
        console.log(error)
        return null
    }
}
