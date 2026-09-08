import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function logout() {
    axios.get("/users/logout").catch(() => {});
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  function createProject(e) {
    e.preventDefault();
    setError("");

    axios
      .post("/projects/create", {
        name: projectName,
      })
      .then((response) => {
        const newProject = response.data;
        setProject((prevProjects) => [...prevProjects, newProject]);
        setIsModalOpen(false);
        setProjectName("");
        navigate(`/project`, { state: { project: newProject } });
      })
      .catch((err) => {
        setError(err.response?.data || "Could not create that room. Try a unique name.");
      });
  }

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        setProject(res.data.projects || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load rooms. The API may still be waking up.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-ink-950 grain text-zinc-100">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <Brand />
        <div className="flex items-center gap-3 text-sm">
          <span className="hidden text-zinc-400 sm:inline">{user?.email}</span>
          <button
            onClick={logout}
            className="rounded-full border border-white/10 px-3 py-1.5 text-zinc-300 hover:bg-white/5"
          >
            Log out
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Your rooms
          </p>
          <h1 className="font-display mt-2 text-3xl font-bold">Projects</h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            Each room is a live chat plus an AI-backed file workspace. Open one
            or start a new collaboration.
          </p>
        </div>

        {error && (
          <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {String(error)}
          </p>
        )}

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="min-w-52 rounded-2xl border border-dashed border-gold/40 bg-gold/5 p-5 text-left transition hover:bg-gold/10"
          >
            <i className="ri-add-line text-gold"></i>
            <p className="mt-2 font-semibold">New room</p>
            <p className="mt-1 text-xs text-zinc-400">Create a project workspace</p>
          </button>
          {loading && (
            <div className="min-w-52 rounded-2xl border border-white/10 p-5 text-sm text-zinc-500">
              Loading rooms…
            </div>
          )}
          {project.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                navigate(`/project`, { state: { project: item } });
              }}
              className="min-w-52 cursor-pointer rounded-2xl border border-white/10 bg-ink-800 p-5 transition hover:border-gold/40 hover:bg-ink-700"
            >
              <h2 className="font-semibold capitalize">{item.name}</h2>
              <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
                <i className="ri-user-line"></i>
                Collaborators: {item.users?.length || 0}
              </div>
            </div>
          ))}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-ink-800 p-6 shadow-2xl">
            <h2 className="font-display text-xl font-semibold">Create a new room</h2>
            <form onSubmit={createProject} className="mt-4">
              <label
                htmlFor="projectName"
                className="block text-sm text-zinc-400"
              >
                Room name
              </label>
              <input
                id="projectName"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-gold/40"
                required
              />
              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl bg-white/10 px-4 py-2 text-sm text-zinc-200 hover:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-amber-200"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
