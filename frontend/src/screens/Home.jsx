import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [project, setProject] = useState([]);
  const navigate = useNavigate();

  function createProject(e) {
    e.preventDefault();
    console.log("Project Name:", projectName);

    axios
      .post("/projects/create", {
        name: projectName,
      })
      .then((response) => {
        console.log(response.data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        console.log(res.data);
        setProject(res.data.projects);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main className="p-4">
      <div className="projects flex flex-wrap gap-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-4 border border-slate-300 rounded-md hover:bg-slate-100 transition"
        >
          <i className="ri-link"></i> New Project
        </button>
        {project.map((project) => (
          <div
            key={project._id}
            onClick={() => {
              navigate(`/project`, { state: { project } });
            }}
            className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-
            300 rounded-md hover:bg-slate-100 transition min-w-52"
          >
            {" "}
            <h2 className="font-semibold">{project.name}</h2>
            <div className="flex gap-2">
              <p>
                <i className="ri-user-line"></i>Collaborators:{" "}
              </p>
              {project.users.length}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Name
                </label>
                <input
                  id="projectName"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 mr-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
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
