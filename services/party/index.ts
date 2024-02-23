import { createSlice } from "@reduxjs/toolkit"
import { CleanPokemon } from "../../types/Pokemon"
import LocalStorage, { PATY_STORAGE } from "../../hooks/useStorage"
import { AppStore } from ".."

export const PARTY_LENGTH = 6

export type ExtendType = {
  nickName: string
  addedCount: number
  isAdded: boolean
}

export type ExtendedCleanPokemon = CleanPokemon & ExtendType

export type PartyStore = {
  pokemons: ExtendedCleanPokemon[]
}

const initialState: PartyStore = {
  pokemons: LocalStorage.get<ExtendedCleanPokemon[]>(PATY_STORAGE, []),
}

const partySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setNickName: (state, action) => {
      const { pokemons } = state
      const { id, nickName } = action.payload
      const updatedPokemons = pokemons.map((pokemon) => {
        if (pokemon.id === id) {
          pokemon.nickName = nickName
        }
        return pokemon
      })
      LocalStorage.set<ExtendedCleanPokemon[]>(PATY_STORAGE, updatedPokemons)
      state.pokemons = updatedPokemons
    },
    setPokemon: (state, action) => {
      const { pokemons } = state
      const { id, name, types, image } = action.payload

      const pokemonInParty = pokemons.some((pokemon) => pokemon.id === id)
      if (pokemonInParty) {
        const updatedParties = pokemons.map((pokemon) => {
          if (pokemon.id === id) {
            if (!pokemon.isAdded) {
              pokemon.addedCount++
            }
            pokemon.isAdded = !pokemon.isAdded
          }
          return pokemon
        })

        LocalStorage.set<ExtendedCleanPokemon[]>(PATY_STORAGE, updatedParties)
        state.pokemons = updatedParties
      } else {
        const totaladdedCount = state.pokemons.filter(
          (pokemon) => pokemon.isAdded
        ).length

        if (totaladdedCount < PARTY_LENGTH) {
          const newParty = [
            ...state.pokemons,
            {
              id,
              name,
              types,
              image,
              nickName: name,
              addedCount: 0,
              isAdded: true,
            },
          ]
          LocalStorage.set<ExtendedCleanPokemon[]>(PATY_STORAGE, newParty)
          state.pokemons = newParty
        }
      }
    },
  },
})

export const { setNickName, setPokemon } = partySlice.actions

export const selectPokemonsParties = (state: AppStore) =>
  state.party.pokemons.filter((pokemon) => pokemon.isAdded)

export default partySlice.reducer
