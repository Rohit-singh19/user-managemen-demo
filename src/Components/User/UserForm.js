import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Permissionservice } from "../../Services/Permissionservice.ts";
import { Userservice } from "../../Services/Userservice";

let UserForm = () => {
  let navigate = useNavigate();

  const { type } = useParams();
  const [searchParams] = useSearchParams("userId");

  const userId = searchParams.get("userId");

  let [state, setState] = useState({
    loading: false,
    user: {
      name: "",
      username: "",
      email: "",
      role_id: "",
    },
    errorMsg: "",
  });

  const [roleList, setRoleList] = useState([]);

  //   console.log("value : ", value);
  //   console.log("value : ", searchParams.get("userId"));

  useEffect(() => {
    (async () => {
      try {
        let { data } = await Permissionservice.getAllPermissions();
        setRoleList(data);
      } catch (err) {
        console.log(err);
      }
    })();

    // fetch data
    if (userId) {
      async function fetchData() {
        try {
          setState({ ...state, loading: true });
          let response = await Userservice.getUser(userId);
          setState({
            ...state,
            loading: false,
            user: response.data,
          });
        } catch (error) {
          setState({
            ...state,
            loading: false,
            errorMsg: error.message,
          });
        }
      }
      fetchData();
    }
  }, [userId]);

  let updateInput = (e) => {
    setState({
      ...state,
      user: {
        ...state.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  const validateForm = () => {
    const {
      user: { name, username, email, role_id },
    } = state;

    if (!name) {
      setState((prev) => ({ ...prev, errorMsg: "Name is required" }));
      return false;
    }

    if (!username) {
      setState((prev) => ({ ...prev, errorMsg: "Username is required" }));
      return false;
    }

    if (!email) {
      setState((prev) => ({ ...prev, errorMsg: "Email is required" }));
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setState((prev) => ({ ...prev, errorMsg: "Invalid email format" }));
      return false;
    }

    if (!role_id) {
      setState((prev) => ({ ...prev, errorMsg: "Role is required" }));
      return false;
    }
    return true;
  };

  let submitForm = async (e) => {
    e.preventDefault();

    if (!type) return navigate("/");

    try {
      let validate = validateForm();

      if (!validate) return;
    } catch (error) {
      console.log("err::", error);
      setState({ ...state, errorMsg: error.message });
    }

    if (!state.user.role_id)
      return setState((prev) => ({ ...prev, errorMsg: "Role is required" }));

    // { access, name: permissionName }
    let resp = roleList?.find(
      (ele) => ele?.id === parseInt(state.user.role_id)
    );

    let { access, name: permissionName, id } = resp;
    let { role_id, ...other } = state.user;
    let updatedData = {
      ...other,
      access,
      role: permissionName,
      role_id: id,
    };

    if (type === "add") {
      try {
        let response = await Userservice.createUser(updatedData);
        if (response) {
          navigate("/", { replace: true });
        }
      } catch (error) {
        setState({ ...state, errorMsg: error.message });
        // navigate("/comp/userform", { replace: false });
      }
    } else if (type === "edit" && userId) {
      try {
        let response = await Userservice.updateUser(updatedData, userId);
        if (response) {
          navigate("/", { replace: true });
        }
      } catch (error) {
        setState({ ...state, errorMsg: error.message });
        // navigate(`/comp/userupdate/${user.id}`, { replace: false });
      }
    }
  };
  let { user } = state;
  return (
    <div className="container m-auto px-5 py-6">
      <h3
        data-testid="form-title"
        className="text-3xl font-medium leading-tight mb-2"
      >
        {userId ? "Update User Detail" : "Add User"}
      </h3>

      <div className="mx-auto">
        <div className="grid grid-flow-row auto-rows-max">
          <div className="col ">
            {state?.errorMsg && (
              <div
                className="mb-4 rounded-lg bg-red-100 px-6 py-5 text-base text-red-700"
                role="alert"
              >
                {state?.errorMsg}
              </div>
            )}
            <form onSubmit={submitForm}>
              <div className="flex flex-col required:border-red-500 mb-5">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  // required={true}
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
                  // required={true}
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
                  // required={true}
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
                  // required={true}
                  name="role_id"
                  value={user.role_id}
                  onChange={updateInput}
                  placeholder="role"
                >
                  <option value="" selected disabled>
                    select role
                  </option>
                  {roleList?.map((ele, i) => (
                    <option key={`${ele?.name}-${i}`} value={ele?.id}>
                      {ele?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-3 row">
                <div className="col">
                  <input
                    type="submit"
                    className="rounded-full... me-4 bg-cyan-300 h-10  font-bold text-white py-1 px-5"
                    value={userId ? "Update User Detail" : "Add User"}
                  />
                  <Link to="/">
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

export default UserForm;
