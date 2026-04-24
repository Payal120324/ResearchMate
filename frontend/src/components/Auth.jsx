import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

function Auth({ setUser, isLogin: isLoginProp = true }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(isLoginProp);

  const navigate = useNavigate();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
      alert("Signup successful ✅ Please check your email to verify your account.");
      setIsLogin(true);
    }
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    else {
      setUser(data.user);
      navigate("/");
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          prompt: "select_account",
        },
      },
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-deepnavy via-deepnavy-light to-sapphire/20 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cornflower/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-sapphire/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* CARD */}
      <div className="relative bg-deepnavy-light border border-babyblue/20 p-10 rounded-3xl shadow-2xl shadow-black/20 w-[400px] transition-all duration-300">

        {/* TITLE */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-sapphire to-cornflower flex items-center justify-center text-2xl shadow-lg shadow-sapphire/20">
            {isLogin ? "👋" : "🚀"}
          </div>
          <h2 className="text-2xl font-bold text-babyblue">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-periwinkle/60 mt-1">
            {isLogin ? "Sign in to continue your research" : "Start your research journey"}
          </p>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-babyblue/70 mb-1.5 uppercase tracking-wider">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3.5 rounded-xl bg-deepnavy/40 border border-babyblue/20 text-babyblue placeholder-babyblue/40 focus:outline-none focus:ring-2 focus:ring-sapphire/30 focus:border-sapphire transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-babyblue/70 mb-1.5 uppercase tracking-wider">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-3.5 rounded-xl bg-deepnavy/40 border border-babyblue/20 text-babyblue placeholder-babyblue/40 focus:outline-none focus:ring-2 focus:ring-sapphire/30 focus:border-sapphire transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* MAIN BUTTON */}
        <button
          onClick={isLogin ? handleLogin : handleSignup}
          className="w-full bg-gradient-to-r from-sapphire to-cornflower text-white py-3.5 rounded-xl hover:from-sapphire-dark hover:to-cornflower-dark transition-all duration-300 shadow-lg shadow-sapphire/20 hover:shadow-xl hover:shadow-sapphire/30 font-semibold"
        >
          {isLogin ? "Log In" : "Create Account"}
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-babyblue/20"></div>
          <span className="text-xs text-periwinkle/50 font-medium">or continue with</span>
          <div className="flex-1 h-px bg-babyblue/20"></div>
        </div>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-deepnavy/30 py-3.5 rounded-xl border border-babyblue/20 text-babyblue hover:bg-deepnavy/50 transition-all duration-300 font-medium"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>

        {/* TOGGLE */}
        <p className="text-center mt-6 text-sm text-periwinkle/60">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-babyblue ml-2 cursor-pointer font-semibold hover:text-white transition-colors"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Auth;

