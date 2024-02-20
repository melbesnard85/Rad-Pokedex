import clsx from "clsx"
import Image from "next/image"

import { H2 } from "../styles/Type"
import { CleanPokemon } from "../types/Pokemon"

// TODO: Card Styling
export default function Card({ id, name, types, image }: CleanPokemon) {
  return (
    <article className="col-span-6 lg:col-span-4 relative">
      {/* TODO: Handle adding to party */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full block z-10 cursor-pointer rounded-lg"
      >
        <span className="sr-only">Add {name} to Party</span>
      </button>
      <div className="bg-white rounded-xl text-center">
        <Image
          src={image}
          alt={name}
          className="pixel-art"
          width="150"
          height="150"
          unoptimized
        />
        {name !== undefined && (
          <>
            <div>
              <div className="inline-block" title={`Pokemon ID Number: ${id}`}>
                #{id}
              </div>
            </div>
            <div>
              <H2>{name}</H2>
            </div>
            <div>
              <ul>
                {types.map((type) => (
                  <li
                    className={clsx(
                      `bg-${type.toLowerCase()}`,
                      "text-white",
                      "inline-block"
                    )}
                    key={type}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </article>
  )
}
