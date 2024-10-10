import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Function to handle image uploads
export async function imgUpload(file, ID, type = "profile") {
  
  
  let imgPaths = [];
  let allowedExtensions = [".jpg", ".jpeg", ".png"];
  let uploadDirs = {
    profile: "/profileImgs/",
    store: "/storeImgs/",
    product: "/productImgs/",
  };

  try {
    // Return a message if no file is provided
    if (!file) {
      throw new Error("No file provided");
    }

    // Define allowed file extensions for images

    // Determine the upload directory based on the type provided

    let uploadDir = "/src/public" + (uploadDirs[type] || "/otherImgs/");

    // Handle single or multiple image files
    let images = file.images || file.image;
    images = Array.isArray(images) ? images : [images];

    

    // Clean up existing files in the directory that match the ID
    let filesInDir = fs.readdirSync(path.join(process.cwd(), uploadDir));
    filesInDir.forEach((file) => {
      if (file.startsWith(ID)) {
        fs.unlinkSync(path.join(process.cwd(), uploadDir, file));
      }
    });
const invalidType = images.some((e) => {
  const ext = path.extname(e.name).toLowerCase();
  return !allowedExtensions.includes(ext);
});

if (invalidType) {
  throw new Error("Only JPEG, JPG and PNG image files are allowed");
}
    
    // Process each image and move it to the designated directory
    await Promise.all(
      images.map(async (e) => {
        let ext = path.extname(e.name).toLowerCase();

        // Generate a unique file name using the provided ID and a UUID
        let uniqueFileName = `${ID}-${uuidv4()}${ext}`;
        let uploadPath = path.join(process.cwd(), uploadDir, uniqueFileName);
        // Move the image file to the upload directory
        await new Promise((resolve, reject) => {
          e.mv(uploadPath, (error) => {
            if (error) {
              reject(new Error(error));
            } else {
              resolve();
            }
          });
        });

        // Store the relative path of the uploaded image
        imgPaths.push(`/upload${uploadDirs[type]}${uniqueFileName}`);

      })
    );

    // Return the file(s) path(s) based on the type of upload
    imgPaths = (type == "product")?imgPaths:imgPaths[0];
    return {
      success: true,
      data:imgPaths
    }
  } catch (error) {
    
    return {
      success: false,
      error:error.message
    }
  }
}
