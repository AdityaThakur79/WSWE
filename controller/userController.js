const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const fs = require("fs");
const twilio = require("twilio");
const workShopModel = require("../models/workshopPostModel");
const { default: slugify } = require("slugify");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const Job = require("../models/JobModel/jobModel");
const { v4: uuidv4 } = require("uuid");
const locationModel=require('../models/locationModel')
dotenv.config();

// below is the controller for getting the userId from jwtToken
const decodeUserJwtController = async (req, res) => {
  try {
    const { token } = req.params;
    // console.log(token)
    const user = jwt.decode(token);
    const userId = user?.id;
    return res.status(200).send({
      userId,
    });
  } catch (error) {
    console.log("something went wrong in decodeUserJwtController");
    res.status(500).send({
      success: false,
      message: "something went wrong in decodeUserJwtController",
    });
  }
};
// below is the controller for getting the user using the id
const getSingleUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const user = await userModel.findById(userId);
    return res.status(200).send({
      success: true,
      message: "successfully found the user",
      user,
    });
  } catch (error) {
    console.log("something went wrong in getSingleUserController");
    res.status(500).send({
      success: false,
      message: "something went wrong in getSingleUserController",
    });
  }
};
const createWorkshopPostController = async (req, res) => {
  try {
    const {
      name,
      address,
      organizerName,
      date,
      time,
      description,
      participantsNumber,
    } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name: {
        return res.status(500).send({ error: "name is required" });
      }
      case !address: {
        return res.status(500).send({ error: "address is required" });
      }
      case !organizerName: {
        return res.status(500).send({ error: "organizerName is required" });
      }
      case !date: {
        return res.status(500).send({ error: "date is required" });
      }
      case !description: {
        return res.status(500).send({ error: "description is required" });
      }
      // case !time: {
      //     return res.status(500).send({ error: 'name is required' })
      // }
      case !participantsNumber: {
        return res
          .status(500)
          .send({ error: "participants number is required" });
      }
    }
    const { userId } = req.params;
    const workshopPost = new workShopModel({
      ...req.fields,
      keyword: slugify(name),
      user: userId,
    });
    if (photo) {
      workshopPost.photo.data = fs.readFileSync(photo.path);
      workshopPost.photo.contentType = photo.type;
    }

    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "user is not available",
      });
    }

    // below we are starting the mongoose transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.post.push(workshopPost);
    await existingUser.save({ session });
    await session.commitTransaction();
    await workshopPost.save();
    res.status(201).send({
      success: true,
      message: "Workshop post has been created successfully",
      // post
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while creating the post",
    });
  }
};

// below is the controller for getting all post
const getAllWorkshopPost = async (req, res) => {
  try {
    const allPost = await workShopModel.find({}).select("-photo");

    const modifiedPosts = allPost.map((post) => ({
      ...post.toObject(),
      approvedStatus: post.approved === 1 ? "approved" : "disapproved",
    }));
    return res.status(201).send({
      success: true,
      message: "successfully fetched all post",
      postCount: allPost.length,
      modifiedPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something went wrong while fetching all the post",
      error,
    });
  }
};

// below is the controller for getting the single workshop
const getSingleWorkshop = async (req, res) => {
  try {
    const { workshopId } = req.params;
    const post = await workShopModel.findById(workshopId).select("-photo");
    return res.status(201).send({
      success: true,
      message: "successfully fetched the workshop",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something went wrong while fetching the single post",
      error,
    });
  }
};

// below is the controller for getting the post photo
const getPostPhoto = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await workShopModel.findById(postId).select("photo");
    if (post?.photo?.data) {
      res.set("Content-type", post.photo.contentType);
      res.status(200).send(post.photo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something went wrong in getting post photo",
    });
  }
};

// below is the sos controller

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const executeSosController = async (req, res) => {
  try {
    const { sender, receivers, message, latitude, longitude } = req.body; // Fixed destructuring

    const fullMessage = `${message}. Location: https://www.google.com/maps?q=${latitude},${longitude}`;
    const successfulMessages = [];
    const failedMessages = [];

    for (let receiver of receivers) {
      try {
        // Format the receiver's phone number for WhatsApp
        const formattedReceiver = `whatsapp:+91${receiver}`;

        const response = await client.messages.create({
          from: process.env.TWILIO_WHATSAPP_NUMBER,
          to: formattedReceiver,
          body: `SOS from ${sender}: ${fullMessage}`,
        });

        successfulMessages.push(receiver);
        console.log(`Message sent to ${receiver}: ${response.sid}`);
      } catch (error) {
        failedMessages.push({
          receiver,
          error: error.message,
          moreInfo: error.moreInfo,
        });
        console.error(
          `Failed to send message to ${receiver}: ${error.message}`
        );
      }
    }

    if (failedMessages.length > 0) {
      return res.status(400).json({
        message: "Some messages failed to send.",
        failedMessages,
        successfulMessages,
      });
    }

    res.status(200).json({
      message: "SOS sent successfully to all receivers",
      successfulMessages,
    });
  } catch (error) {
    console.error("Error in SOS controller:", error);
    return res.status(500).json({
      message: "Something went wrong in SOS controller",
      success: false,
    });
  }
};

// below is the function for validating the mobile number
const validatePhoneNumber = async (mobile) => {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobile);
};

// below is the controller for adding the emergency number in the schema
const addEmergencyNumber = async (req, res) => {
  try {
    const { emergencyNumber, userId } = req.body;
    if (!validatePhoneNumber) {
      return res.status(400).send({
        message: "invalid mobile number",
      });
    }
    const user = await userModel.findById(userId);
    if (user?.emergencyNumber.length > 4) {
      return res.status(400).send({
        success: false,
        message: "You can only add up to 4 emergency numbers",
      });
    }
    if (user?.emergencyNumber.includes(emergencyNumber)) {
      return res.status(400).send({
        success: false,
        message: `Number ${emergencyNumber} already included`,
      });
    }
    user?.emergencyNumber.push(emergencyNumber);
    await user?.save();
    return res.status(200).send({
      success: true,
      message: `emergency number ${emergencyNumber} added successfully`,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something went wrong in the addEmergencyNumber controller",
      error,
    });
  }
};
// below is the controller for removing the emergency number from the schema
const removeEmergencyNumber = async (req, res) => {
  try {
    const { emergencyNumber, userId } = req.body;
    const user = await userModel.findById(userId);
    user.emergencyNumber = user?.emergencyNumber?.filter(
      (num) => num !== emergencyNumber
    );
    await user.save();
    return res.status(200).send({
      success: true,
      message: `emergency number ${emergencyNumber} removed successfully`,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something went wrong in the removeEmergencyNumber controller",
      error,
    });
  }
};
// below is the controller for getting the emergency numbers
const getEmergencyNumber = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    const emergencyNumber = user?.emergencyNumber;
    return res.status(200).send({
      emergencyNumber,
      success: true,
      message: "emergency number fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something went wrong in getting emergency number controller",
      error,
    });
  }
};

// below is the controller for adding the user to the workshop
const addUserToWorkshop = async (req, res) => {
  try {
    // here we have to add
    // 1-add user to workshop array(before check wheather user exist)
    // 2-reduce the number of more participants allowed
    const { workShopId, userId } = req.params;
    // addtoset will handle the duplicates
    const workshop = await workShopModel.findById(workShopId);
    const isUserRegistered = workshop.UsersRegistered.includes(userId);
    if (isUserRegistered) {
      return res.status(400).send({
        success: false,
        message: "User is already registered for the workshop",
      });
    }
    const updatedWorksop = await workShopModel.findByIdAndUpdate(
      workShopId,
      {
        $addToSet: { UsersRegistered: userId },
        $inc: { registered: 1 },
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "user has been added to the participants",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something went wrong while adding the user to the workshop",
    });
  }
};
// below is the controller for finding all users details from usersRegistered array
const getWorkshopParticipantsDetail = async (req, res) => {
  try {
    const { workshopId } = req.params;
    const workshop = await workShopModel.findById(workshopId);
    if (!workshop) {
      return res
        .status(404)
        .send({ success: false, message: "Workshop with id not found" });
    }
    const participants = await userModel.find({
      _id: { $in: workshop.UsersRegistered },
    });
    return res.status(200).send({
      success: true,
      participants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong in getting workshop participant details",
    });
  }
};

// below is the controller for seraching the product
const searchWorkshop = async (req, res) => {
  try {
    // getting the keywird from the params
    const { keyword } = req.params;
    const results = await workShopModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { address: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "error in searching the product",
    });
  }
};

// below is the controller for getting the users location
// const getSafeLocations = async (req, res) => {
//   try {
//     const { latitude, longitude } = req.params; // Get latitude and longitude from params

//     // Validate latitude and longitude
//     if (!latitude || !longitude) {
//       return res.status(400).send({
//         success: false,
//         message: "Latitude and longitude are required",
//       });
//     }
//     const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

//     // Construct the Google Places API URL
//       // Construct the Google Places API URL
//     //   current
//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=Police&location=${latitude},${longitude}&radius=1000&key=${GOOGLE_API_KEY}`;
//     // below is vasai
//     // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=Police&location=19.421267,72.799596&radius=1000&key=${GOOGLE_API_KEY}`;
//     // bhiwandi
//     // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=Police&location=19.2905216,73.056256&radius=1000&key=${GOOGLE_API_KEY}`;
//     // virar manvelpada
//     // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=Police&location=19.445578,72.820580&radius=1000&key=${GOOGLE_API_KEY}`;
//       console.log(url)

//     // Make the API request using fetch
//     const response = await fetch(url);
//     const data = await response.json();

//     console.log(data);

//     // Check if no results are found
//     if (data.results.length === 0) {
//       return res.status(404).send({
//         success: false,
//         message: "No safe locations found nearby",
//       });
//     }

//     // Map the results to the desired structure
//     const safeLocations = data.results.map((place) => ({
//       name: place.name,
//       address: place.vicinity,
//       location: place.geometry.location,
//     }));

//     // Send the response
//     return res.status(200).json({
//       success: true,
//       message: "Safe locations fetched successfully",
//       data: safeLocations,
//     });
//   } catch (error) {
//     console.error("Error:", error.message);
//     return res.status(500).send({
//       success: false,
//       message: "Something went wrong in fetching the locations from the API",
//     });
//   }
// };



const getSafeLocations = async (req, res) => {
  try {
    const { latitude, longitude,keyword } = req.params; // Get latitude and longitude from params
    // Validate latitude and longitude
    if (!latitude || !longitude) {
      return res.status(400).send({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    // Construct the Google Places API URL
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=${latitude},${longitude}&radius=1000&key=${GOOGLE_API_KEY}`;

    console.log(`Fetching data from URL: ${url}`);

    // Make the API request using fetch
    const response = await fetch(url);
    const data = await response.json();

    // Check if no results are found
    if (!data.results || data.results.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No safe locations found nearby",
      });
    }

    // Calculate distance and sort by nearest
    const safeLocations = data.results
      .map((place) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          place.geometry.location.lat,
          place.geometry.location.lng
        );
        return {
          name: place.name,
          address: place.vicinity,
          location: place.geometry.location,
          distance: distance,
        };
      })
      .sort((a, b) => a.distance - b.distance); // Sort by nearest distance

    // Send the sorted response
    return res.status(200).json({
      success: true,
      message: "Safe locations fetched and sorted by distance",
      data: safeLocations,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).send({
      success: false,
      message: "Something went wrong in fetching the locations from the API",
    });
  }
};

// Helper function to calculate the distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}



// Latitude: 19.1378135, Longitude: 72.8626136
// AIzaSyBHQ0FN6OPabBqeyKtG7h47K7mPULkGZZo

//Job Bookmark
const addBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the course
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the course is already bookmarked
    if (user.bookmarks.includes(jobId)) {
      return res.status(400).json({ message: "Job already bookmarked" });
    }

    // Add the course to bookmarks
    user.bookmarks.push(jobId);
    await user.save();

    return res
      .status(200)
      .json({ message: "Job bookmarked successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// Remove a course from user's bookmarks
const removeBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;
    // Find the user
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the course
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the course is bookmarked
    if (!user.bookmarks.includes(jobId)) {
      return res.status(400).json({ message: "Job not bookmarked" });
    }

    // Remove the course from bookmarks
    user.bookmarks.pull(jobId);
    await user.save();

    return res
      .status(200)
      .json({ message: "Job removed from bookmarks successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get all bookmarks of the user
const getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user
    const user = await userModel.findById(userId).populate("bookmarks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the bookmarks
    return res.status(200).json({ bookmarks: user.bookmarks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// below is the links controller that will create the unique links

const generateLinksController = async (req, res) => {
  try {
    const { userId } = req.body;
    const linkId = uuidv4(); 
    const existingLink=await locationModel.findOne({userId})
    if(existingLink){
      await locationModel.deleteOne({userId})
    }
    const newLink = new locationModel({ userId, linkId, lat: null, lng: null });
    await newLink.save();
    res.json({ linkId, url: `http://localhost:3000/track/${linkId}` });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Internal server error at the generateLinksController' });
  }
};



const getLinkData = async (req, res) => { 
  try {
    const { linkId } = req.params;  
    const linkedData=await locationModel.findOne({linkId});
    if(linkedData){
      res.json({ success: true, linkedData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Internal server error at the getLinkData' });
  }
};

module.exports = {
  getSingleUserById,
  createWorkshopPostController,
  getAllWorkshopPost,
  getPostPhoto,
  executeSosController,
  decodeUserJwtController,
  addEmergencyNumber,
  removeEmergencyNumber,
  getEmergencyNumber,
  addUserToWorkshop,
  getWorkshopParticipantsDetail,
  getSingleWorkshop,
  searchWorkshop,
  getSafeLocations,
  addBookmark,
  removeBookmark,
  getBookmarks,
  generateLinksController,
  getLinkData
};
