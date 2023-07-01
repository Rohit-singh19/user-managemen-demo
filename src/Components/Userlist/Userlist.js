import { useEffect, useState } from "react";
import { Userservice } from "../../Services/Userservice";
import { Link } from "react-router-dom";

let Userlist = () => {
  let [currentPage, setCurrentPage] = useState(1);
  let recordsPerPage = 10;

  let [query, setQuery] = useState({
    text: "",
  });

  let [state, setState] = useState({
    loading: false,
    users: [],
    filteredUsers: [],
    errorMsg: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        const response = await Userservice.getAllUsers();

        setState({
          ...state,
          loading: false,
          users: response.data,
          filteredUsers: response.data,
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
  }, []);

  //deleteuser
  let clickDelete = async (userId) => {
    try {
      const confirmed = window.confirm("are you sure want to delete this?");
      if (confirmed) {
        setState({ ...state, loading: true });
        const response = await Userservice.deleteUser(userId);
        if (response) {
          const response = await Userservice.getAllUsers();
          setState({
            ...state,
            loading: false,
            users: response.data,
            filteredUsers: response.data,
          });
        }
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMsg: error.message,
      });
    }
  };

  function searchInTable(query, array) {
    const results = [];

    for (let i = 0; i < array.length; i++) {
      const item = array[i];

      for (let key in item) {
        if (item.hasOwnProperty(key) && typeof item[key] === "string") {
          if (item[key].toLowerCase().includes(query.toLowerCase())) {
            results.push(item);
            break;
          }
        }
      }
    }

    return results;
  }

  //searchfunction

  let searchUser = (e) => {
    let value = e.target.value;

    setQuery({ ...query, text: value });

    if (value?.trim() === "") return;

    const searchResult = searchInTable(value || "", state.users);

    setState({
      ...state,
      filteredUsers: searchResult,
    });
  };

  let { filteredUsers } = state;

  //pagination

  let lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  let records = filteredUsers.slice(firstIndex, lastIndex);
  let nPage = Math.ceil(filteredUsers.length / recordsPerPage);
  let numbers = [...Array(nPage + 1).keys()].slice(1);

  return (
    <>
      <div className="container mx-auto px-10 ">
        <Link to={"/add"}>
          <button className="rounded-r-full... bg-sky-700 w-40 h-10 mt-4 font-bold text-white">
            Add user
          </button>
        </Link>
      </div>
      <div className="container mx-auto mt-5 px-10 ">
        <form className="mb-3 max-w-sm">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="text"
              name="text"
              value={query.text}
              onChange={searchUser}
              className="relative m-0 -mr-0.5 block w-[1px] min-w-0  flex-auto rounded-l border border-solid border-neutral-300  bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="button-addon1"
            />
            <button
              className="relative z-[2] flex items-center rounded-r  bg-sky-700 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="submit"
              value="search"
              id="button-addon1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <div className="container mx-auto mt-5 px-10">
        <div className="grid grid-flow-row auto-rows-max">
          <div className="col">
            <h1 className="fond-bold">Userlist</h1>

            <table className="min-w-full text-center text-sm font-light overflow-x-auto ">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="py-3  ms-2">
                    ID
                  </th>
                  <th scope="col" className="py-3  ms-2">
                    NAME
                  </th>
                  <th scope="col" className="py-3  ms-2">
                    USERNAME
                  </th>
                  <th scope="col" className="py-3  ms-2">
                    EMAIL
                  </th>
                  <th scope="col" className="py-3  ms-2">
                    ROLE
                  </th>
                  <th scope="col" className="py-3  ms-2">
                    VIEW
                  </th>
                  <th scope="col" className="py-3  ms-2">
                    UPDATE
                  </th>
                  <th scope="col" className="py-3  ms-2">
                    DELETE
                  </th>
                </tr>
              </thead>
              {
                <tbody className="text-cyan-900 text-center">
                  {records.map((user) => {
                    return (
                      <tr
                        className="border-b dark:border-neutral-500cursor-pointer duration-300"
                        key={user.id}
                      >
                        <td className="py-3 px-6">{user.id}</td>
                        <td className="py-3 px-6">{user.name}</td>
                        <td className="py-3 px-6">{user.username}</td>
                        <td className="py-3 px-6">{user.email}</td>
                        <td className="py-3 px-6">{user.role}</td>
                        <td className="py-3 px-6">
                          <Link to={`/comp/userview/${user.id}`}>
                            <i className="fa fa-eye me-4 "></i>
                          </Link>
                        </td>
                        <td className="py-3 px-6">
                          <Link to={`/edit?userId=${user.id}`}>
                            <i className="fa fa-edit py-3 px-6 text-green-700"></i>
                          </Link>
                        </td>
                        <td className="py-3 px-6">
                          <button onClick={() => clickDelete(user.id)}>
                            {" "}
                            <i className="fa fa-trash text-red-700"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              }
            </table>
            <nav>
              <div className="container-lg my-5">
                <ul className="flex rounded-lg font-[Poppins] ms-2">
                  <li>
                    <button
                      className="rounded-r-full... bg-red-500 w-36 h-10 mt-4 font-bold text-white"
                      onClick={prePage}
                    >
                      <a href="#">Prev</a>
                    </button>
                  </li>
                  {numbers.map((n, i) => (
                    <li
                      className={`page-item${
                        currentPage === n ? "active" : ""
                      }ms-2`}
                      key={i}
                    >
                      <button
                        className="rounded-r-full... bg-lime-400 w-10 h-10 mt-4 font-bold text-white ms-2"
                        onClick={() => changeCPage(n)}
                      >
                        <a href="#">{n}</a>
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      className="rounded-r-full... bg-red-500 w-36 h-10 mt-4 font-bold text-white ms-3"
                      onClick={nextPage}
                    >
                      <a href="#">Next</a>
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }
};

export default Userlist;
