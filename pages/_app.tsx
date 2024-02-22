import type { AppProps } from "next/app"
import Head from "next/head"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import "../styles/global.css"

import Layout from "../components/Layout"
import QueryProvider from "../providers/QueryProvider"

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
      <QueryProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </QueryProvider>
    </>
  )
}

export default MyApp
