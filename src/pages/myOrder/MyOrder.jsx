import { useEffect, useState } from "react";
import UseAxios from "../../hook/UseAxios";
import { Link } from "react-router";


export default function MyOrders() {
  const axiosSecure = UseAxios();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await axiosSecure.get("/my-orders");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [axiosSecure]);

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">

      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className="mx-auto">
            <p>No orders found</p>
            <Link to="/" className="btn">Please Explore and Order</Link>
        </div>
      ) : (
        <div className="space-y-4">

          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 space-y-2"
            >

              <div className="flex justify-between">
                <p className="font-medium">
                  Order ID: {order._id.slice(-6)}
                </p>

                <p className="text-sm text-gray-500 font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* ITEMS */}
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">

                    <img
                      src={item.image}
                      className="w-14 h-14 rounded object-cover"
                    />

                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-blue-600 font-medium">{item.price}৳</p>
                    </div>

                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="flex justify-between mt-2 font-medium">
                <p>Total:</p>
                <p className="font-bold">{order.totalAmount}৳</p>
              </div>

              {/* STATUS */}
              <div className="flex justify-between text-sm font-medium">

                <p>
                  Payment:{" "}
                  <span className="font-medium">
                    {order.paymentStatus}
                  </span>
                </p>

                <p>
                  Status:{" "}
                  <span className="font-medium text-green-600 ">
                    {order.status}
                  </span>
                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}