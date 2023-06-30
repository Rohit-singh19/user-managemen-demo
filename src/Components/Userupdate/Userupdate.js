import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Userservice } from "../../Services/Userservice";
function Userupdate() {
  let navigate = useNavigate();
  let { userId } = useParams();

  let [state, setState] = useState({
    loading: false,
    user: {
      name: "",
      username: "",
      email: "",
      role: "",
    },
    errorMessage: "",
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
      let response = await Userservice.updateUser(state.user, userId);
      if (response) {
        navigate("/comp/userlist", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMsg: error.message });
      navigate(`/comp/userupdate/${user.id}`, { replace: false });
    }
  };
  let { user } = state;
  return (
    <>
      <h1 className="font-bold mt-4">UPDATEUSER-FORM</h1>
      <div className="container mx-auto p-4">
        <div className="grid grid-flow-row auto-rows-max">
          <div className="col p-4">
            
                <form onSubmit={submitForm}>
                  <div className="mt-3">
                    <input
                      type="text"
                      name="name"
                      required={true}
                      onChange={updateInput}
                      value={user.name}
                      className="border w-80 text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                      placeholder="name"
                    />
                  </div>
                  <div className="mt-3">
                    <input
                      type="text"
                      name="username"
                      required={true}
                      onChange={updateInput}
                      value={user.username}
                      className="border w-80 text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                      placeholder="username"
                    />
                  </div>
                  <div className="mt-3">
                    <input
                      type="email"
                      name="email"
                      required={true}
                      onChange={updateInput}
                      value={user.email}
                      className="border w-80 text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                      placeholder="email"
                    />
                  </div>

                  <div className="mt-3">
                    <input
                      type="text"
                      name="role"
                      required={true}
                      onChange={updateInput}
                      value={user.role}
                      className="border w-80 text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                      placeholder="role"
                    />
                  </div>
                  <div className="mt-3 row">
                    <div className="col">
                      <input
                        type="submit"
                        className="rounded-full... me-4 bg-cyan-300 w-40 h-10  font-bold text-white"
                        value="update"
                      />
                      <Link to="/comp/userlist">
                        
                        <input
                          type="submit"
                          className="rounded-full...me-4 bg-cyan-800 w-40 h-10  font-bold text-white "
                          value="cancel"
                        />
                      </Link>
                    </div>
                    
                      
                   
                  </div>
                </form>
              </div>
            </div>
         
       
      </div>
    </>
  );
}

export default Userupdate;
