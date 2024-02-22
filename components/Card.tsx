import clsx from "clsx"
import Image from "next/image"

import { H2 } from "../styles/Type"
import { CleanPokemon } from "../types/Pokemon"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectPokemonsParties, setPokemon } from "../services/party"

// TODO: Card Styling
export default function Card({
  id,
  name,
  types,
  image,
  innerRef,
}: CleanPokemon) {
  const dispatch = useDispatch()
  const pokemonsParties = useSelector(selectPokemonsParties)

  const [isExisting, setIsExisting] = useState<boolean>(false)

  useLayoutEffect(() => {
    setIsExisting(!!pokemonsParties.find((item) => item.id === id))
  }, [pokemonsParties, id])

  return (
    <article ref={innerRef} className="col-span-6 lg:col-span-4 relative">
      {/* TODO: Handle adding to party */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full block z-20 cursor-pointer rounded-lg"
        onClick={() => dispatch(setPokemon({ id, name, types, image }))}
      >
        <span className="sr-only">Add {name} to Party</span>
      </button>
      <Image
        src={image}
        alt={name}
        className="pixel-art z-10 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-[10px]"
        width="150"
        height="150"
        unoptimized
        onClick={() => dispatch(setPokemon({ id, name, types, image }))}
      />
      <div
        className={clsx(
          "relative rounded-xl text-center flex flex-col item-center justify-end h-[200px] shadow-card overflow-hidden p-2",
          isExisting
            ? "border-4 border-[#107B6A]/40 bg-[#F3FFF4]"
            : "border-2 border-white bg-[#F9F9F9]"
        )}
      >
        <div className="absolute rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00000008] text-[#333333] w-[94px] h-[94px]"></div>
        {name !== undefined && (
          <div className="flex flex-col items-center gap-2">
            <div
              className="inline-block rounded-full py-1 px-4 bg-[#3333331a] text-[#00000099]"
              title={`Pokemon ID Number: ${id}`}
            >
              #{id.toString().padStart(3, "0")}
            </div>
            <div>
              <H2>{name}</H2>
            </div>
            <div>
              <ul className="flex gap-2">
                {types.map((type) => (
                  <li
                    className={clsx(
                      `bg-${type.toLowerCase()}`,
                      "text-white rounded py-1 px-4 text-xs capitalize",
                      "inline-block"
                    )}
                    key={type}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-xs text-[#00000099] font-thin">Added to 3 parties</div>
          </div>
        )}
      </div>
    </article>
  )
}
