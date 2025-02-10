import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Applications = () => {
  const { jobId } = useParams();
  // console.log(jobId)
  const [applications, setApplications] = useState([]);
  console.log(applications)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to create a job.");
          return;
        }
        const response = await axios.get(
          `http://localhost:8080/api/v1/job/${jobId}/applicants`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApplications(response.data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        List of all Applications:
      </h1>
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications found for this job.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Sr.No</th>
                <th className="border border-gray-300 p-2 text-left">
                  Applicant Name
                </th>
                <th className="border border-gray-300 p-2 text-left">Email</th>
                <th className="border border-gray-300 p-2 text-left">Resume</th>
                <th className="border border-gray-300 p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr key={application._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    {application.applicantId.name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {application.applicantId.email}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <a
                      href={application.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="border border-gray-300 p-2">
                    {application.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Applications;
