import createStyle from "@josephmark/createstyle"

export const H1 = createStyle(
  "h1",
  "font-serif text-[2.25rem] leading-[1]" // 36px
)

export const H2 = createStyle(
  "h2",
  "font-serif text-[1.5rem] lg:text-[2rem] leading-[1.15] font-regular" // 32px / 24px
)

export const H3 = createStyle(
  "h3",
  "text-[1.5rem] lg:text-[1.5rem]" // 24px / 20px
)

export const P = createStyle(
  "p",
  "text-[0.625rem] lg:text-[0.75rem] leading-[1.6]" // 12px / 10px
)
