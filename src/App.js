import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import ChangePhoneNumber from "./pages/ChangeNumberPhone";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route
            path="/change-phone-number"
            element={<PrivateRoute Component={ChangePhoneNumber} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
