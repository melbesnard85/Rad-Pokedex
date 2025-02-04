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
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setPokemonCount(pokemonsParties.filter((item) => item.isExist).length)
  }, [pokemonsParties])

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Container className="relative">
      <Grid>
        <div className="lg:sticky top-5 col-span-full lg:col-start-2 lg:col-span-2 flex flex-col lg:min-h-[calc(100vh-300px)]">
          <div className="flex-grow flex justify-between items-center lg:items-start lg:mt-20 relative">
            <H1>
              Ash's <br className="hidden lg:block" />
              party
            </H1>
            <H3
              as="p"
              className="lg:hidden"
            >{`${pokemonCount}/${PARTY_LENGTH}`}</H3>
          </div>
        </div>
        <div className="col-span-full lg:col-span-6">
          <Grid>
            {Array(PARTY_LENGTH)
              .fill("")
              .map(
                (_, i) =>
                  isClient && (
                    <Card
                      key={i}
                      type={
                        pokemonsParties[i]?.isExist
                          ? CARDTYPE.PARTY
                          : CARDTYPE.EMPTY
                      }
                      {...pokemonsParties[i]}
                    />
                  )
              )}
          </Grid>
        </div>
        <div className="col-start-11 text-center flex flex-col items-center justify-between">
          <H3
            as="p"
            className="hidden lg:block lg:mt-20"
          >{`${pokemonCount}/${PARTY_LENGTH}`}</H3>
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
