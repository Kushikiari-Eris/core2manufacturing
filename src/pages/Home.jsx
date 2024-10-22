import React from 'react'
import Navbar from '../components/Navbar'
import bg1 from '../assets/image/bg1.jpg'
import image1 from '../assets/image/image1.jpg'
import image2 from '../assets/image/image2.jpg'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Navbar />
      <div
        className="relative h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
              <img src={image1} className="max-w-sm rounded-lg shadow-2xl ml-3" />
            <div>
              <h1 className="text-5xl font-bold text-green-400">Welcome to Market!</h1>
              <p className="py-6 text-black">
              Hello we are JJM Soap and Detergent and we are super excited to welcome you to JJM Soap and Detergent. Think of me as your guide in this journey. I am here to make your experience amazing.
              </p>
              <p>
                To proceed ordering our product, just click Get Started or Login
              </p>
              <Link to="/login" className="btn btn-outline btn-accent">Get Started</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
