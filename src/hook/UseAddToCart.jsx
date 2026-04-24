import { useQueryClient, useMutation } from "@tanstack/react-query";
import useAxios from "./UseAxios";
import Swal from "sweetalert2";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router";

export default function UseAddToCart() {
    const axiosSecure = useAxios()
    const { user } = UseAuth()
     const queryClient = useQueryClient();
     const navigate = useNavigate();
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
                images: product.images[0],
                price: product.price,
                quantity: 1
            }
            const res = await axiosSecure.post("/cart", cartItem);
            return res.data;
        },
        onSuccess: (data) => {
            console.log(data)
            Swal.fire({
                position: "center",
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
            navigate('/auth/sign_in')
            return;
        }
        mutate(product)
    }
    return {addToCart, isPending}
}

