import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../..";

const JobDetail = () => {
  const params = useParams();
  const jobId = params.jobId;
  const navigate = useNavigate();

  // Local state to hold job data
  const [job, setJob] = useState();
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [summarizedText, setSummarizedText] = useState("");
  const [summarizing, setSummarizing] = useState(false);

  // Fetch job data using Axios
  useEffect(() => {
    const fetchJobById = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const response = await axios.get(`/api/v1/job/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userResponse = await axios.post(
          `${server}/api/v1/user/bookmarks`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const isBookmarked = userResponse.data.bookmarks.some(
          (bookmark) => bookmark._id === jobId
        );

        setJob(response.data.job);
        setIsBookmarked(isBookmarked);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobById();
  }, [jobId]);

  // Handle Add to Bookmark
  const handleBookmark = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = isBookmarked
        ? `/api/v1/user/removeBookmark/${jobId}`
        : `/api/v1/user/addBookmark/${jobId}`;
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsBookmarked(!isBookmarked); // Toggle bookmark state
      if (response.success) {
        toast.success("Bookmark Updated");
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  // Summarize Job Description
  const handleSummarize = async () => {
    try {
      setSummarizing(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/v1/job/${jobId}/summarize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSummarizedText(response.data.summarizedText);
      toast.success("Description summarized successfully!");
    } catch (error) {
      console.error("Error summarizing description:", error);
      toast.error("Failed to summarize the description");
    } finally {
      setSummarizing(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="space-y-5 mt-20">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{job?.title}</h1>
          <p>
            <div className="flex items-center space-x-2">
              Created By{" "}
              <span className="text-[#C0C4FC] underline italic ml-2">
                {job?.employerId?.name}
              </span>
            </div>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <p>Last updated {job?.createdAt.split("T")[0]}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Job Description</h1>
          <p className="text-sm">{job?.description}</p>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Category:{" "}
              </span>
              <span className="text-sm text-gray-500">{job?.category}</span>
            </div>

            <div className="flex flex-wrap gap-2"></div>
          </div>

          <button
            onClick={handleBookmark}
            className={`w-full mt-6 py-2 rounded-md ${
              isBookmarked
                ? "bg-gray-200 text-gray-700"
                : "bg-red-600 text-white"
            }`}
          >
            {isBookmarked ? "Remove Bookmark" : "Add to Bookmark"}
          </button>

          <button
            onClick={() => {
              navigate(`/${jobId}/apply-jobs`);
            }}
            className={`w-full mt-6 py-2 rounded-md`}
            style={{
              backgroundColor: "#fa6345",
              hover: { backgroundColor: "#fa7c5e" },
            }}
          >
            Apply Now
          </button>

          <button
            onClick={handleSummarize}
            className="w-full mt-6 bg-blue-300 text-black-400 py-2 rounded-md"
            disabled={summarizing}
          >
            {summarizing ? "Summarizing..." : "Summarize Description"}
          </button>

          <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
            {summarizedText ? (
              <p>{summarizedText}</p>
            ) : (
              <p>No summary available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
