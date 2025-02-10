import React, { useEffect, useState } from "react";
import axios from "axios";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to create a job.");
          return;
        }
        const response = await axios.get(
          `http://localhost:8080/api/v1/job/applied-jobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppliedJobs(response.data.appliedJobs);
        setLoading(false);
        console.log(response);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch applied jobs.");
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  console.log(appliedJobs);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-4 ">
      <h1 className="text-2xl font-bold mb-6 text-center">Applied Jobs</h1>
      {appliedJobs.length === 0 ? (
        <div className="text-center">You have not applied to any jobs yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100 text-center">
                {/* <th className="px-4 py-2 border border-gray-300">
                  Employeer Name
                </th> */}
                <th className="px-4 py-2 border border-gray-300">Job Title</th>
                <th className="px-4 py-2 border border-gray-300">
                  Job Category
                </th>
                {/* <th className="px-4 py-2 border border-gray-300">Applied At</th> */}
                {/* <th className="px-4 py-2 border border-gray-300">Status</th> */}
              </tr>
            </thead>
            <tbody>
              {appliedJobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  {/* <td className="px-4 py-2 border border-gray-300">
                    {job.employeerTitle || "NA"}
                  </td> */}
                  <td className="px-4 py-2 border border-gray-300">
                    {job.title}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {job.category || "N/A"}
                  </td>
                  {/* <td className="px-4 py-2 border border-gray-300">
                    {new Date(job.appliedAt).toLocaleDateString()}
                  </td> */}
                  {/* <td className="px-4 py-2 border border-gray-300">{status}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
