import { useState, useEffect } from "react";
import UseAuth from "./UseAuth";
import useAxios from "./UseAxios";
import Swal from "sweetalert2";

export default function UseUserData() {
  const { user, loading } = UseAuth();
  const axiosSecure = useAxios();

  const [userData, setUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  //  reusable function 
  const fetchUserData = async () => {
    if (!user?.email) {
      setUserLoading(false);
      return;
    }

    setUserLoading(true);

    try {
      const res = await axiosSecure.get(`/users/${user.email}`);
      if (res.data) {
        setUserData(res.data);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load user data", "error");
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.email]);

  return {
    userData,
    userLoading, 
    updateUserData: fetchUserData, 
  };
}