// src/components/Users.tsx
import React, { useContext, useState } from "react";
import { UsersContext } from "@/context/UsersContext";

const Users: React.FC = () => {
  const { users, loading } = useContext(UsersContext);
  const [search, setSearch] = useState(""); // state untuk pencarian
  const [currentPage, setCurrentPage] = useState(1); // kalau mau pagination

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  // filter user berdasarkan Username, Email, atau Status
  const filteredUsers = users.filter(
    (user) =>
      user.Username?.toLowerCase().includes(search.toLowerCase()) ||
      user.Email?.toLowerCase().includes(search.toLowerCase()) ||
      user.Status?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-10 md:p-12 pt-24 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <input
            type="text"
            placeholder="Cari pengguna..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset ke page 1
            }}
            className="w-full md:w-3/5 p-3 rounded-lg border bg-white border-blue-400 shadow-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-2xl p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-700">
                {user.Username}
              </h2>
              <p className="text-sm text-gray-500">Email: {user.Email}</p>
              <p className="text-sm text-gray-500">No KTP: {user.No_Ktp}</p>
              <p className="text-sm text-gray-500">Status: {user.Status}</p>
              <p className="text-sm text-gray-500">Role: {user.Role.Role}</p>
              <p className="text-sm text-gray-500">Bio: {user.Bio || "-"}</p>
              <div className="mt-4 flex space-x-2">
                {user.Status === "Banned" ? (
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Aktif
                  </button>
                ) : (
                  <button className="bg-red-500 text-white text-xs px-4 py-2 rounded">
                    Ban
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
