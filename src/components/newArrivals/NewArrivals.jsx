import { Link, useNavigate } from "react-router"
import productData from "../../api/productData"
import { useQuery } from "@tanstack/react-query"
import useAxios from "../../hook/UseAxios"

const productsData = productData
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

    return (
        <section className="py-5 md:py-10 bg-white">
            <div className="max-w-6xl mx-auto px-2 md:px-6">
                <div className="text-start mb-12">
                    <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 ">NEW ARRIVAL</h2>
                    <p className="text-gray-600 font-semibold mt-2">Discover the latest trends and styles</p>
                </div>

                {/* Preview 4 products */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
                    { products.slice(0, 4).map((product) => (
                        <Link to={`/product/${product._id}`}>
                            <div
                            key={product._id}
                            className="bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-70 object-center "
                            />
                            <div className="p-4 flex flex-col items-center">
                                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                <p className="text-gray-600 font-semibold mt-1">Tk {product.price}</p>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>

                {/* See More button */}
                <div className="text-center flex justify-end mt-8">
                    <button
                        onClick={() => navigate("/all_products")}
                        className="bg-black  font-bold text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                    >
                        See More
                    </button>
                </div>
            </div>
        </section>
    )
}
