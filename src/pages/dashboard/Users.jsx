import useAxios from "../../hook/UseAxios";
import Swal from "sweetalert2";
import useUsers from "../../hook/UseUsers";
import Loader from "../../components/loader/Loader";


export default function Users() {
  const { users, isLoading, refetch } = useUsers();
  const axiosSecure = useAxios();

//   const handleMakeAdmin = async (id) => {
//     try {
//       await axiosSecure.patch(`/users/admin/${id}`);
//       Swal.fire("Success!", "User is now admin", "success");
//       refetch();
//     } catch {
//       Swal.fire("Error!", "Something went wrong", "error");
//     }
//   };

  if (isLoading) return <Loader/>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="table w-full">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="font-medium text-black ">
            {users.map((user, i) => (
              <tr key={user._id} >
                <td>{i + 1}</td>
                <td>{user.email}</td>

                <td>
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold">
                      Admin
                    </span>
                  ) : (
                    "User"
                  )}
                </td>

                <td>
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-sm text-black cursor-pointer"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}