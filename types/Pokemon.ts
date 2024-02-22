import { CARDTYPE } from "../components/Card"

export type RawPokemon = {
  name: string
  id: number
  details: { types: { type: { name: string } }[] }[]
}

export type CleanPokemon = {
  id: number
  type?: CARDTYPE
  name: string
  types: string[]
  image: string
  innerRef?: (node?: Element | null | undefined) => void
}
