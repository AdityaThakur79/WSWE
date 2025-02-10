import React, { useEffect, useState } from "react";
import AdminContentWrapper from "../../../components/AdminContentWrapper";
import AdminHeader from "../../../components/AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Papa from "papaparse";

const EarningOpportunites = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in.");
          return;
        }

        const response = await axios.get("/api/v1/job/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error); // Debug log
        alert(error.response?.data?.message || "Error fetching jobs");
      }
    };

    fetchJobs();
  }, []);

  const handleExportCSV = () => {
    // Map through the jobs data and transform it into a format suitable for CSV
    const csvData = jobs.map((job) => ({
      Title: job.title,
      Description: job.description,
      Category: job.category,
      CreatedAt: job.createdAt,
      Level: job.level,
      Location: job.location,
      Salary: job.salary,
      SkillsRequired: job.skillsRequired.join(", "), // Joining the array of skills into a string
      EmployerName: job.employerId.name, // Extracting employer's name
      EmployerEmail: job.employerId.email, // Extracting employer's email
    }));

    // Log to check the data being passed to PapaParse
    console.log("CSV Data to Export:", csvData);

    try {
      Papa.unparse(csvData, {
        complete: function (results) {
          console.log("Papa.unparse results:", results); // Log the parsed results
          if (results && results.data) {
            const blob = new Blob([results.data], {
              type: "text/csv;charset=utf-8;",
            });
            const link = document.createElement("a");

            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "jobsPosted.csv");
            link.click();
          } else {
            console.error("No CSV data generated");
          }
        },
        error: function (error) {
          console.error("Papa.unparse error:", error); // Catch any errors from PapaParse
        },
      });
    } catch (error) {
      console.error("Error while exporting CSV:", error);
    }
  };

  // Limit the job title to 5 words
  const limitTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return title;
  };

  return (
    <AdminContentWrapper>
      <div className="mt-20">
        <AdminHeader category="Page" title="Earning Opportunities" />
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-5">
            <button
              onClick={handleExportCSV}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Export to CSV
            </button>
            <button
              onClick={() => navigate("/admin/job/create")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Create a New Job Opening
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-300 mt-5">
              <caption className="caption-top text-lg font-semibold mb-2">
                A list of your recent Job Openings Posted.
              </caption>
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border border-gray-300">Title</th>
                  <th className="px-4 py-2 border border-gray-300">Status</th>
                  <th className="px-4 py-2 border border-gray-300">Category</th>
                  <th className="px-4 py-2 border border-gray-300">Salary</th>
                  <th className="px-4 py-2 border border-gray-300">Action</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Applications
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td className="px-4 py-2 border border-gray-300">
                      {limitTitle(job.title)}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {job.status || "Draft"}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {job.category}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {job.salary}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <button
                        onClick={() => navigate(`/admin/job/edit/${job._id}`)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <button
                        onClick={() => navigate(`/admin/job/view-application/${job._id}`)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminContentWrapper>
  );
};

export default EarningOpportunites;
