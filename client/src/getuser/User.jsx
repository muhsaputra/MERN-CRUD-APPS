import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Error While Fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    await axios
      .delete(`http://localhost:3000/api/delete/user/${id}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== id));
        toast.success(response.data.message, { position: "top-center" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container mx-auto py-10 lg:w-1/2 w-full ">
        <Link to="/add" className="btn mb-5">
          Add User<i className="fa-solid fa-user-plus ml-2"></i>
        </Link>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full rounded-3xl  overflow-hidden">
            {/* head */}
            <thead className="bg-base-300">
              <tr>
                <th>No</th>
                <th>NIM</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>{user.nim}</td>
                    <td>{user.name}</td>
                    <td>{user.address}</td>
                    <td>
                      <div className="flex flex-wrap gap-2 ">
                        <Link
                          to={`/update/${user._id}`}
                          className="btn btn-outline"
                        >
                          Edit <i className="fa-solid fa-user-pen ml-2"></i>
                        </Link>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="btn btn-outline"
                        >
                          Delete <i className="fa-solid fa-trash ml-2"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default User;
