import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmployeeList from "./pages/Employees/EmployeeList";
import AddEmployee from "./pages/Employees/AddEmployee";
import MarkAttendance from "./pages/Attendance/MarkAttendance";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/attendance" element={<MarkAttendance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
