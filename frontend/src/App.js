import "./App.css";
import Login from "./components/Login";
import Signin from "./components/Signin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./Usercontext";
import ProtectedRoute from "./components/ProtectedRoute";
import Decision from "./components/Decision";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div>
      <UserContextProvider>
        {/* <Router> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/decision" element={<Decision />} />
          </Route>
        </Routes>
        {/* </Router> */}
      </UserContextProvider>
    </div>
  );
}

export default App;
