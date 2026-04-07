import { useNavigate } from "react-router"
import productData from "../../api/productData"

const productsData = productData
export default function NewArrivals() {
    const navigate = useNavigate()
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-start mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 ">NEW ARRIVAL</h2>
                    <p className="text-gray-600 font-semibold mt-2">Discover the latest trends and styles</p>
                </div>

                {/* Preview 3 products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {productsData.slice(0, 3).map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={product.img}
                                alt={product.name}
                                className="w-full h-70 object-center "
                            />
                            <div className="p-4 flex flex-col items-center">
                                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                <p className="text-gray-600 font-semibold mt-1">Tk {product.price}</p>
                            </div>
                        </div>
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
