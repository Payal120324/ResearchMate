import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Profile({ user, setUser }) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    gender: "",
    city: "",
    state: "",
    email: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.user_metadata?.name || "",
        phone: user.user_metadata?.phone || "",
        gender: user.user_metadata?.gender || "",
        city: user.user_metadata?.city || "",
        state: user.user_metadata?.state || "",
        email: user.email
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updates = {
      name: profile.name,
      phone: profile.phone,
      gender: profile.gender,
      city: profile.city,
      state: profile.state,
    };

    const { error } = await supabase.auth.updateUser({ 
      data: updates 
    });

    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      alert("Profile updated!");
      setUser({ ...user, user_metadata: updates });
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deepnavy via-deepnavy-light to-sapphire/20 relative overflow-hidden p-4">
      {/* Decorative glows */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cornflower/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-sapphire/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative bg-deepnavy-light border border-babyblue/20 p-10 rounded-3xl shadow-2xl shadow-black/20 w-full max-w-md transition-all">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-sapphire to-cornflower flex items-center justify-center text-2xl shadow-lg shadow-sapphire/20">
            👤
          </div>
          <h2 className="text-2xl font-bold text-babyblue">Edit Profile</h2>
          <p className="text-sm text-periwinkle/60 mt-1">Update your personal information</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-babyblue/70 mb-1.5 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-3.5 rounded-xl bg-deepnavy/40 border border-babyblue/20 text-babyblue placeholder-babyblue/40 focus:outline-none focus:ring-2 focus:ring-sapphire/30 focus:border-sapphire transition-all"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-babyblue/70 mb-1.5 uppercase tracking-wider">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 234 567 890"
                className="w-full p-3.5 rounded-xl bg-deepnavy/40 border border-babyblue/20 text-babyblue placeholder-babyblue/40 focus:outline-none focus:ring-2 focus:ring-sapphire/30 focus:border-sapphire transition-all"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-babyblue/70 mb-1.5 uppercase tracking-wider">Gender</label>
              <select
                className="w-full p-3.5 rounded-xl bg-deepnavy/40 border border-babyblue/20 text-babyblue focus:outline-none focus:ring-2 focus:ring-sapphire/30 focus:border-sapphire transition-all"
                value={profile.gender}
                onChange={(e) => setProfile({...profile, gender: e.target.value})}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-babyblue/70 mb-1.5 uppercase tracking-wider">City</label>
                <input
                  type="text"
                  placeholder="New York"
                  className="w-full p-3.5 rounded-xl bg-deepnavy/40 border border-babyblue/20 text-babyblue placeholder-babyblue/40 focus:outline-none focus:ring-2 focus:ring-sapphire/30 focus:border-sapphire transition-all"
                  value={profile.city}
                  onChange={(e) => setProfile({...profile, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-babyblue/70 mb-1.5 uppercase tracking-wider">State</label>
                <input
                  type="text"
                  placeholder="NY"
                  className="w-full p-3.5 rounded-xl bg-deepnavy/40 border border-babyblue/20 text-babyblue placeholder-babyblue/40 focus:outline-none focus:ring-2 focus:ring-sapphire/30 focus:border-sapphire transition-all"
                  value={profile.state}
                  onChange={(e) => setProfile({...profile, state: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-babyblue/70 mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full p-3.5 rounded-xl bg-deepnavy/30 border border-babyblue/20 text-babyblue opacity-70 cursor-not-allowed"
                value={profile.email}
                readOnly
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-sapphire to-cornflower text-white py-3.5 rounded-xl hover:from-sapphire-dark hover:to-cornflower-dark transition-all duration-300 shadow-lg shadow-sapphire/20 hover:shadow-xl hover:shadow-sapphire/30 font-semibold disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

