import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Userlist from "./Components/Userlist/Userlist";
import Userview from "./Components/Userview/Userview";
import PermissionsList from "./Components/Permissions/PermissionsList";
import UserForm from "./Components/User/UserForm";
import Login from "./Components/Login/Login";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route index element={<Userlist />} />
          <Route path={"/:type"} element={<UserForm />} />
          <Route path={`/comp/userview/:userId`} element={<Userview />} />
          <Route path="/comp/permissions" element={<PermissionsList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
