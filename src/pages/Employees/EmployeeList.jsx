// import { useEffect, useState } from "react";
// import { getEmployees, deleteEmployee } from "../../services/api";
// import Loader from "../../components/Loader";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadEmployees();
//   }, []);

//   const loadEmployees = async () => {
//     setLoading(true);
//     const data = await getEmployees();
//     setEmployees(data);
//     setLoading(false);
//   };

//   const handleDelete = async (id) => {
//     await deleteEmployee(id);
//     loadEmployees();
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="container">
//       <h2>Employees</h2>

//       {employees.length === 0 ? (
//         <p>No employees found.</p>
//       ) : (
//         employees.map((emp) => (
//           <div key={emp.employee_id} className="card">
//             <h2>Emp-Id: {emp.employee_id}</h2>
//             <h3>Name: {emp.full_name}</h3>
//             <p>Email: {emp.email}</p>
//             <p>Department: {emp.department}</p>
//             <button
//               className="danger"
//               onClick={() => handleDelete(emp.employee_id)}
//             >
//               Delete
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default EmployeeList;










import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../../services/api";
import Loader from "../../components/Loader";
import "./EmployeeList.css"; // <-- new CSS file

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    const data = await getEmployees();
    setEmployees(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h2>Employees</h2>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="employee-grid">
          {employees.map((emp) => (
            <div key={emp.employee_id} className="card employee-card">
              <h3>Emp-ID: {emp.employee_id}</h3>
              <p><strong>Name:</strong> {emp.full_name}</p>
              <p><strong>Email:</strong> {emp.email}</p>
              <p><strong>Department:</strong> {emp.department}</p>

              <button
                className="danger"
                onClick={() => handleDelete(emp.employee_id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
