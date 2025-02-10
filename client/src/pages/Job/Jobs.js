import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/v1/job/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(response.data.jobs);
        setLoading(false);
        setFilteredJobs(response.data.jobs);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleSalaryFilter = (e) => {
    setSelectedSalary(e.target.value);
  };

  const filteredAndSearchedJobs = filteredJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchesSalary =
      selectedSalary === "All" ||
      (selectedSalary === "Below 5LPA" && job.salary < 500000) ||
      (selectedSalary === "Below 7LPA" &&
        job.salary >= 500000 &&
        job.salary <= 1000000) ||
      (selectedSalary === "Above 100K" && job.salary > 100000);

    return matchesSearch && matchesCategory && matchesSalary;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredAndSearchedJobs.slice(
    indexOfFirstJob,
    indexOfLastJob
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p className="text-center py-10">Loading jobs...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-10">
        Error loading jobs: {error}
      </p>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar for Filters */}
        <div className="lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-4">Filters</h3>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-semibold text-sm">Categories</h4>
            <div>
              <label className="block">
                <input
                  type="checkbox"
                  value="Software"
                  onChange={handleCategoryFilter}
                  className="mr-2"
                />
                Software
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  value="Finance"
                  onChange={handleCategoryFilter}
                  className="mr-2"
                />
                Finance
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  value="Design"
                  onChange={handleCategoryFilter}
                  className="mr-2"
                />
                Design
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  value="Marketing"
                  onChange={handleCategoryFilter}
                  className="mr-2"
                />
                Marketing
              </label>
            </div>
          </div>

          {/* Salary Filter */}
          <div className="mb-6">
            <h4 className="font-semibold text-sm">Salary</h4>
            <select
              value={selectedSalary}
              onChange={handleSalaryFilter}
              className="p-2 border rounded-lg w-full"
            >
              <option value="All">All Salary Ranges</option>
              <option value="Below 5LPA">Below 5 LPA</option>
              <option value="Below 7LPA">Below 7 LPA</option>
              <option value="Above 100K">Above 100K</option>
            </select>
          </div>
        </div>

        {/* Center Content for Search and Job Listings */}
        <div className="flex-1">
          {/* Search Input */}
          <div className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by job title or description"
              className="p-2 border rounded-lg w-full"
            />
          </div>

          {/* Display Jobs */}
          {filteredAndSearchedJobs.length === 0 ? (
            <p className="text-center text-gray-600">
              No jobs available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-6 flex justify-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-800 text-white rounded-l-lg disabled:bg-gray-300"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredAndSearchedJobs.length / jobsPerPage)
              }
              className="px-3 py-1 bg-gray-800 text-white rounded-r-lg disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
