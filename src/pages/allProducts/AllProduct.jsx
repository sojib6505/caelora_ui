import productData from "../../api/productData"

export default function AllProduct() {
    const productsData = productData
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-start mb-12">
                    <h2 className="text-4xl  font-extrabold text-gray-900">ALL NEW ARRIVALS</h2>
                    <p className="text-gray-600 font-semibold mt-2">Check out all the latest products</p>
                </div>
                {/* All products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {productsData.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={product.img}
                                alt={product.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4 flex flex-col items-center">
                                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                <p className="text-gray-600 font-semibold mt-1">Tk {product.price}</p>
                                <button className="mt-4 bg-black text-white px-4 font-bold py-2 rounded hover:bg-gray-800 transition">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
