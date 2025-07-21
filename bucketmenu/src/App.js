import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRouter from './Modules/Admin/Router/AdminRouter';
import UserRouter from './Modules/User/Routers/UserRouter';

function App() {
  return (
    <div className="App">
<BrowserRouter>
<Routes>
  <Route path="/admin/*" element={<AdminRouter/>}  />
  <Route path="/*" element={<UserRouter/>} />
  </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
