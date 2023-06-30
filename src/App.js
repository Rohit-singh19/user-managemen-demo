import "./App.css";
import Navbar from "./Navbar/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Userform from "./Components/Userform/Userform";
import Userlist from "./Components/Userlist/Userlist";
import Userupdate from "./Components/Userupdate/Userupdate";
import Userview from "./Components/Userview/Userview";
import ListDemo from "./demo/ListDemo";
import PermissionScreen from "./demo/PermissionScreen";
import PermissionsList from "./Components/Permissions/PermissionsList";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={`/`} element={<Navigate to={"/comp/userlist"} />} />
        <Route path={"/comp/userform"} element={<Userform />} />
        <Route path={"/comp/userlist"} element={<Userlist />} />
        <Route path={`/comp/userview/:userId`} element={<Userview />} />
        <Route path={`/comp/userupdate/:userId`} element={<Userupdate />} />

        <Route path="/comp/permissions" element={<PermissionsList />} />

        {/* <Route path={`/comp/new`} element={<ListDemo />} />
        <Route path={`/comp/new-per`} element={<PermissionScreen />} /> */}
      </Routes>
    </>
  );
}

export default App;
