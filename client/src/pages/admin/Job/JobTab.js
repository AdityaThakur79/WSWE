import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const JobTab = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
    skillsRequired: [],
    location: "",
    salary: "",
    level: "",
  });
  const { jobId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch job by ID
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/v1/job/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInput(response.data.job);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching job details");
      }
    };

    fetchJob();
  }, [jobId]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setInput((prev) => ({
      ...prev,
      skillsRequired: checked
        ? [...prev.skillsRequired, value]
        : prev.skillsRequired.filter((skill) => skill !== value),
    }));
  };

  const updateJobHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/api/v1/job/jobs/${jobId}`,
        {
          title: input.title,
          description: input.description,
          category: input.category,
          skillsRequired: input.skillsRequired,
          location: input.location,
          salary: input.salary,
          level: input.level,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Job updated successfully");
      navigate("/admin/job");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating job");
    }
  };

  const deleteJobHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/v1/job/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Job deleted successfully");
      navigate("/admin/job");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting job");
    }
  };

  return (
    <div className="flex-1">
      <div className="flex justify-center">
        <div className="mb-4">
          <h1 className="font-bold text-xl">Edit Job</h1>
          <p className="text-sm">Update or delete the selected job.</p>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen my-10">
        <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
          <div className="space-y-4">
            {/* Job form fields */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Job Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Job Description"
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <select
                name="category"
                value={input.category}
                onChange={changeEventHandler}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Select Category</option>
                <option value="Software">Software</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="HR">HR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Skills Required
              </label>
              <div className="space-y-2">
                {["JavaScript", "React", "Node.js", "CSS"].map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={skill}
                      value={skill}
                      checked={input.skillsRequired.includes(skill)}
                      onChange={handleSkillChange}
                      className="h-4 w-4"
                    />
                    <label htmlFor={skill}>{skill}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Job Location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Salary</label>
              <input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Salary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Level</label>
              <select
                name="level"
                value={input.level}
                onChange={changeEventHandler}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Select a level</option>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            {/* Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={deleteJobHandler}
                className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete Job
              </button>
              <button
                onClick={updateJobHandler}
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Update Job
              </button>
              <button
                onClick={() => navigate("/admin/jobs")}
                className="px-6 py-2 text-sm font-medium text-gray-700 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTab;
