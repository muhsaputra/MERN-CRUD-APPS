import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function AddUser() {
  const users = {
    nim: "",
    name: "",
    address: "",
  };

  const [user, setUser] = useState(users);

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/api/user", user)
      .then((response) => {
        toast.success(response.data.message, { position: "top-center" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container min-h-screen  mx-auto mt-28  ">
        <form action="" onSubmit={submitForm}>
          <h3 className="text-3xl font-bold mb-5 text-center">Add New User</h3>

          <div className=" flex items-center justify-center w-full">
            <div className="flex-col">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">NIM</span>
                </div>
                <input
                  type="text"
                  id="nim"
                  name="nim"
                  onChange={inputHandler}
                  placeholder="Masuka Nim Anda"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Nama</span>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={inputHandler}
                  placeholder="Masukan Nama Anda"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Alamat</span>
                </div>
                <input
                  id="address"
                  onChange={inputHandler}
                  type="text"
                  name="address"
                  placeholder="Masukan Alamat Anda"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <div className="flex justify-center gap-5">
                <button className="btn mb-5 mt-5" type="submit">
                  Kirim <i class="fa-solid fa-paper-plane"></i>
                </button>
                <Link to="/" className="btn mb-5 mt-5">
                  Kembali <i class="fa-solid fa-arrow-rotate-left"></i>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddUser;
