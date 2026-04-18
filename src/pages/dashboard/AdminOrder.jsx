import { useEffect, useState } from "react";
import UseAxios from "../../hook/UseAxios";
import Swal from "sweetalert2";

export default function AdminOrder() {
    const axiosSecure = UseAxios();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // LOAD ORDERS
    const loadOrders = async () => {
        try {
            setLoading(true);
            const res = await axiosSecure.get("/orders");
            setOrders(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    // UPDATE ORDER STATUS
    const updateStatus = async (id, status) => {
        await axiosSecure.patch(`/orders/${id}`, { status });
        Swal.fire("Updated!", "Order status updated", "success");
        loadOrders();
    };

    // UPDATE PAYMENT STATUS
    const updatePayment = async (id, paymentStatus) => {
        await axiosSecure.patch(`/orders/${id}`, { paymentStatus });
        Swal.fire("Updated!", "Payment status updated", "success");
        loadOrders();
    };

    // DELETE ORDER
    const deleteOrder = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This order will be deleted!",
            icon: "warning",
            showCancelButton: true,
        });

        if (confirm.isConfirmed) {
            await axiosSecure.delete(`/orders/${id}`);
            Swal.fire("Deleted!", "Order removed", "success");
            loadOrders();
        }
    };

    if (loading) return <p className="p-5">Loading orders...</p>;

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-5">📦 Admin Orders</h2>

            <div className="overflow-x-auto border rounded-lg">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Products</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Payment</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-t align-top font-medium">

                                {/* CUSTOMER */}
                                <td className="p-3">
                                    <p className="font-semibold">{order.customer?.name}</p>
                                    <p className="text-gray-500 text-xs">
                                        {order.customer?.phone}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        {order.customer?.address}
                                    </p>
                                </td>

                                {/* PRODUCTS */}
                                <td className="p-3 space-y-2 font-medium">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <img
                                                src={item.image}
                                                className="w-10 h-10 rounded object-cover"
                                            />
                                            <div>
                                                <p>{item.name}</p>
                                                <p>{order.customer.color}</p>
                                                <p>{order.customer.size}</p>
                                            </div>
                                        </div>
                                    ))}
                                </td>

                                {/* TOTAL */}
                                <td className="p-3 font-bold text-blue-600">
                                    {order.totalAmount}৳
                                </td>

                                {/* PAYMENT */}
                                <td className="p-3">
                                    <p className="capitalize">{order.paymentMethod}</p>
                                    <p
                                        className={`text-xs mt-1 px-2 py-1 rounded inline-block ${order.paymentStatus === "paid"
                                            ? "bg-green-100 text-green-600"
                                            : order.paymentStatus === "pending"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {order.paymentStatus}
                                    </p>
                                </td>

                                {/* STATUS */}
                                <td className="p-3">
                                    <span className="text-sm font-medium capitalize">
                                        {order.status}
                                    </span>
                                </td>

                                {/* ACTIONS */}
                                <td className="p-3 space-y-2 font-medium">

                                    <button
                                        onClick={() =>
                                            updateStatus(order._id, "processing")
                                        }
                                        className="bg-yellow-500 text-white px-2 py-1 rounded text-xs w-full"
                                    >
                                        Processing
                                    </button>

                                    <button
                                        onClick={() =>
                                            updateStatus(order._id, "delivered")
                                        }
                                        className="bg-green-600 text-white px-2 py-1 rounded text-xs w-full"
                                    >
                                        Delivered
                                    </button>

                                    <button
                                        onClick={() =>
                                            updatePayment(order._id, "paid")
                                        }
                                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs w-full"
                                    >
                                        Mark Paid
                                    </button>

                                    <button
                                        onClick={() => deleteOrder(order._id)}
                                        className="bg-red-600 text-white px-2 py-1 rounded text-xs w-full"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {orders.length === 0 && (
                <p className="text-center mt-5 text-gray-500">
                    No orders found
                </p>
            )}
        </div>
    );
}