import type { AppProps } from "next/app"
import Head from "next/head"
import { Provider as StoreProvider } from "react-redux"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import "../styles/font.css"
import "../styles/global.css"

import Layout from "../components/Layout"
import QueryProvider from "../providers/QueryProvider"
import store from "../services"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pokemon Team Builder</title>
        <meta
          name="description"
          content="Browse and select your party of Generation 1 Pokemon"
        />

        <link rel="prefetch" href="/img/pokeball-loader.gif" />
      </Head>

      <StoreProvider store={store}>
        <QueryProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools />
        </QueryProvider>
      </StoreProvider>
    </>
  )
}

export default MyApp
