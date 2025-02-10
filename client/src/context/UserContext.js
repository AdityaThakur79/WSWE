import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "..";
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [workshop, setWorkshop] = useState([]);

  //REGISTER
  async function registerUser(name, email, password, answer, phone, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/userRegistration`,
        { name, email, password, answer, phone }
      );
      toast.success(data.message);
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  }

  async function verifyOTP(email, otp, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/v1/user/verify-otp`, {
        email,
        otp,
      });
      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setBtnLoading(false);
    }
  }

  //LOGIN
  async function loginUser(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/v1/user/userLogin`, {
        email,
        password,
      });
      toast.success(data?.message);
      localStorage.setItem("token", data?.token);
      setUser(data?.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setBtnLoading(false);
      toast.error("Inavlid Email or Password");
    }
  }

  const getUserFromIdFromToken = async (token) => {
    try {
      const { data } = await axios.get(
        `${server}/api/v1/user/DecodeUserIdFromJwt/${token}`
      );
      const userId = data?.userId;
      return userId;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserFromId = async (token) => {
    try {
      const userId = await getUserFromIdFromToken(token);
      const { data } = await axios.get(
        `/api/v1/user/getSingleUserById/${userId}`
      );
      return data?.user;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllWorkshopks = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/getAllWorkshopPost");
      setWorkshop(data?.modifiedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedUser = await getUserFromId(token);
        setUser(decodedUser);
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    getAllWorkshopks();
  }, []);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        verifyOTP,
        loginUser,
        isAuth,
        setIsAuth,
        user,
        setUser,
        workshop,
        setWorkshop,
        btnLoading,
        loading,
        getAllWorkshopks,
      }}
    >
      {" "}
      {children} <Toaster></Toaster>
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
