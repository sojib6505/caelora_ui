import { useQueryClient, useMutation } from "@tanstack/react-query";
import useAxios from "./UseAxios";
import Swal from "sweetalert2";
import UseAuth from "./UseAuth";

export default function UseAddToCart() {
    const axiosSecure = useAxios()
    const { user } = UseAuth()
     const queryClient = useQueryClient();
    //add to card in backend
    const {
        mutate,
        isPending,
    } = useMutation({
        mutationFn: async (product) => {
            const cartItem = {
                userEmail: user.email,
                productId: product._id,
                name: product.name,
                image: product.images[0],
                price: product.price,
                quantity: 1
            }
            const res = await axiosSecure.post("/cart", cartItem);
            return res.data;
        },
        onSuccess: (data) => {
            console.log(data)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your product has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
    });
    const addToCart = (product) => {
        if (!user) {
            alert("plese Login first")
            return;
        }
        mutate(product)
    }
    return {addToCart, isPending}
}

