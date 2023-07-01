import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { Userservice } from "../../Services/Userservice";
import { Permissionservice } from "../../Services/Permissionservice.ts";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    errorMsg: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { setUserDetail, setPermissionInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let { username, password } = formData;

    if (!username.trim()) {
      setIsLoading(false);
      return setFormData((prev) => ({
        ...prev,
        errorMsg: "User name is required",
      }));
    }

    if (!password.trim()) {
      setIsLoading(false);
      return setFormData((prev) => ({
        ...prev,
        errorMsg: "Password is required",
      }));
    }

    // check in db is this user exists or not (currently not verifying the password)

    try {
      let isExist = await Userservice.checkUserExists(username);

      if (!isExist) {
        setIsLoading(false);
        return setFormData((prev) => ({
          ...prev,
          errorMsg: `${prev?.username} does not exists!`,
        }));
      }
      // set user detail in context
      setUserDetail(isExist);

      if (isExist?.role_id) {
        // fetch permission detial
        let resp = await Permissionservice.fetchPermissionDetail(
          isExist?.role_id
        );

        console.log(isExist);
        if (resp) {
          setPermissionInfo(resp);
          navigate("/");
          setIsLoading(false);
          return;
        }

        setPermissionInfo({});
        navigate("/");
        setIsLoading(false);
      } else {
        setFormData((prev) => ({
          ...prev,
          errorMsg:
            "Your prmission has been removed! \n So, you can't login. Please contact 'Super Admin'",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  console.log(formData, isLoading);

  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between m-auto">
          <div
            className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12"
            style={{
              maxWidth: "400",
            }}
          >
            <img
              src={require("../../assets/login-banner.jpg")}
              className="w-200"
              alt="login-banner"
            />
          </div>

          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            {formData?.errorMsg && (
              <div
                className="mb-4 rounded-lg bg-red-100 px-6 py-5 text-base text-red-700"
                role="alert"
              >
                {formData?.errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col required:border-red-500 mb-5">
                <label htmlFor="name">User Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData?.username}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  className="required:border-red-500 enabled:hover:border-gray-400 w-full rounded border-0 bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  placeholder="name"
                />
              </div>

              <div className="flex flex-col required:border-red-500 mb-5">
                <label htmlFor="name">Password</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData?.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="required:border-red-500 enabled:hover:border-gray-400 w-full rounded border-0 bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  placeholder="name"
                />
              </div>

              <button
                type="submit"
                className=" disabled:bg-gray inline-block w-full rounded bg-sky-700 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                disabled={isLoading}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
