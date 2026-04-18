
import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth"
import UseAxios from "./UseAxios";

export default function UseCart() {
   const {user} = UseAuth();
   const axiosSecure = UseAxios()
   const{
     data: cart = [],
     isLoading,
     refetch,
   } = useQuery({
     queryKey: ["cart",user?.email],
     enabled: !!user?.email,
     queryFn: async()=>{
        const res = await axiosSecure.get(`/cart?email=${user.email}`);
        return res.data;
     }
   })
  const cartCount = cart.reduce((total,item)=> total + item.quantity,0);
  return {cart,cartCount,isLoading,refetch,}
    
}
