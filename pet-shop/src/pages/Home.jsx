import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import OurPolicy from '../components/OurPolicy'
import CategoriesChoose from '../components/CategoriesChoose'

const Home = () => {
  return (
    <div>
      <Hero/>
      <CategoriesChoose/>
      <LatestCollection/>
      <OurPolicy/>
    </div>
  )
}

export default Home
