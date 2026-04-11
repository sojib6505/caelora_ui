import { useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../../hook/UseAxios";
import UseCart from "../../hook/UseCart";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../../hook/UseAuth";

export default function Cart() {
  const { cart } = UseCart();
  const navigate = useNavigate();
  const axiosSecure = UseAxios()
  const queryClient = useQueryClient()
  const {user} = UseAuth()

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You remove product from cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const deleteMutation = useMutation({
    mutationFn: (Id) => axiosSecure.delete(`/cart/${Id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your product has been remove",
        showConfirmButton: false,
        timer: 1500
      });
    }
  })
  //order]
  const handleOrder = () => {
    navigate(`/payment?email=${user?.email}`)
  }
  const total = cart?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-5">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">
        🛒 My Cart
      </h1>

      {cart?.length === 0 ? (
        <div className="text-center py-24 text-gray-500">
          Your cart is empty
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT: ITEMS */}
          <div className="lg:col-span-2 space-y-4">

            {cart?.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition"
              >

                {/* Image */}
                <img
                  src={item.image}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Price: ${item.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-2 font-bold text-green-600">
                    Total: ${item.price * item.quantity}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-4 flex-wrap">

                    {/* View Button */}
                    <button
                      onClick={() =>
                        navigate(`/product/${item.productId}`)
                      }
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View
                    </button>

                    {/* Remove Button */}
                    <button onClick={() => handleDelete(item._id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                      Remove
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT: SUMMARY */}
          <div className="border rounded-xl p-5 h-fit shadow-sm bg-white sticky top-5">

            <h2 className="text-xl font-bold mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 text-gray-600 font-medium">
              <div className="flex justify-between ">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>

              <div className="flex justify-between ">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <hr />

              <div className="flex  justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            {/* PAY BUTTON */}
            <button onClick={handleOrder} className="mt-6 w-full font-medium bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              💳 Order Now
            </button>

            {/* Optional Checkout
            <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
              Checkout
            </button> */}
          </div>

        </div>
      )}
    </div>
  );
}