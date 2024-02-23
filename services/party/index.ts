import { createSlice } from "@reduxjs/toolkit"
import { CleanPokemon } from "../../types/Pokemon"
import LocalStorage, { PATY_STORAGE } from "../../hooks/useStorage"
import { AppStore } from ".."
import { CARDTYPE } from "../../components/Card"

export const PARTY_LENGTH = 6

export type ExtendType = {
  nickName: string
  addedCount: number
  isExist: boolean
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
      if (pokemonInParty) { // existing on parties
        const updatedParties = pokemons
          .map((pokemon) => {
            if (pokemon.id === id) {
              if (!pokemon.isExist) { // if status is false, increase the added times
                pokemon.addedCount++
              }
              pokemon.isExist = !pokemon.isExist
            }
            return pokemon
          })
          .sort((a, b) => (a.isExist === b.isExist ? 0 : a.isExist ? -1 : 1)) // true -> false, realign array to list

        LocalStorage.set<ExtendedCleanPokemon[]>(PATY_STORAGE, updatedParties)
        state.pokemons = updatedParties
      } else {
        const totaladdedCount = state.pokemons.filter(
          (pokemon) => pokemon.isExist
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
              addedCount: 1,
              isExist: true,
            },
          ].sort((a, b) => (a.isExist === b.isExist ? 0 : a.isExist ? -1 : 1))

          LocalStorage.set<ExtendedCleanPokemon[]>(PATY_STORAGE, newParty)
          state.pokemons = newParty
        }
      }
    },
  },
})

export const { setNickName, setPokemon } = partySlice.actions

export const selectPokemonsParties = (state: AppStore) => state.party.pokemons

export default partySlice.reducer
