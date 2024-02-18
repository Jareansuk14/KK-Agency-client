import Navbar from "../components/Navbar"
import Slide from "../components/Slide"
// import Categories from "../components/Categories"
import Listings from "../components/Listings"
import Footer from "../components/Footer"
import Categorylist from "../components/Categorylist"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Slide />
      <Categorylist />
      <Listings />
      <Footer />
    </>
  )
}

export default HomePage