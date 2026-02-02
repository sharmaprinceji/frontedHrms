// import { useState } from "react";
// import { addEmployee } from "../../services/api";

// const AddEmployee = () => {
//   const [form, setForm] = useState({
//     employee_id: "",
//     full_name: "",
//     email: "",
//     department: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await addEmployee(form);
//     alert("Employee added");
//   };

//   return (
//     <div className="container">
//       <h2>Add Employee</h2>
//       <div className="card">
//         <input name="employee_id" placeholder="Employee ID" onChange={handleChange} />
//         <input name="full_name" placeholder="Full Name" onChange={handleChange} />
//         <input name="email" placeholder="Email" onChange={handleChange} />
//         <input name="department" placeholder="Department" onChange={handleChange} />

//         <button className="primary" onClick={handleSubmit}>
//           Add Employee
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;

import { useState, useEffect } from "react";
import { addEmployee, getEmployees } from "../../services/api";

const AddEmployee = () => {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Load existing employees to check duplicates
    const loadEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    loadEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ===== CLIENT-SIDE VALIDATIONS =====

    // 1. Required fields
    if (
      !form.employee_id ||
      !form.full_name ||
      !form.email ||
      !form.department
    ) {
      setError("All fields are required.");
      return;
    }

    // 2. Email format validation
    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // 3. Check duplicate Employee ID
    const duplicateId = employees.find(
      (emp) => emp.employee_id === form.employee_id
    );

    if (duplicateId) {
      setError("Employee ID already exists.");
      return;
    }

    // 4. Check duplicate Email
    const duplicateEmail = employees.find(
      (emp) => emp.email === form.email
    );

    if (duplicateEmail) {
      setError("Email already exists for another employee.");
      return;
    }

    try {
      await addEmployee(form);
      setSuccess("Employee added successfully.");

      // Clear form
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });

      // Refresh employee list for future validation
      const updated = await getEmployees();
      setEmployees(updated);
    } catch (err) {
      setError("Failed to add employee. Try again.");
    }
  };

  return (
    <div className="container">
      <h2>Add Employee</h2>

      <div className="card">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <input
          name="employee_id"
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={handleChange}
        />

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />

        <button className="primary" onClick={handleSubmit}>
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
