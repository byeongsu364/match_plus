import React from 'react'
import Header from '../components/home/Header'
import Footer from '../components/home/Footer'
import Hero from '../components/home/Hero'
import MatchList from '../components/home/MatchList'
import Review from '../components/home/Review'
import Service from '../components/home/Service'
import Stats from '../components/home/Stats'
import Filter from '../components/home/Filter'
const Home = () => {
    return (
        <div>
            <Hero/>
            <Stats/>
            <Service/>
            <Filter/>
            <MatchList/>
            <Review/>
            <Footer/>
        </div>
    )
}

export default Home