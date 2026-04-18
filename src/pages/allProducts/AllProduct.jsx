
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Link } from "react-router";
import UseAddToCart from "../../hook/UseAddToCart";
import useAxios from "../../hook/UseAxios";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";


export default function AllProduct() {
    const axiosSecure = useAxios()
    const { addToCart, isPending } = UseAddToCart()
    const [visibleCount, setVisibleCount] = useState(12)

    const {
        data: products = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosSecure.get("/products");
            return res.data;
        }
    })

    const visibleProducts = products.slice(0, visibleCount);
    if (isLoading) {
        return (
            <div className="flex justify-center mt-10">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <p className="text-red-500 text-center mt-10">
                Error: {error.message}
            </p>
        );
    }
    console.log(products)
    return (

        <section className="md:py-10 bg-white">
            <div className="max-w-6xl mx-auto px-2 md:px-6">
                <div className="text-start mb-12">
                    <h2 className="text-2xl md:text-4xl  font-extrabold text-gray-900 bg-[#EBD96B] inline px-2 py-1">ALL NEW ARRIVALS</h2>
                    <p className="text-gray-60 font-semibold mt-2">Check out all the latest products</p>
                </div>
                {/* All products grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    {visibleProducts.map((product) => (
                        <div className="bg-white  shadow-md hover:shadow-xl" key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <div

                                    className="overflow-hidden  transition-shadow duration-300"
                                >
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="p-4 flex flex-col items-center">
                                        <h3 className="md:text-lg font-semibold text-gray-900">{product.name}</h3>
                                        <p className="text-gray-600 font-semibold ">Tk {product.price}</p>

                                    </div>
                                </div>
                            </Link>
                            <div className="flex justify-center">
                                <button onClick={() => {
                                    addToCart(product)
                                }} disabled={isPending} className="ml-2 mb-2 text-sm hover:bg-gray-800 bg-black text-white px-2 md:px-4 font-bold py-2 rounded cursor-pointer   transition">
                                    {isPending ? "Adding..." : "Add to Cart"}
                                </button>

                            </div>
                        </div>

                    ))}
                </div>
            </div>
            {
                visibleCount < products.length && (
                    <div className="flex justify-center mt-6">
                        <button className="font-medium flex gap-2 items-center cursor-pointer"
                            onClick={() => setVisibleCount(prev => prev + 12)}
                        >
                            See More
                            <FaArrowRight />
                        </button>
                    </div>
                )
            }
        </section>

    )
}
