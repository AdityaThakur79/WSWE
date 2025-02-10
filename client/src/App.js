import "./App.css";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import Navbar from "./components/Navbar.js";
import IncidentReporting from "./pages/IncidentReporting/IncidentReporting.js";
import LiveTracking from "./pages/LiveTracking/LiveTracking.js";
import Community from "./pages/Community/Community.js";
import Login from "./pages/auth/Login.js";
import Register from "./pages/auth/Register.js";
import ForgotPassword from "./pages/auth/ForgotPassword.js";
import AddEmergencyNum from "./pages/AddEmergencyNum/AddEmergencyNum.js";
import { UserData } from "./context/UserContext.js";
import UserDashboard from "./pages/UserDashboard/UserDashboard.js";
import AdminDashboard from "./pages/admin/AdminDashboard.js";
import CreateProduct from "./pages/CreateWorkshop.js";
import AllWorkshop from "./pages/workshops/AllWorkshop.js";
import AllUsers from "./pages/admin/AllUsers.js";
import EarningOpportunites from "./pages/admin/Job/EarningOpportunites.js";
import ViewParticipants from "./pages/UserDashboard/ViewParticipants.js";
import DetailInformation from "./pages/workshops/DetailInformation.js";
import NearbySafeLocations from "./pages/NearbySafeLocations/NearbySafeLocations.js";
import AddJob from "./pages/admin/Job/AddJob.js";
import JobTab from "./pages/admin/Job/JobTab.js";
import Jobs from "./pages/Job/Jobs.js";
import JobDetail from "./pages/Job/JobDetail.js";
import MyBookmarks from "./pages/Job/MyBookmarks.jsx";
import Maps from "./pages/Map/Maps.js";
import VerifyOtp from "./pages/auth/VerifyOtp.js";
import ApplyJob from "./pages/Job/ApplyJob.js";
import AppliedJobs from "./pages/Job/AppliedJobs.js";
import Application from "./pages/admin/Job/Applications.js";
import MapViewer from "./pages/mapViewer/MapViewer.js";
import Footer from "./components/Footer.js";

function App() {
  const { isAuth, user } = UserData();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdminRoute && <Navbar isAuth={isAuth} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/incident-reporting"
          element={isAuth ? <IncidentReporting /> : <Login />}
        />
        <Route
          path="/live-tracking"
          element={isAuth ? <LiveTracking /> : <Login />}
        />
        <Route path="/community" element={<Community />} />
        <Route
          path="/AddEmergencyNum"
          element={isAuth ? <AddEmergencyNum /> : <Login />}
        />
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route path="/register" element={isAuth ? <Home /> : <Register />} />
        <Route path="/verify-otp" element={isAuth ? <Home /> : <VerifyOtp />} />
        <Route
          path="/account"
          element={isAuth ? <UserDashboard user={user} /> : <Login />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/admin/dashboard"
          element={isAuth ? <AdminDashboard /> : <Login />}
        />
        <Route path="/create-workshop" element={<CreateProduct />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route path="/allWorkshop" element={<AllWorkshop />} />
        <Route path="/admin/allUsers" element={<AllUsers />} />
        <Route path="admin/opportunities" element={<EarningOpportunites />} />
        <Route
          path="/viewParticipants/:workshopId"
          element={<ViewParticipants />}
        ></Route>
        <Route
          path="/workshopDetail/:workshopId"
          element={<DetailInformation />}
        ></Route>
        <Route
          path="/nearbySafeLocations"
          element={<NearbySafeLocations />}
        ></Route>
        <Route path="/track/:linkId" element={<MapViewer />} />
        <Route path="admin/job" element={<EarningOpportunites />} />
        <Route path="admin/job/create" element={<AddJob />} />
        <Route path="admin/job/edit/:jobId" element={<JobTab />} />
        <Route path="admin/job/view-application/:jobId" element={<Application />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job-detail/:jobId" element={<JobDetail />} />
        <Route path="/:jobId/apply-jobs" element={<ApplyJob />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/mybookmarks" element={<MyBookmarks />} />
        <Route path="/maps/:lat/:lng" element={<Maps />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
