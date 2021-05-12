import { DragonList } from '../../src/components/DragonList'
import styles from '../../src/styles/pages/Home.module.css';
import Head from 'next/head'
import { NavBar } from '../../src/components/NavBar';

export default function Home() {

  return (
    <>
      <Head>
        <title>DRAGODEX</title>
      </Head>

      <NavBar />
      <div className={styles.container}>
        <DragonList />
      </div>
    </>
  )
}
