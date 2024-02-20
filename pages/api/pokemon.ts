import { NextApiRequest, NextApiResponse } from "next"

import { CleanPokemon, RawPokemon } from "../../types/Pokemon"

const CACHE_AGE = 2592000 // 30 Days
const PAGE_SIZE = 12
const SPRITE_ENDPOINT =
  "https://github.com/PokeAPI/sprites/raw/master/sprites/pokemon/"

const titleCase = (term: string) => {
  const words = term
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
  return words.join(" ")
}

// Clean up the GQL data into something a bit more friendly
const stripPokemonData = (mon: RawPokemon) => {
  return {
    id: mon.id,
    // There doesn't seem to be a way to grab the correct name, so I'm just manually updating the ones that come out wrong
    name: titleCase(mon.name)
      .replace("Nidoran-m", "Nidoran♂")
      .replace("Nidoran-f", "Nidoran♀")
      .replace("Mr-mime", "Mr. Mime"),
    types: mon.details[0].types.map(({ type }) => type.name),
    image: `${SPRITE_ENDPOINT}${mon.id}.png`,
  } as CleanPokemon
}

export async function getPokemon(page = 1, pageSize = PAGE_SIZE) {
  const resp = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
    method: "POST",
    body: JSON.stringify({
      query: `{
        generation: pokemon_v2_generation(where: {name: {_eq: "generation-i"}}) {
          pokemon: pokemon_v2_pokemonspecies(
            order_by: {id: asc}, 
            limit: ${pageSize}, 
            offset: ${pageSize * (page - 1)}
          ) {
            name
            id
            details: pokemon_v2_pokemons {
              types: pokemon_v2_pokemontypes {
                type: pokemon_v2_type {
                  name
                }
              }
            }
          }
        }
        generationAggregate: pokemon_v2_generation_aggregate(where: {name: {_eq: "generation-i"}}) {
          nodes {
            pokemonAggregate: pokemon_v2_pokemonspecies_aggregate {
              aggregate {
                count
              }
            }
          }
        }
      }`,
    }),
  })
  const { data } = await resp.json()
  const [generation] = data.generation
  return {
    pokemon: generation.pokemon.map(stripPokemonData),
    totalPokemon:
      data.generationAggregate.nodes[0].pokemonAggregate.aggregate.count,
  } as { pokemon: CleanPokemon[]; totalPokemon: number }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TODO: error handling
  const params = req.query

  const page = parseInt(params.page as string, 10) || 1
  const pageSize = parseInt(params.page_size as string, 10) || PAGE_SIZE

  const { pokemon, totalPokemon } = await getPokemon(page, pageSize)

  res.setHeader("X-Max-Pokemon", totalPokemon)
  res.setHeader("X-Max-Pages", Math.ceil(totalPokemon / pageSize))

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")

  res.setHeader(
    "Cache-Control",
    `public, max-age=${CACHE_AGE}, s-max-age=${CACHE_AGE}, stale-while-revalidate`
  )

  res.end(JSON.stringify(pokemon))
}
