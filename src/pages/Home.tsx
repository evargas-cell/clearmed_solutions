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

export default function Home() {
  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <SEOHead
        title="ClearMed Imaging Solutions | CT & MRI Service, Installation & Maintenance"
        description="OEM-certified service, installation, and preventive maintenance for Siemens and GE CT and MRI imaging systems across the Southeast."
        path="/"
      />
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
        <Navbar />
      </div>
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
