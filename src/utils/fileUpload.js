import path from "path";
import fs from "fs";

// Function to handle image uploads
export async function imgUpload(file, userId, type = "profile") {
    // console.log(file.image);
  if (!file || !file.image) {
    return { message: "No file provided" };
  }

  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const image = file.image;
  const ext = path.extname(image.name).toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    return { message: "Only JPEG and PNG image files are allowed" };
  }

  // Determine upload directory based on the type
  let uploadDir =
    {
      profile: "/public/profileImgs/",
      store: "/public/storeImgs/",
      product: "/public/productImgs/",
    }[type] || "/public/otherImgs/";
uploadDir= "/src"+uploadDir
  // Generate unique file name
  const uniqueFileName = `${userId}-${Date.now()}${ext}`;
  const uploadPath = path.join(process.cwd(), uploadDir, uniqueFileName);

  // Clean up existing files in the directory
  const filesInDir = fs.readdirSync(path.join(process.cwd(), uploadDir));
  filesInDir.forEach((file) => {
    if (file.startsWith(userId)) {
      fs.unlinkSync(path.join(process.cwd(), uploadDir, file));
    }
  });

  // Move the file to the upload path
  await new Promise((resolve, reject) => {
    image.mv(uploadPath, (error) => {
      if (error) {
        console.log(error);
        reject(new Error(error));
      } else {
        resolve();
      }
    });
  });

  // Return the path relative to the public directory
  const imgPath = `${uploadDir}${uniqueFileName}`;
  return imgPath;
}