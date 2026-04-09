import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../hook/UseAxios";


export default function AddAdminProduct() {
  const axiosSecure = useAxios()
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    material: "",
    description: "",
    stock: "",
    images: ["", "", ""], // 3 image slots
  });
  const [loading, setLoading] = useState(false);

  // Fetch product if editing
  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    axiosSecure
      .get(`/products/${productId}`)
      .then((res) => {
        // Ensure images array has 3 slots
        const imgs = res.data.images || [];
        while (imgs.length < 3) imgs.push("");
        setProduct({ ...res.data, images: imgs.slice(0, 3) });
      })
      .finally(() => setLoading(false));
  }, [productId]);

  // Upload single image to imgbb
  const uploadImage = async (file) => {
    if (!file) return "";
    const formData = new FormData();
    formData.append("image", file);
    const key = import.meta.env.VITE_IMGBB_KEY;
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.data.url;
  };

  // Mutation
  const mutation = useMutation({
    mutationFn: async (newProduct) => {
      if (productId) return axiosSecure.put(`/products/${productId}`, newProduct);
      return axiosSecure.post("/products", newProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      Swal.fire("Success", `Product ${productId ? "updated" : "added"}!`, "success");
      navigate("/dashboard/admin_products");
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Upload only changed images
      const uploadedImages = await Promise.all(
        product.images.map((img) => (img instanceof File ? uploadImage(img) : img))
      );

      mutation.mutate({ ...product, images: uploadedImages });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-4 text-center">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {productId ? "Edit Product" : "Add New Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="border p-2 font-medium rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="border p-2 font-medium rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className="border p-2 font-medium rounded"
        />
        <input
          type="text"
          placeholder="Brand"
          value={product.brand}
          onChange={(e) => setProduct({ ...product, brand: e.target.value })}
          className="border p-2 font-medium rounded"
        />
        <input
          type="text"
          placeholder="Sizes (comma separated)"
          value={product.sizes}
          onChange={(e) => setProduct({ ...product, sizes: e.target.value.split(",") })}
          className="border p-2 font-medium rounded"
        />
        <input
          type="text"
          placeholder="Colors (comma separated)"
          value={product.colors}
          onChange={(e) => setProduct({ ...product, colors: e.target.value.split(",") })}
          className="border p-2 font-medium rounded"
        />
        <input
          type="text"
          placeholder="Material"
          value={product.material}
          onChange={(e) => setProduct({ ...product, material: e.target.value })}
          className="border p-2 font-medium rounded"
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          className="border p-2 font-medium rounded"
        />
        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          className="border p-2 font-medium rounded col-span-1 md:col-span-2"
        />
      </div>

      {/* 3 Image Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {product.images.map((img, index) => (
          <div key={index} className="flex flex-col font-medium items-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProduct((prev) => {
                  const newImages = [...prev.images];
                  newImages[index] = e.target.files[0];
                  return { ...prev, images: newImages };
                })
              }
            />
            {typeof img === "string" && img && (
              <img src={img} alt={`Preview ${index}`} className="w-24 h-24 object-cover mt-2" />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        {productId ? "Update Product" : "Add Product"}
      </button>
    </div>
  );
}