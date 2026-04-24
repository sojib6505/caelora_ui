import { Link, useLocation, useNavigate } from "react-router";
import UseAxios from "../../hook/UseAxios";
import { useEffect, useState } from "react";
import UseCart from "../../hook/UseCart";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

export default function PaymentPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const navigate = useNavigate();

  const id = query.get("id");
  const type = query.get("type");

  const axiosSecure = UseAxios();
  const { cart, isLoading } = UseCart();

  const { register, watch, handleSubmit, reset } = useForm();

  const [singleProduct, setSingleProduct] = useState(null);
  const [showBkash, setShowBkash] = useState(false);

  const division = watch("division");
  const payment = watch("paymentMethod");

  // DELIVERY CHARGE
  const deliveryCharge =
    division === "dhaka" ? 70 : division ? 130 : 0;

  // FETCH SINGLE PRODUCT
  useEffect(() => {
    const load = async () => {
      if (type === "single" && id) {
        const res = await axiosSecure.get(`/products/${id}`);
        setSingleProduct(res.data);
      }
    };
    load();
  }, [id, type, axiosSecure]);

  // BKASH POPUP
  useEffect(() => {
    if (payment === "bkash") {
      setShowBkash(true);
    }
  }, [payment]);

  // PRODUCT LIST
  const productList =
    type === "cart" ? cart : singleProduct ? [singleProduct] : [];

  // TOTAL
  const productTotal = productList?.reduce((acc, item) => {
    return acc + (Number(item.price) || 0);
  }, 0);

  const totalPrice = productTotal + deliveryCharge;

  //  ORDER FUNCTION
  const onSubmit = async (formData) => {
    try {
      const items = productList.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        image: item.image || item.images,
      }));

      const orderData = {
        items,
        orderType: type,
        totalAmount: totalPrice,
        customer: formData,
        paymentMethod: payment,
        paymentStatus: payment === "cash" ? "unpaid" : "pending",
        status: "pending",
        createdAt: new Date(),
      };

      //  ORDER CREATE
      const res = await axiosSecure.post("/orders", orderData);

      console.log("ORDER SUCCESS:", res.data);

      //  ONLY CART  delete
      if (type === "cart") {
        await axiosSecure.delete("/cart");
      }

      //  SUCCESS ALERT
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Order placed successfully",
        showConfirmButton: false,
        timer: 1500
      });

      //  navigate
      navigate("/");

      reset();

    } catch (error) {
      console.error("ORDER ERROR:", error);
    }
  };

  return (
   <>
   <ScrollToTop/>
    <div className="max-w-6xl mx-auto p-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT SIDE */}
        <div className=" rounded-lg shadow-lg p-4 space-y-3">

          <h2 className="text-xl font-bold">Your Products</h2>

          {isLoading ? (
            <Loader/>
          ) : productList?.length > 0 ? (
            productList.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 border-b pb-2"
              >
                <img
                  src={item.image || item.images}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-blue-600 font-medium">
                    {item.price}৳
                  </p>
                </div>

               
              </div>
            ))
          ) : (
            <p>No product found</p>
          )}

          {/* TOTAL */}
          <div className="bg-gray-100 p-3 rounded mt-4 space-y-1 font-medium text-black">
            <p>Subtotal: <b>{productTotal}৳</b></p>
            <p>Delivery: <b>{deliveryCharge}৳</b></p>
            <hr />
            <p className="text-lg font-bold">
              Total: {totalPrice}৳
            </p>
          </div>

        </div>

        {/* RIGHT SIDE FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow-lg rounded-lg p-4 space-y-3 font-medium"
        >

          <h2 className="text-xl font-bold">Checkout</h2>

          <input {...register("name")} placeholder="Full Name" className="input w-full" />
          <input {...register("email")} placeholder="Email" className="input w-full" required />
          <input {...register("phone")} placeholder="Phone" className="input w-full" required />

          {/* <input {...register("color")} placeholder="Color" className="input w-full" /> */}
          <input {...register("size")} placeholder="Size" className="input w-full" />

          <select {...register("division")} className="input w-full">
            <option value="">Select Division</option>
            <option value="dhaka">Dhaka</option>
            <option value="chattogram">Chattogram</option>
            <option value="rajshahi">Rajshahi</option>
            <option value="khulna">Khulna</option>
            <option value="barishal">Barishal</option>
            <option value="sylhet">Sylhet</option>
            <option value="rangpur">Rangpur</option>
            <option value="mymensingh">Mymensingh</option>
          </select>

          <textarea {...register("address")} placeholder="Address" className="input w-full" required />

          {/* PAYMENT */}
          <label className="flex gap-2">
            <input type="radio" value="cash" {...register("paymentMethod")} />
            Cash on Delivery
          </label>

          {/* <label className="flex gap-2">
            <input type="radio" value="bkash" {...register("paymentMethod")} />
            bKash Payment
          </label> */}

          {payment === "cash" && (
            <div className="bg-green-100 p-2 rounded text-black">
              ✔ Cash Selected
              <p>Total: {totalPrice}৳</p>
            </div>
          )}

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Place Order ({totalPrice}৳)
          </button>

        </form>

      </div>

      {/* BKASH POPUP */}
      {showBkash && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded text-center">

            <h2 className="font-bold">bKash Payment</h2>

            <p>Send money to: 01XXXXXXXXX</p>

            <button
              onClick={() => setShowBkash(false)}
              className="bg-blue-600 text-white px-4 py-1 mt-3"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
   </>
  );
}