import SEOHead from '../components/SEOHead'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ServicesGrid from '../components/ServicesGrid'
import SolutionsHub from '../components/SolutionsHub'
import WhyChooseUs from '../components/WhyChooseUs'
import EquipmentSection from '../components/EquipmentSection'
import GallerySection from '../components/GallerySection'
import SupportSection from '../components/SupportSection'
import ContactSection from '../components/ContactSection'
import TeamSection from '../components/TeamSection'
import BlogPreviewSection from '../components/BlogPreviewSection'
import Footer from '../components/Footer'
import { HOME_PAGE } from '../seo/pages'

export default function Home() {
  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <SEOHead {...HOME_PAGE} />
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
        <Navbar />
      </header>
      <main>
        <HeroSection />
        <ServicesGrid />
        <SolutionsHub />
        <WhyChooseUs />
        <TeamSection />
        <EquipmentSection />
        <GallerySection />
        <SupportSection />
        <BlogPreviewSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
