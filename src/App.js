import "./App.css";
import Navbar from "./Navbar/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Userlist from "./Components/Userlist/Userlist";
import Userview from "./Components/Userview/Userview";
import PermissionsList from "./Components/Permissions/PermissionsList";
import UserForm from "./Components/User/UserForm";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Userlist />} />
        <Route path={"/:type"} element={<UserForm />} />
        <Route path={`/comp/userview/:userId`} element={<Userview />} />
        <Route path="/comp/permissions" element={<PermissionsList />} />
      </Routes>
    </>
  );
}

export default App;
