import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>HRMS Lite</h2>
      <div>
        <a href="/">Dashboard</a>
        <a href="/employees">Employees</a>
        <a href="/add-employee">Add-Employees </a>
        <a href="/attendance">Attendance</a>
      </div>
    </nav>
  );
};

export default Navbar;
