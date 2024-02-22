import Image from "next/image"
import Link from "next/link"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"

import Card from "../components/Card"
import Container from "../components/Container"
import Grid from "../components/Grid"
import ArrowRightIcon from "../icons/ArrowRight"
import ScrollIcon from "../icons/Scroll"
import { H1, P } from "../styles/Type"
import { CleanPokemon } from "../types/Pokemon"
import { useEffect, useState } from "react"
import { getPokemon } from "./api/pokemon"
import Loader from "../components/Loader"
import { useSelector } from "react-redux"
import { PARTY_LENGTH, selectPokemonsParties } from "../services/party"

export async function getStaticProps() {
  const { getPokemon } = await import("./api/pokemon")
  const { pokemon, totalPokemon } = await getPokemon()

  return {
    props: {
      pokemon,
      totalPokemon,
    },
  }
}

export default function Home({
  pokemon,
  totalPokemon,
}: {
  pokemon: CleanPokemon[]
  totalPokemon: number
}) {
  // TODO: Infinite scroll pagination
  const { ref, inView } = useInView()
  const pokemonsParties = useSelector(selectPokemonsParties)
  const [clientLoad, setClientLoad] = useState<boolean>(false)

  const {
    data: pokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam }) => {
      return getPokemon(pageParam)
    },
    initialData: () => ({
      //set data from getStaticProps as intialData
      pages: [{ pokemon: pokemon, nextPage: 2, totalPokemon: totalPokemon }],
      pageParams: [1],
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage
    },
  })

  useEffect(() => {
    setClientLoad(true)
  }, [])
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  const pokemonCount = pokemons.pages.reduce(
    (total, page) => total + page.pokemon.length,
    0
  )

  return (
    <Container>
      <Grid className="items-start">
        <div className="lg:sticky top-5 col-span-full lg:col-start-2 lg:col-span-2 flex flex-col lg:min-h-[calc(100vh-300px)]">
          <div className="flex-grow flex items-start mt-40 relative">
            <H1>
              Choose <br />
              your team
            </H1>
          </div>
          <div className="hidden lg:flex flex-col items-center text-center font-serif opacity-60">
            <P>Scroll for more</P>
            <ScrollIcon className="mt-2.5 block" />
          </div>
        </div>
        <div className="col-span-full lg:col-span-6">
          <Grid>
            {isSuccess &&
              pokemons?.pages?.map((page) => {
                return page?.pokemon?.map((mon, index) =>
                  index === page.pokemon.length - 1 ? (
                    <Card innerRef={ref} key={mon.id} {...mon} />
                  ) : (
                    <Card key={mon.id} {...mon} />
                  )
                )
              })}
          </Grid>
          <div className="fixed bottom-0 z-30 left-0 right-0 flex justify-center items-center gap-4 w-full">
            <div className="text-center my-5 text-[1.5rem] rounded-full bg-[#98CABC] px-5 text-white shadow-card flex items-center h-10 gap-2">
              {isFetchingNextPage ? (
                <div className="flex items-center justify-center">
                  <Loader size="20px" stroke="#FFF" />
                </div>
              ) : (
                <div>{pokemonCount}</div>
              )}
              <div>/</div>
              <div>{totalPokemon}</div>
            </div>
          </div>
        </div>
        <div className="col-span-full row-start-2 lg:row-start-1 lg:col-span-1 lg:col-start-11 lg:sticky top-5 grid grid-cols-6 lg:grid-cols-1 gap-7">
          {Array(PARTY_LENGTH)
            .fill("")
            .map(
              (_, i) =>
                clientLoad && (
                  <Image
                    key={i}
                    src={
                      pokemonsParties[i]
                        ? pokemonsParties[i].image
                        : "/img/placeholder-ball.png"
                    }
                    alt=""
                    width="83"
                    height="83"
                    className="opacity-40"
                    unoptimized
                  />
                )
            )}
          <div>
            <Link
              href="/party"
              passHref
              className="w-14 h-14 lg:w-20 lg:h-20 p-2.5 rounded-full bg-gulf hover:bg-surfie text-white mx-auto flex flex-col items-center justify-center font-serif text-[0.75rem] lg:text-[1.125rem] transition duration-300 fixed bottom-4 right-4 lg:static"
            >
              Party
              <ArrowRightIcon className="block w-full h-2.5" />
            </Link>
          </div>
        </div>
      </Grid>
    </Container>
  )
}
