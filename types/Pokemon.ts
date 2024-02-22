export type RawPokemon = {
  name: string
  id: number
  details: { types: { type: { name: string } }[] }[]
}

export type CleanPokemon = {
  name: string
  id: number
  types: string[]
  image: string
  innerRef?: (node ?: Element | null | undefined) => void
}
