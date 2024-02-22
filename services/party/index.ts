import { createSlice } from "@reduxjs/toolkit"
import { CleanPokemon } from "../../types/Pokemon"
import LocalStorage, { PATY_STORAGE } from "../../hooks/useStorage"
import { AppStore } from ".."

export const PARTY_LENGTH = 6

export type PartyStore = {
  pokemons: CleanPokemon[]
}

const initialState: PartyStore = {
  pokemons: LocalStorage.get<CleanPokemon[]>(PATY_STORAGE, []),
}

const partySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      const { pokemons } = state
      const { id, name, types, image } = action.payload

      const pokemonInParty = pokemons.some((pokemon) => pokemon.id === id)
      if (pokemonInParty) {
        // Pokemon is already in party, so remove it
        const updatedParties = pokemons.filter((pokemon) => pokemon.id !== id)
        LocalStorage.set<CleanPokemon[]>(PATY_STORAGE, updatedParties)
        state.pokemons = updatedParties
      } else {
        // Pokemon is not in party, so add it
        if (state.pokemons.length < PARTY_LENGTH) {
          const newParty = [...state.pokemons, { id, name, types, image }]
          LocalStorage.set<CleanPokemon[]>(PATY_STORAGE, newParty)
          state.pokemons = newParty
        }
      }
    },
  },
})

export const { setPokemon } = partySlice.actions

export const selectPokemonsParties = (state: AppStore) => state.party.pokemons

export default partySlice.reducer
