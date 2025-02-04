import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  const isVideo = [".mp4", ".mov", ".avi", ".mkv"].includes(fileExt);
  const isImage = [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(fileExt);

  if (isImage || isVideo) {
    cb(null, true);
  } else {
    cb(
      new Error("Unsupported file type. Upload images or videos only."),
      false
    );
  }
};

// Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: {},
});

const singleUpload = upload.single("file");
export default singleUpload;
