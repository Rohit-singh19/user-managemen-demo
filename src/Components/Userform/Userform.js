import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Permissionservice } from "../../Services/Permissionservice";
import { Userservice } from "../../Services/Userservice";
let Userform = () => {
  let navigate = useNavigate();

  let [state, setState] = useState({
    loading: false,
    user: {
      name: "",
      username: "",
      email: "",
      role: "",
    },
    errorMsg: "",
  });

  const [roleList, setRoleList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await Permissionservice.getAllPermissions();
        setRoleList(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  let updateInput = (e) => {
    setState({
      ...state,
      user: {
        ...state.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  let submitForm = async (e) => {
    e.preventDefault();
    try {
      let response = await Userservice.createUser(state.user);
      if (response) {
        navigate("/comp/userlist", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMsg: error.message });
      navigate("/comp/userform", { replace: false });
    }
  };
  let { user } = state;
  return (
    <div className="container m-auto px-5 py-6">
      <h3 className="text-3xl font-medium leading-tight mb-2">Add User</h3>

      <div className="mx-auto">
        <div className="grid grid-flow-row auto-rows-max">
          <div className="col ">
            <form onSubmit={submitForm}>
              <div className="flex flex-col required:border-red-500 mb-5">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required={true}
                  value={user.name}
                  onChange={updateInput}
                  className="required:border-red-500 enabled:hover:border-gray-400 w-full rounded border-0 bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  placeholder="name"
                />
              </div>
              <div className="flex flex-col required:border-red-500 mb-5">
                <label htmlFor="username">User Name</label>
                <input
                  id="username"
                  type="text"
                  required={true}
                  name="username"
                  value={user.username}
                  onChange={updateInput}
                  className="required:border-red-500 enabled:hover:border-gray-400 w-full rounded border-0 bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  placeholder="username"
                />
              </div>
              <div className="flex flex-col required:border-red-500 mb-5">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  required={true}
                  name="email"
                  value={user.email}
                  onChange={updateInput}
                  className="required:border-red-500 enabled:hover:border-gray-400 w-full rounded border-0 bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  placeholder="email"
                />
              </div>

              <div className="flex flex-col required:border-red-500 mb-5">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  className="required:border-red-500 enabled:hover:border-gray-400 w-full rounded border-0 bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  data-te-select-init
                  required={true}
                  name="role"
                  value={user.role}
                  onChange={updateInput}
                  placeholder="role"
                >
                  {roleList?.map((ele, i) => (
                    <option key={`${ele?.name}-${i}`} value={ele?.name}>
                      {ele?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-3 row">
                <div className="col">
                  <input
                    type="submit"
                    className="rounded-full... me-4 bg-cyan-300 w-40 h-10  font-bold text-white"
                    value="add"
                  />
                  <Link to="/comp/userlist">
                    {" "}
                    <input
                      type="submit"
                      className="rounded-full...me-4 bg-cyan-800 w-40 h-10  font-bold text-white"
                      value="cancel"
                    />
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userform;
