import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import partyReducer, { PartyStore } from "./party"

export type AppStore = {
  party: PartyStore
}

const store = configureStore({
  reducer: {
    party: partyReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
