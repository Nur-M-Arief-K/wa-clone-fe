import axios from "axios";

const { REACT_APP_CLOUD_NAME, REACT_APP_CLOUD_SECRET } = process.env;

const uploadToCloudinary = async (formData) => {
  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/raw/upload`,
      formData
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const uploadFiles = async (files) => {
  let uploadedFiles = [];
  const formData = new FormData();
  formData.append("upload_preset", REACT_APP_CLOUD_SECRET);

  // Won't work wih forEach
  for (const f of files) {
    const { file, type } = f;
    formData.append("file", file);
    let res = await uploadToCloudinary(formData);
    uploadedFiles.push({
      file: res,
      type: type,
    });
  }

  return uploadedFiles;
};
