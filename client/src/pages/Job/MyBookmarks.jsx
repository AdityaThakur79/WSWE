import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JobBookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobBookmarks = async () => {
            try {
                const response = await axios.post("api/v1/user/bookmarks", {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                setBookmarks(response.data.bookmarks || []);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching bookmarks", err);
                setError("Failed to load bookmarks");
                setLoading(false);
            }
        };

        fetchJobBookmarks();
    }, []);

    console.log(bookmarks);

    if (loading) return <h1 className="text-center mt-10 text-xl">Loading...</h1>;
    if (error) return <h1 className="text-center mt-10 text-xl">{error}</h1>;

    return (
        <div className="text-center">   
            <h1 className="font-bold text-2xl mt-20">YOUR SAVED JOBS</h1>
            <div className="my-5">
                {bookmarks.length === 0 ? (
                    <p className="text-gray-600">You have not saved any jobs right now</p>
                ) : (
                    <div className="max-w-7xl mx-auto p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bookmarks.map((job) => (
                                <Link to={`/job-detail/${job._id}`} className="block">
                                    <div
                                        className="overflow-hidden rounded-lg bg-[#fa6345] shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                        <div className="relative p-4">
                                            <span className="  text-white px-4 py-1 text-xs rounded-full" style={{ backgroundColor: "#fa6345", hover: { backgroundColor: "#fa7c5e" } }}>
                                                {job.category}
                                            </span>
                                            <span className=" ml-2 text-white px-4 py-1 text-xs rounded-full" style={{ backgroundColor: "#fa6345", hover: { backgroundColor: "#fa7c5e" } }}>
                                                {job.level}
                                            </span>
                                        </div>

                                        <div className="px-5 py-4 space-y-3">
                                            {/* Job Title */}
                                            <h1 className="font-bold text-lg text-white-900 dark:text-gray-100 truncate hover:underline">
                                                {job.title}
                                            </h1>

                                            {/* Job Description */}
                                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate hover:underline">
                                                {job.description}
                                            </p>

                                            {/* Employer Info and Location */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    {/* <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
                                                        {job.employerId?.photoUrl ? (
                                                            <img
                                                                src={job.employerId.photoUrl}
                                                                alt="Employer"
                                                                className="h-8 w-8 object-cover rounded-full"
                                                            />
                                                        ) : (
                                                            <span
                                                                className="text-sm font-bold p-2 text-gray-700 bg-gray-800 dark:text-gray-300 rounded-full"
                                                                style={{ backgroundColor: "#fa6345" }}
                                                            >
                                                                {job.employerId?.name?.charAt(0) || "E"}
                                                            </span>

                                                        )}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                        {job.employerId?.name || "Unknown"}
                                                    </span> */}
                                                </div>
                                                <span className="bg-#fa6345-600 text-white px-3 py-1 text-xs rounded-full" style={{ backgroundColor: "#fa6345", hover: { backgroundColor: "#fa7c5e" } }}>
                                                    {job.location || "Remote"}
                                                </span>
                                            </div>

                                            {/* Salary */}
                                            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                                {job.salary ? `₹${job.salary}` : "Salary Negotiable"}
                                            </div>

                                            {/* Apply Now Button */}
                                            <div className="mt-4">
                                                <Link
                                                    to={`/job-detail/${job._id}`}
                                                    className="block w-full text-center text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
                                                    style={{ backgroundColor: "#fa6345", hover: { backgroundColor: "#fa7c5e" } }}
                                                >
                                                    Apply Now
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobBookmarks;
