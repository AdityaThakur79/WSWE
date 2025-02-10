const { v2: cloudinary } = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config({});

// Configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

 const uploadMedia = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return uploadResponse;
  } catch (error) {
    console.log(error);
  }
};
 const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
  }
};

// export const deleteVideoFromCloudinary = async (publicId) => {
//   try {
//     await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  uploadMedia,
  deleteMediaFromCloudinary,
};
