import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
import clsx from "clsx"

import Container from "./Container"

const navItems = [
  {
    label: "Pokedex",
    link: "/",
  },
  {
    label: "Party",
    link: "/party",
  },
]

export const Header = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  return (
    <header className="h-20 mb-10 lg:mb-24 bg-mine text-white text-opacity-60">
      <Container className="h-full">
        <div className="flex h-full items-center">
          <div className="flex-grow mt-3">
            <Link href="/" passHref>
              <Image
                priority
                src="/img/josephmark-pokemon.png"
                alt="Josephmark"
                width="114"
                height="32"
              />
            </Link>
          </div>
          <div>
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-controls="main-nav"
                aria-haspopup="true"
                aria-expanded={open ? "true" : "false"}
                className="mobile-menu-opener text-white text-opacity-100"
              >
                <span className="sr-only">Open Mobile Menu</span>
              </button>
            </div>
            <div
              className={clsx(
                !open && "hidden lg:flex",
                open && "flex animate-fade-in lg:animate-none",
                "fixed inset-0 py-14 px-5 z-10",
                "lg:static lg:p-0",
                "text-center text-[1.5rem] lg:text-[0.75rem]",
                "flex-col justify-between items-center",
                "bg-mine bg-pikachu lg:bg-none"
              )}
              id="main-nav"
            >
              <nav className="flex flex-wrap items-center w-full md:w-auto">
                <ul className="flex flex-wrap w-full md:w-auto animate-rise animate-delay-150 lg:animate-none">
                  {navItems.map(({ link, label }) => (
                    <li
                      key={link}
                      className="lg:mx-4 w-full md:w-auto flex-shrink-0"
                    >
                      <Link
                        href={link}
                        passHref
                        className={clsx(
                          router.pathname === link &&
                            "text-white text-opacity-100",
                          "tracking-[0.04em]",
                          "py-4 block",
                          "uppercase"
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="flex-shrink-0 lg:ml-4 order-first lg:order-last w-full md:w-auto">
                  <div className="lg:w-14 lg:h-14 w-24 h-24 rounded-full bg-white overflow-hidden mx-auto mb-10 lg:mb-0">
                    <Image
                      src="/img/placeholder-user.png"
                      alt="Ash Ketchum"
                      width="100"
                      height="100"
                    />
                  </div>
                </div>
              </nav>
              <div className="md:hidden">
                <Link href="/" passHref>
                  <Image
                    src="/img/josephmark-pokemon.png"
                    alt="Josephmark"
                    width="114"
                    height="32"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
