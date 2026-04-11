import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaImage, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router";

import UseUploadImage from "../../hook/UseUploadImage";
import UseAxios from "../../hook/UseAxios";
export default function EditDiscountBanner() {
  const { register, handleSubmit, reset } = useForm();
  const { uploadImage } = UseUploadImage();
  const axiosSecure = UseAxios()
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      let imageUrl = "";

      if (data.image && data.image[0]) {
        imageUrl = await uploadImage(data.image[0]);
      }

      const payload = {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        image: imageUrl,
      };

      // 🔥 POST API CALL
      await axiosSecure.post("/banner", payload);

      setLoading(false);
      alert("Banner Updated Successfully!");

      reset();
      setPreview(null);

      // 🔥 redirect to home
      navigate("/");

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Offer Banner</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block font-medium mb-1">Title</label>
            <input {...register("title")} className="w-full font-normal border p-2 rounded" />
          </div>

          <div>
            <label className="block font-medium mb-1">Subtitle</label>
            <input {...register("subtitle")} className="w-full font-normal border p-2 rounded" />
          </div>

          <div>
            <label className="block font-medium mb-1">Start Date</label>
            <input type="date" {...register("startDate")} className="w-full font-normal border p-2 rounded" />
          </div>

          <div>
            <label className="block font-medium mb-1">End Date</label>
            <input type="date" {...register("endDate")} className="w-full font-normal border p-2 rounded" />
          </div>

        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea {...register("description")} className="w-full font-normal border p-2 rounded" />
        </div>

        {/* Image */}
        <div>
          <label className=" font-medium mb-1 flex items-center gap-2">
            <FaImage /> Banner Image
          </label>

          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Preview */}
        {preview && (
          <img src={preview} className="w-full h-52 object-cover rounded" />
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          <FaSave />
          {loading ? "Saving..." : "Save Banner"}
        </button>
      </form>
    </div>
  );
}