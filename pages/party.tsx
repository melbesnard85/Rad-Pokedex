import Link from "next/link"

import Container from "../components/Container"
import Grid from "../components/Grid"
import ArrowRightIcon from "../icons/ArrowRight"
import { H1, H3 } from "../styles/Type"
import { useSelector } from "react-redux"
import { PARTY_LENGTH, selectPokemonsParties } from "../services/party"
import { useEffect, useState } from "react"
import Card, { CARDTYPE } from "../components/Card"

export default function PartyPage() {
  const pokemonsParties = useSelector(selectPokemonsParties)
  const [pokemonCount, setPokemonCount] = useState<number>(0)

  useEffect(() => {
    setPokemonCount(pokemonsParties.length)
  }, [pokemonsParties])

  return (
    <Container className="relative">
      <Grid>
        <div className="col-span-full lg:col-start-2 lg:col-span-2 flex flex-col lg:min-h-[calc(100vh-300px)]">
          <div className="flex-grow flex items-center relative">
            <H1>
              Ash's <br />
              party
            </H1>
          </div>
        </div>
        <div className="col-span-full lg:col-span-6">
          <Grid>
            {Array(PARTY_LENGTH)
              .fill("")
              .map(
                (_, i) =>
                  pokemonCount > 0 && (
                    <Card
                      key={i}
                      type={
                        pokemonsParties[i]?.isExist ? CARDTYPE.PARTY : CARDTYPE.EMPTY
                      }
                      {...pokemonsParties[i]}
                    />
                  )
              )}
          </Grid>
          {pokemonCount === 0 && (
            <div className="flex items-center justify-center h-full">
              No pokemons
            </div>
          )}
        </div>
        <div className="col-start-11 text-center">
          <H3 as="p">{`${pokemonCount}/${PARTY_LENGTH}`}</H3>
          <Link
            href="/"
            passHref
            className="w-14 h-14 lg:w-20 lg:h-20 p-2.5 rounded-full bg-gulf hover:bg-surfie text-white mx-auto flex flex-col items-center justify-center font-serif text-[0.75rem] lg:text-[1.125rem] transition duration-300 fixed bottom-4 right-4 lg:static"
          >
            Dex
            <ArrowRightIcon className="block w-full h-2.5" />
          </Link>
        </div>
      </Grid>
    </Container>
  )
}
