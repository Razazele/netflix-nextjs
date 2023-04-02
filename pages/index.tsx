
import Billboard from '@/components/Billboard';
import InfoModal from '@/components/InfoModal';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useMovieList from '@/hooks/useMovieList';
import { NextPageContext } from 'next'
import  {getSession} from 'next-auth/react'
import Head from 'next/head';

//Check if logged in
export async function getServerSideProps(context:NextPageContext) {
  const session = await getSession(context);

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent:false,
      }
    }
  }

  return {
    props:{}
  }
}

export default function Home() {

  const {data:movies = []} = useMovieList();
  const {data:favorites} = useFavorites();
  const {isOpen,closeModal} = useInfoModalStore();
  return (

    <>
      <Head>
        <title>Razmv - Reproductor de series y peliculas</title>
        <link rel="icon" href='/favicon.ico' />
        <meta name='description' content='Sitio para ver series y peliculas - Creado por Pablo Verdugo' />

      </Head>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar/>
      <Billboard/>
      <div className='pb-40'>
      <MovieList title='Tendencias' data={movies}/>
      <MovieList title='Mi lista' data={favorites}/>

      </div>
    </>
  )
}
