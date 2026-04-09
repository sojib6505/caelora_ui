import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../hook/UseAxios";

export default function ProductDetails() {
    const { id } = useParams();
    const axiosSecure = useAxios();
    const [selectedImage, setSelectedImage] = useState("");

    // Fetch single product
    const { data: product = {}, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center p-5">Loading...</p>;

    const {
        name,
        price,
        category,
        brand,
        sizes,
        colors,
        material,
        description,
        stock,
        images = [],
    } = product;

    const mainImage = selectedImage || images[0];

    const handleAddToCart = () => {
        Swal.fire("Added!", "Product added to cart", "success");
    };

    const handleBuyNow = () => {
        Swal.fire("Success!", "Proceeding to checkout...", "success");
    };

    return (
        <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-8">

            {/* LEFT: Images */}
            <div>
                <div className="overflow-hidden rounded-lg border shadow-lg w-full" style={{ minHeight: "400px" }}>
                    <img
                        src={mainImage}
                        alt={name}
                        className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 mt-4 justify-center">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            onClick={() => setSelectedImage(img)}
                            className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${mainImage === img ? "border-blue-500" : "border-gray-200"
                                } transition-all duration-300 hover:scale-110`}
                        >
                            <img
                                src={img}
                                alt={`thumb-${i}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT: Info */}
            <div className="flex flex-col justify-between">
                <div>
                    <h2 className="text-3xl font-bold mb-2">{name}</h2>
                    <p className="text-2xl text-green-600 font-semibold mb-4">
                        ৳ {price}
                    </p>

                    <div className="text-gray-700 font-medium space-y-1">
                        <p><b>Category:</b> {category}</p>
                        <p><b>Brand:</b> {brand}</p>
                        <p><b>Material:</b> {material || "-"}</p>
                        <p><b>Stock:</b> {stock || "Available"}</p>
                    </div>

                    {/* Sizes */}
                    {sizes?.length > 0 && (
                        <div className="mt-3 font-medium">
                            <b>Sizes:</b>
                            <div className="flex gap-2 mt-1 flex-wrap">
                                {sizes.map((s, i) => (
                                    <span
                                        key={i}
                                        className="border px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Colors */}
                    {colors?.length > 0 && (
                        <div className="mt-3">
                            <b>Colors:</b>
                            <div className="flex gap-2 font-medium mt-1 flex-wrap">
                                {colors.map((c, i) => (
                                    <span
                                        key={i}
                                        className="border px-3 py-1 rounded-lg hover:bg-green-500 hover:text-white transition"
                                    >
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div className="mt-4">
                        <b>Description:</b>
                        <p className="text-gray-600 mt-1 font-medium">{description}</p>
                    </div>
                    {/* Buttons */}
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                        >
                            Add to Cart
                        </button>

                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
}