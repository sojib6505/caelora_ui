import { Link, useNavigate } from "react-router"
import { useQuery } from "@tanstack/react-query"
import useAxios from "../../hook/UseAxios"
import { FaArrowRight } from "react-icons/fa";
import Loader from "../loader/Loader";


export default function NewArrivals() {
    const axiosSecure = useAxios();
    const navigate = useNavigate();
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
    if (isLoading) {
        return (
           <Loader/>
        );
    }

    if (isError) {
        return (
            <div className="text-red-500 text-center mt-10">
                {error.message}
            </div>
        );
    }
    return (
        <section className="py-5 md:py-10 bg-white">
            <div className="max-w-6xl mx-auto px-2 md:px-6">
                <div className="text-start mb-12">
                    <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 ">NEW ARRIVAL</h2>
                    <p className="text-gray-600 font-semibold mt-2">Discover the latest trends and styles</p>
                </div>

                {/* Preview 4 products */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
                    {products?.slice(0, 4)?.map((product) => (
                        <Link to={`/product/${product._id}`} key={product._id}>
                            <div className="bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">

                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-64 object-cover"
                                />

                                <div className="p-4 flex flex-col items-center">
                                    <h3 className="md:text-lg font-semibold text-gray-900">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 font-semibold ">
                                        Tk {product.price}
                                    </p>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>

                {/* See More button */}
                <div className="text-center flex justify-end mt-8">
                    <button
                        onClick={() => navigate("/all_products")}
                        className="  font-bold flex gap-2 items-center cursor-pointer text-gray-600"
                    >
                        See More
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </section>
    )
}
