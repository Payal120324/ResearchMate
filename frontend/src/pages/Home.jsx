import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";

import Footer from "../components/Footer";

export default function Home({ user, setUser }) {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Hero user={user} />
<Features />
      <Footer />
    </>
  );
}
