const cloudinary = require("cloudinary").v2;
//API environment variable:
//CLOUDINARY_URL=cloudinary://725372282718674:SOVqUJhB8Zisulbusy-wz8_us9k@dn0bamps0
cloudinary.config({
  cloud_name: "dn0bamps0",
  api_key: "725372282718674",
  api_secret: "SOVqUJhB8Zisulbusy-wz8_us9k",
});

const uploadImage = (file) => {
  console.log("🚀 ~ uploadImage ~ file:", file);
  const buffer = file.buffer;
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
        },
        (err, result) => {
          if (err) {
            console.log("🚀 ~ returnnewPromise ~ err:", err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      )
      .end(buffer);
  });
};

module.exports = { uploadImage };
