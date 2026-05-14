import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import CookieConsent from './components/CookieConsent';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AIServices from './components/AIServices';
import About from './components/About';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import InnovationShowcase from './components/InnovationShowcase';
import MarketingAgencyPage from './pages/MarketingAgencyPage';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import FAQPage from './pages/FAQPage';
import PricingPage from './pages/PricingPage';
import ProductionPage from './pages/ProductionPage';
import WebDevelopmentPage from './pages/services/WebDevelopmentPage';
import GraphicDesigningPage from './pages/services/GraphicDesigningPage';
import SEOContentPage from './pages/services/SEOContentPage';
import AISolutionsPage from './pages/services/AISolutionsPage';
import PerformanceMarketingPage from './pages/services/PerformanceMarketingPage';
import InternshipPage from './pages/InternshipPage';
import AdminPage from './admin/AdminPage';
import FutureAIWebDevelopment2025 from './blogs/future-ai-web-development-2025';
import EcommerceSEOGuide from './blogs/ecommerce-seo-guide';
import ScalableSaaSApplications from './blogs/scalable-saas-applications';
import ImplementingAIChatbots from './blogs/implementing-ai-chatbots';
import MobileFirstDesign from './blogs/mobile-first-design';
import UIUXDesignTrends2025 from './blogs/ui-ux-design-trends-2025';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/internship-application" element={<InternshipPage />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleConsultationClick = () => {
    navigate('/contact');
  };

  const isProductionPage = location.pathname === '/production';

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {!isProductionPage && <Header openConsultation={handleConsultationClick} />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero openConsultation={handleConsultationClick} />
              <Services />
              <AIServices />
              <InnovationShowcase />
              <About />
              <Stats />
              <Portfolio />
              <Testimonials />
            </>
          }
        />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms-of-service" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/production" element={<ProductionPage />} />
        <Route path="/services/web-development" element={<WebDevelopmentPage />} />
        <Route path="/services/graphic-designing" element={<GraphicDesigningPage />} />
        <Route path="/services/seo-content" element={<SEOContentPage />} />
        <Route path="/services/ai-solutions" element={<AISolutionsPage />} />
        <Route path="/services/performance-marketing" element={<PerformanceMarketingPage />} />
        <Route path="/marketing-agency" element={<MarketingAgencyPage />} />
        <Route path="/blog/future-ai-web-development-2025" element={<FutureAIWebDevelopment2025 />} />
        <Route path="/blog/ecommerce-seo-guide" element={<EcommerceSEOGuide />} />
        <Route path="/blog/scalable-saas-applications" element={<ScalableSaaSApplications />} />
        <Route path="/blog/ui-ux-design-trends-2025" element={<UIUXDesignTrends2025 />} />
        <Route path="/blog/implementing-ai-chatbots" element={<ImplementingAIChatbots />} />
        <Route path="/blog/mobile-first-design" element={<MobileFirstDesign />} />
      </Routes>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default App;
