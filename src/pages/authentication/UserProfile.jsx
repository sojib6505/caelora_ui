import { useState, useEffect } from "react";
import { FaUser, FaBox, FaHeart, FaSignOutAlt, FaEdit } from "react-icons/fa";
import UseAuth from "../../hook/UseAuth";
import Swal from "sweetalert2";
import UseUserData from "../../hook/UseUserData";
import useAxios from "../../hook/UseAxios";
import UseUploadImage from "../../hook/UseUploadImage";

export default function UserProfile() {
  const { logOut, user, loading } = UseAuth();
  const { userData, userLoading, updateUserData } = UseUserData();
  const axiosSecure = useAxios();
  const { uploadImage } = UseUploadImage();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    phone: "",
    country: "",
    city: "",
    area: "",
    address: "",
    postalCode: "",
  });

  // prevent overwrite while editing
  useEffect(() => {
    if (userData && !isEdit) {
      setFormData({
        name: userData.name || "",
        photoURL: userData.photoURL || "",
        phone: userData.phone || "",
        country: userData.location?.country || "",
        city: userData.location?.city || "",
        area: userData.location?.area || "",
        address: userData.location?.address || "",
        postalCode: userData.location?.postalCode || "",
      });
    }
  }, [userData, isEdit]);

  if (loading || userLoading)
    return <p className="text-center mt-20">Loading...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const imageUrl = await uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        photoURL: imageUrl,
      }));

      Swal.fire("Success", "Photo uploaded", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Photo upload failed", "error");
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        name: formData.name,
        photoURL: formData.photoURL,
        phone: formData.phone,
        location: {
          country: formData.country,
          city: formData.city,
          area: formData.area,
          address: formData.address,
          postalCode: formData.postalCode,
        },
      };

      const res = await axiosSecure.put(`/users/${user.email}`, payload);
      // proper success check
      if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
        Swal.fire("Success", "Profile updated successfully", "success");
        setIsEdit(false);
        await updateUserData();
      }
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white shadow-lg p-5">
        <div className="text-center">
          <img
            src={
              formData.photoURL ||
              user?.photoURL ||
              "https://i.ibb.co/4pDNDk1/avatar.png"
            }
            className="w-20 h-20 rounded-full mx-auto"
          />
          <h2 className="mt-3 font-bold">{formData.name}</h2>
          <p className="text-sm font-medium text-gray-500">
            {user?.email}
          </p>
        </div>

        <ul className="mt-6 space-y-3">
          <li className="flex items-center font-medium gap-2 cursor-pointer">
            <FaUser /> Profile
          </li>
          <li className="flex items-center font-medium gap-2 cursor-pointer">
            <FaBox /> Orders
          </li>
          <li className="flex items-center font-medium gap-2 cursor-pointer">
            <FaHeart /> Wishlist
          </li>
          <li
            onClick={logOut}
            className="flex  font-medium items-center gap-2 text-red-500 cursor-pointer"
          >
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="bg-white p-5 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Profile Info</h2>
            <button
              onClick={() => setIsEdit(!isEdit)}
              className="flex font-medium items-center gap-2 text-primary cursor-pointer"
            >
              <FaEdit /> {isEdit ? "Cancel" : "Edit"}
            </button>
          </div>

          {!isEdit ? (
            <div className="space-y-2 font-medium">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Phone:</strong> {formData.phone || "Not added"}</p>
              <p><strong>Location:</strong></p>
              <p>{formData.address}</p>
              <p>{formData.area}, {formData.city}</p>
              <p>{formData.country} - {formData.postalCode}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "phone", "country", "city", "area", "address", "postalCode"].map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  value={formData[key] || ""} 
                  onChange={handleChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="w-full border p-2 rounded font-medium"
                />
              ))}

              <div className="col-span-1 md:col-span-2">
                <label className="block font-medium mb-1">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full border p-2 rounded"
                />
                {formData.photoURL && (
                  <img
                    src={formData.photoURL}
                    alt="Preview"
                    className="mt-2 w-32 h-32 rounded-full object-cover"
                  />
                )}
              </div>

              <div className="col-span-1 md:col-span-2">
                <button
                  onClick={handleUpdate}
                  className="bg-primary font-medium text-white px-4 py-2 rounded w-full cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}