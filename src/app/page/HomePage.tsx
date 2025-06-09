import ChatSupport from "../components/chatbox-AI";
import Footer from "../components/footer";
import Header from "../components/header";
import HeroSection from "../components/hero-section";
import TabsSection from "../components/tabs-section";


export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <HeroSection />
      <TabsSection />
      <ChatSupport />
      <Footer />
    </div>
  );
}
