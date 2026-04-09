import { useQuery } from "@tanstack/react-query";
import useAxios from "./UseAxios";
import UseAuth from "./UseAuth";

export default function useUsers() {
  const axiosSecure = useAxios();
  const {user} = UseAuth();
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users",{
        headers: {
            Authorization: `Bearer ${user.accessToken}`,
        }
      });
      return res.data;
    },
  });

  return {
    users,
    isLoading,
    refetch,
  };
}