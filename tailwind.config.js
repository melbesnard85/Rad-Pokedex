/* eslint-disable global-require */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-fire",
    "bg-fighting",
    "bg-water",
    "bg-flying",
    "bg-grass",
    "bg-poison",
    "bg-electric",
    "bg-ground",
    "bg-psychic",
    "bg-rock",
    "bg-ice",
    "bg-bug",
    "bg-dragon",
    "bg-ghost",
    "bg-dark",
    "bg-steel",
    "bg-fairy",
  ],
  theme: {
    fontFamily: {
      sans: ["work-sans", "sans-serif"],
      serif: ["moret", "serif"],
    },
    extend: {
      colors: {
        black: "#000",
        mine: "#333",
        wild: "#f4f4f4",
        sand: "#f9f9f9",
        white: "#fff",
        error: "#EE1F3B",
        disabled: "#BDBDBD",
        surfie: "#107b6a",
        gulf: "#76b0a7",
        normal: "#a8a878",
        fire: "#f08030",
        fighting: "#c03028",
        water: "#6890f0",
        flying: "#a890f0",
        grass: "#78c850",
        poison: "#a040a0",
        electric: "#f8d030",
        ground: "#e0c068",
        psychic: "#f85888",
        rock: "#b8a038",
        ice: "#98d8d8",
        bug: "#a8b820",
        dragon: "#7038f8",
        ghost: "#705898",
        dark: "#705848",
        steel: "#b8b8d0",
        fairy: "#ee99ac",
      },
      shadow: {
        md: "10px 10px 20px rgba(0,0,0,0.05), -10px -10px 4px rgba(255,255,255,0.2)",
        lg: "10px 15px 22px rgba(0,0,0,0.12). =8px -8px 4px rgba(255,255,255,0.3)",
      },
      boxShadow: {
        card: "10px 10px 20px 0px #0000000D",
      },
      transitionDelay: {
        0: "0ms",
      },
      transitionProperty: {
        opacity: "opacity, visibility",
      },
    },
  },
  variants: {
    extend: {},
  },
}
