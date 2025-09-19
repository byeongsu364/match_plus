import React from 'react'
import Header from '../components/home/Header'
import Hero from '../components/home/Hero'
import MatchList from "../components/home/MatchList"
import Review from "../components/home/Review"
import Service from "../components/home/Service"
import Stats from "../components/home/Stats"
import Footer from "../components/home/Footer"
const Home = () => {
    return (
        <div>
            <Header/>
            <Hero/>
            <MatchList/>
            <Review/>
            <Service/>
            <Stats/>
            <Footer/>
        </div>
    )
}

export default Home