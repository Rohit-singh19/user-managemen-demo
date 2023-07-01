import { useState, useEffect } from "react";
import { Permissionservice } from "../../Services/Permissionservice.ts";

const PermissionsList = () => {
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState({
    table: true,
    button: false,
  });

  const [log, setLog] = useState({
    error: "",
    success: "",
  });

  const [newPermission, setNewPermission] = useState({
    name: "",
    description: "",
    access: [],
  });

  async function fetchPermissionList() {
    try {
      setIsLoading((prev) => ({
        ...prev,
        table: true,
      }));
      let { data } = await Permissionservice.getAllPermissions();

      setPermissions(data);
      setIsLoading((prev) => ({
        ...prev,
        table: false,
      }));
    } catch (err) {
      alert("something went wrong!!");
      setIsLoading((prev) => ({
        ...prev,
        table: false,
      }));
    }
  }

  // const addPermission =

  useEffect(() => {
    fetchPermissionList();
  }, []);

  //deletepermission
  let handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        `are you sure want to delete permission #${id}?`
      );
      if (confirmed) {
        await Permissionservice.deletePermission(id);

        setPermissions((prev) => prev.filter((ele) => ele?.id !== id));
      }
    } catch (error) {
      setLog({
        error: "Can't delete the permission",
      });
    }
  };

  // add permission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPermission?.name?.trim() || !newPermission?.description?.trim()) {
      if (!newPermission?.name?.trim() && !newPermission?.description?.trim()) {
        setLog({
          error: "name and description is required!",
        });
        return;
      }
      if (!newPermission?.name?.trim())
        return setLog({
          error: "name is required!",
        });

      if (!newPermission?.description?.trim())
        return setLog({
          error: "description is required!",
        });
    }

    setIsLoading((prev) => ({
      ...prev,
      button: true,
    }));
    try {
      if (newPermission?.id) {
        let { id, ...others } = newPermission;
        let { data } = await Permissionservice.updatePermission(others, id);
        setPermissions((prev) =>
          prev.map((ele) =>
            ele?.id === id
              ? {
                  id,
                  name: data?.name,
                  description: data?.description,
                }
              : ele
          )
        );
        setLog({
          success: "Successfully updated permissions",
        });
      } else {
        let { data } = await Permissionservice.createPermission(newPermission);
        setPermissions((prev) => [
          ...prev,
          { id: data?.id, name: data?.name, description: data?.description },
        ]);
        setLog({
          success: "Successfully created permissions",
        });
      }

      setNewPermission({
        name: "",
        description: "",
        access: [],
      });

      setIsLoading((prev) => ({
        ...prev,
        button: false,
      }));
    } catch (err) {
      console.log(err);
      setLog({
        error: err.message || "",
      });
      setIsLoading((prev) => ({
        ...prev,
        button: false,
      }));
    }
  };

  return (
    <div className="container m-auto px-5 py-6">
      <h3 className="text-3xl font-medium leading-tight mb-2">
        Add Permissions
      </h3>

      {/* success */}
      {log?.success && (
        <div
          className="mb-4 rounded-lg bg-green-100 px-6 py-5 text-base text-green-700"
          role="alert"
        >
          {log?.success}
        </div>
      )}

      {/* error */}
      {log?.error && (
        <div
          className="mb-4 rounded-lg bg-red-100 px-6 py-5 text-base text-red-700"
          role="alert"
        >
          {log?.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col required:border-red-500">
          <label htmlFor="permissionName">Permission Name</label>
          <input
            required
            type="text"
            className="required:border-red-500 enabled:hover:border-gray-400 w-full rounded border-0 bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="permissionName"
            placeholder="permission name"
            value={newPermission?.name}
            onChange={(e) =>
              setNewPermission((prev) => ({
                ...prev,
                name: e?.target?.value || "",
              }))
            }
          />
        </div>

        <div className="flex flex-col required:border-red-500">
          <label htmlFor="access">Access</label>
          <select
            required
            className="required:border-red-500 enabled:hover:border-gray-400 w-full rounded border-0 bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="access"
            placeholder="permission name"
            name="access"
            value={newPermission?.access}
            onChange={(event) => {
              const selectedValues = Array.from(
                event.target.selectedOptions,
                (option) => option.value
              );

              setNewPermission((prev) => ({
                ...prev,
                access: selectedValues,
              }));
            }}
            multiple
          >
            <option value="" disabled>
              select permissions
            </option>
            <option value="read">View</option>
            <option value="create">Create</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
        </div>

        <div className="flex flex-col my-5">
          <label htmlFor="description">Description</label>
          <textarea
            className="required:border-red-500 enabled:hover:border-gray-400 w-full rounded border-0 bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="description"
            rows="3"
            placeholder="Your message"
            value={newPermission?.description}
            onChange={(e) =>
              setNewPermission((prev) => ({
                ...prev,
                description: e?.target?.value || "",
              }))
            }
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="inline-block rounded disabled:bg-gray-300  bg-sky-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          disabled={isLoading?.button}
          data-testid="add-role-button"
        >
          {newPermission?.id ? "Update" : "Add"} Permission
        </button>

        <button
          type="button"
          onClick={() =>
            setNewPermission({
              name: "",
              description: "",
            })
          }
          className="inline-block rounded px-6 pb-2 pt-2.5 text-xs ml-2 font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Cancel
        </button>
      </form>

      <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />

      <h3 className="text-3xl font-medium leading-tight">Permissions</h3>

      {/* Table */}
      <div className="flex flex-col overflow-x-auto">
        <div className="">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light table-fixed">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {permissions?.map((ele, index) => (
                    <tr
                      className="border-b dark:border-neutral-500"
                      key={`${ele?.id}-${index}`}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {ele?.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {ele?.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {ele?.description}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        <button
                          onClick={() => {
                            setLog({ success: "", error: "" });
                            setNewPermission({
                              name: ele?.name,
                              description: ele?.description,
                              id: ele?.id,
                            });
                            window.scrollTo({ top: 80, behavior: "smooth" });
                          }}
                        >
                          <i className="fa fa-edit py-3 px-6 text-green-700"></i>
                        </button>
                        <button
                          data-testid={`delete-button-${index}`}
                          onClick={() => handleDelete(ele?.id)}
                        >
                          <i className="fa fa-trash text-red-700"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsList;
