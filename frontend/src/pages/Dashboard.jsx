import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Mission from "../components/Mission";
import Features from "../components/Features";
import Workspace from "../components/Workspace";
import Footer from "../components/Footer";

export default function Dashboard({ user, setUser }) {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Hero user={user} />
      <Mission />
      <Features />
      <Workspace />
      <Footer />
    </>
  );
}

