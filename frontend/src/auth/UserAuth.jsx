import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";

const UserAuth = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      navigate("/login");
      return;
    }

    if (user) {
      setLoading(false);
      return;
    }

    axios
      .get("/users/profile")
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
        navigate("/login");
      });
  }, [user, setUser, navigate]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink-950 text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
          <p className="text-sm">Opening your workspace…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default UserAuth;
