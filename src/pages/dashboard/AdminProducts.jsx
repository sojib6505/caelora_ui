import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../hook/UseAxios";

export default function AdminProducts() {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  // Fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
   
  });

  // Delete product
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      Swal.fire("Deleted!", "Product deleted successfully", "success");
    },
  });

  const showDetails = (product) => {
    Swal.fire({
      title: `<strong>${product.name}</strong>`,
      html: `
        <p><b>Category:</b> ${product.category || "-"}</p>
        <p><b>Brand:</b> ${product.brand || "-"}</p>
        <p><b>Price:</b> $${product.price}</p>
        <p><b>Sizes:</b> ${product.sizes?.join(", ") || "-"}</p>
        <p><b>Colors:</b> ${product.colors?.join(", ") || "-"}</p>
        <p><b>Material:</b> ${product.material || "-"}</p>
        <p><b>Stock:</b> ${product.stock || "-"}</p>
        <p><b>Description:</b> ${product.description || "-"}</p>
        ${product.images?.length > 0 ? `<p><b>Images:</b></p>${product.images.map((img) => `<img src="${img}" class="w-24 h-24 object-cover mr-2 mb-2"/>`).join("")}` : ""}
      `,
      showCloseButton: true,
      showConfirmButton: false,
      width: "600px",
    });
  };

  if (isLoading) return <p className="p-4 text-center">Loading...</p>;

  const filteredProducts = products.filter((p) =>
   p?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-2xl font-bold">Admin Products</h2>

        <NavLink
          to="/dashboard/add_admin_product"
          className="bg-blue-500 font-medium text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </NavLink>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border font-medium p-2 rounded mb-4 w-full md:w-1/2"
      />

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full font-medium border">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) =>( 
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{p.name}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2 flex gap-2 flex-wrap items-center">
                  <button
                    onClick={() => showDetails(p)}
                    className="bg-blue-500  px-2 py-1 rounded text-white hover:bg-blue-600"
                    title="View Details"
                  >
                   Details
                  </button>

                  <NavLink
                    to={`/dashboard/add_admin_product?id=${p._id}`}
                    className="bg-yellow-500 px-2 py-1 rounded text-white hover:bg-yellow-600"
                  >
                    Edit
                  </NavLink>

                  <button
                    onClick={() => deleteMutation.mutate(p._id)}
                    className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={3} className="p-2 text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}