import clsx from "clsx"
import Image from "next/image"

import { H2 } from "../styles/Type"
import { CleanPokemon } from "../types/Pokemon"
import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  ExtendedCleanPokemon,
  selectPokemonsParties,
  setNickName,
  setPokemon,
} from "../services/party"
import CloseIcon from "../icons/Close"
import CheckIcon from "../icons/Check"
import EditIcon from "../icons/Edit"

export enum CARDTYPE {
  LIST = "list",
  PARTY = "party",
  EMPTY = "empty",
}

// TODO: Card Styling
export default function Card({
  id,
  type = CARDTYPE.LIST,
  name,
  types,
  image,
  innerRef,
}: CleanPokemon) {
  const dispatch = useDispatch()
  const pokemonsParties = useSelector(selectPokemonsParties)

  const [storedItem, setStoredItem] = useState<ExtendedCleanPokemon>()

  useLayoutEffect(() => {
    setStoredItem(pokemonsParties.find((item) => item.id === id))
  }, [pokemonsParties, id])

  return (
    <article ref={innerRef} className="col-span-6 lg:col-span-4 relative">
      {/* TODO: Handle adding to party */}

      <button
        type="button"
        className="absolute inset-0 w-full h-full block z-20 cursor-pointer rounded-lg"
        onClick={() =>
          type == CARDTYPE.LIST &&
          dispatch(setPokemon({ id, name, types, image }))
        }
      >
        <span className="sr-only">Add {name} to Party</span>
      </button>

      {/* close button on party type */}
      <button
        className={clsx(
          "z-30 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#F8F8F8] border border-white p-2 active:scale-95 hover:scale-105",
          type === CARDTYPE.PARTY ? "block" : "hidden"
        )}
        onClick={() => dispatch(setPokemon({ id, name, types, image }))}
      >
        <CloseIcon />
      </button>

      <Image
        src={type === CARDTYPE.EMPTY ? "/img/placeholder-ball.png" : image}
        alt={name}
        className={clsx(
          "pixel-art z-10 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
          type !== CARDTYPE.EMPTY && "-mt-[10px]"
        )}
        width="150"
        height="150"
        unoptimized
        onClick={() =>
          type === CARDTYPE.LIST &&
          dispatch(setPokemon({ id, name, types, image }))
        }
      />

      {type === CARDTYPE.EMPTY ? (
        <div className="rounded-xl flex items-center justify-center h-[200px] shadow-card overflow-hidden p-2 border-2 border-white bg-[#F9F9F9]">
          <button
            className="z-30 w-[75px] h-[75px] rounded-full bg-[#F8F8F8] border flex items-center justify-center border-white p-2 active:scale-95 hover:scale-110 shadow-card transition-all"
            onClick={() => dispatch(setPokemon({ id, name, types, image }))}
          >
            <CloseIcon className="w-4 h-4 rotate-45" />
          </button>
        </div>
      ) : (
        <div
          className={clsx(
            "relative rounded-xl text-center flex flex-col item-center justify-end h-[200px] shadow-card overflow-hidden p-2",
            storedItem && storedItem.isExist
              ? "border-4 border-[#107B6A]/40 bg-[#F3FFF4]"
              : "border-2 border-white bg-[#F9F9F9]",
            type === CARDTYPE.PARTY && "bg-[#F9F9F9]"
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
              {type === CARDTYPE.PARTY && storedItem ? (
                <EditName {...storedItem} />
              ) : (
                <H2>{name}</H2>
              )}
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
              <div className="text-xs text-[#00000099] font-thin">
                {`Added to ${storedItem?.addedCount || 0} parties`}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

const EditName = ({ id, nickName }: ExtendedCleanPokemon): JSX.Element => {
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [input, setInput] = useState<string>(nickName)

  const handleCheck = useCallback(() => {
    dispatch(setNickName({ id, nickName: input }))
    setIsEdit(false)
  }, [id, nickName, input, dispatch])

  useEffect(() => {
    setInput(nickName)
  }, [id, nickName])

  return (
    <>
      {isEdit ? (
        <div className="z-30 relative px-1 flex items-center justify-center gap-1 w-full">
          <div className="underline underline-offset-8 decoration-dashed w-full">
            <input
              type="text"
              className="min-w-0 max-w-[140px] px-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setIsEdit(false)}>
              <CloseIcon />
            </button>
            <button onClick={handleCheck}>
              <CheckIcon />
            </button>
          </div>
        </div>
      ) : (
        <div className="z-30 relative px-1 flex items-center justify-center">
          <div className="">{input}</div>
          <button className="absolute -right-3" onClick={() => setIsEdit(true)}>
            <EditIcon />
          </button>
        </div>
      )}
    </>
  )
}
