import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Userservice } from "../../Services/Userservice";

let Userview = () => {
  let { userId } = useParams();
  let [state, setState] = useState({
    loading: false,
    user: [],
    errorMsg: "",
  });
  useEffect(() => {
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
  }, [userId]);

  let { user } = state;
  return (
    <div className="container m-auto px-5 py-6">
      <h3 className="text-3xl font-medium leading-tight mb-2">
        VIEW USER DETAIL
      </h3>
      <div className="container mx-auto">
        <div className="grid grid-flow-row auto-rows-max">
          <div className="col w-62">
            <ul className="list-disc list-none py-1 bg-sky-700 w-62 shadow-2xl font-[Poppins] text-white  w-6/12">
              <li className="mt-3 ms-3">
                ID: <span className="ms-3 font-bold">{user.id}</span>
              </li>
              <li className="mt-3 ms-3">
                NAME: <span className="ms-3 font-bold">{user.name}</span>
              </li>
              <li className="mt-3 ms-3">
                USERNAME:{" "}
                <span className="ms-3 font-bold">{user.username}</span>
              </li>
              <li className="mt-3 ms-3">
                EMAIL: <span className="ms-3 font-bold">{user.email}</span>
              </li>
              <li className="mt-3 ms-3">
                ROLE: <span className="ms-3 font-bold">{user.role}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <Link to="/comp/userlist">
          <input
            type="submit"
            className="rounded-r-full... bg-gray-300 w-40  h-10 mt-4 font-bold text-white"
            value="back"
          />
        </Link>
      </div>
    </div>
  );
};

export default Userview;
