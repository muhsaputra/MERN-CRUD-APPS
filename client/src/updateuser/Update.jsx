const UpdateUser = () => {
  const generateNim = () => {
    // Generate random number between 100 and 999
    const randomSuffix = Math.floor(Math.random() * 900) + 100;
    return `241091700${randomSuffix}`;
  };

  const users = {
    nim: generateNim(), // Set nim to a constant value with random suffix
    name: "",
    address: "",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:3000/api/update/user/${id}`, user)
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
      <div className="container min-h-screen  mx-auto mt-28">
        <form action="" onSubmit={submitForm}>
          <h3 className="text-3xl font-bold mb-5 text-center">Edit User</h3>
          <div className="flex items-center justify-center w-full">
            <div className="flex-col">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">NIM</span>
                </div>
                <input
                  type="text"
                  id="nim"
                  value={user.nim}
                  name="nim"
                  onChange={inputHandler}
                  placeholder="Masukan NIM Anda"
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
                  value={user.name}
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
                  value={user.address}
                  name="address"
                  placeholder="Masukan Alamat Anda"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <div className="flex justify-center gap-5">
                <button className="btn mb-5 mt-5" type="submit">
                  Kirim <i className="fa-solid fa-paper-plane"></i>
                </button>
                <Link to="/" className="btn mb-5 mt-5">
                  Kembali <i className="fa-solid fa-arrow-rotate-left"></i>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
