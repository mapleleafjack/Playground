import Head from 'next/head'
import Image from 'next/image'
import MainComponent from '../components/MainComponent/MainComponent'

import "@blueprintjs/core/lib/css/blueprint.css";


import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jack's playground</title>
        <meta name="description" content="From the kitchen with love" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainComponent title="app" />

      <footer className={styles.footer}>
        Thank you for paying attention
      </footer>
    </div>
  )
}
