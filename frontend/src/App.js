import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./services/supabaseClient";
import { ThemeProvider } from "./contexts/ThemeContext";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import Workspace from "./components/Workspace";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        if (event === "SIGNED_IN") {
          navigate("/");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, );

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data?.user || null);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-deepnavy">
        <h1 className="text-xl font-semibold text-babyblue">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deepnavy">
      <ThemeProvider>
        <Routes>
          <Route path="/" element={user ? <Dashboard user={user} setUser={setUser} /> : <Home user={user} setUser={setUser} /> } />
          <Route path="/login" element={<Auth setUser={setUser} isLogin={true} />} />
          <Route path="/signup" element={<Auth setUser={setUser} isLogin={false} />} />
          <Route path="/auth" element={<Auth setUser={setUser} />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="/upload" element={<Workspace user={user} setUser={setUser} />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;

