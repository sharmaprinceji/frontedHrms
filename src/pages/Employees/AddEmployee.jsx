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

    if (
      !form.employee_id ||
      !form.full_name ||
      !form.email ||
      !form.department
    ) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const duplicateId = employees.find(
      (emp) => emp.employee_id === form.employee_id
    );

    if (duplicateId) {
      setError("Employee ID already exists.");
      return;
    }

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

      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
      
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
