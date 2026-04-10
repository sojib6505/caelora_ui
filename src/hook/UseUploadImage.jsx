import UseAxios from "./UseAxios";

export default function UseUploadImage() {
  const axiosSecure = UseAxios()

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axiosSecure.post("/upload", formData);
    return res.data.url;
  };

  return { uploadImage };
}