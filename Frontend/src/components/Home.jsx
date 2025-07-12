import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const {user, loading} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(user?.role === "recruiter"){
      navigate("/admin/companies")
    }
  },[user, navigate]);
  
  // Don't render content while auth is loading
  if (loading) {
    return null; // or return a loading spinner if you prefer
  }
  
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
