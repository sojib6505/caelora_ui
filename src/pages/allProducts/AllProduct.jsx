import productData from "../../api/productData"

export default function AllProduct() {
    const productsData = productData
    return (
        <section className="md:py-10 bg-white">
            <div className="max-w-6xl mx-auto px-2 md:px-6">
                <div className="text-start mb-12">
                    <h2 className="text-2xl md:text-4xl  font-extrabold text-gray-900 bg-[#EBD96B] inline px-2 py-1">ALL NEW ARRIVALS</h2>
                    <p className="text-gray-60 font-semibold mt-2">Check out all the latest products</p>
                </div>
                {/* All products grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    {productsData.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white  shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={product.img}
                                alt={product.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4 flex flex-col items-center">
                                <h3 className="md:text-lg font-semibold text-gray-900">{product.name}</h3>
                                <p className="text-gray-600 font-semibold ">Tk {product.price}</p>
                                <button className=" text-sm bg-black text-white px-2 md:px-4 font-bold py-2 rounded hover:bg-gray-800 transition">
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
