import { useState } from "react";
import { markAttendance, getAttendance } from "../../services/api";
import Loader from "../../components/Loader";

const MarkAttendance = () => {
  const [mode, setMode] = useState("mark"); // "mark" or "view"

  const [markForm, setMarkForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  const [viewEmpId, setViewEmpId] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success,setSuccess] =useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // ===== HELPER: check future date =====
  const isFutureDate = (selectedDate) => {
    if (!selectedDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(selectedDate);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate > today;
  };

  const handleMarkChange = (e) => {
    setMarkForm({ ...markForm, [e.target.name]: e.target.value });
    setError(""); // clear error when user types
  };

  const handleMarkSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ===== VALIDATIONS =====

    if (!markForm.date) {
      setError("Please select a date.");
      return;
    }

    if (isFutureDate(markForm.date)) {
      setError("You cannot mark attendance for a future date.");
      return;
    }

    if (!markForm.employee_id) {
      setError("Employee ID is required.");
      return;
    }

    try {
      // ===== NEW: Check if attendance already exists for same date =====
      const existingRecords = await getAttendance(markForm.employee_id);

      const alreadyMarked = existingRecords.some(
        (rec) => rec.date === markForm.date
      );

      if (alreadyMarked) {
        setError("Attendance already marked for this date.");
        return;
      }

      // If not marked before, proceed
      await markAttendance(markForm);
      setSuccess("Attendance marked successfully");
    //   alert("Attendance marked successfully");

      // Clear form after success
      setMarkForm({
        employee_id: "",
        date: "",
        status: "Present",
      });
    } catch (err) {
      setError("Failed to mark attendance. Please try again.");
    }
  };

  const handleViewAttendance = async () => {
    if (!viewEmpId) {
      setError("Please enter Employee ID to view attendance.");
      return;
    }

    setError("");
    setLoading(true);
    setHasSearched(true);

    try {
      const data = await getAttendance(viewEmpId);
      setRecords(data);
    } catch (err) {
      setError("Failed to fetch attendance records.");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Attendance Management</h2>

      {/* ===== TOGGLE BUTTONS ===== */}
      <div style={{ marginBottom: "15px" }}>
        <button
          className={mode === "mark" ? "primary" : ""}
          onClick={() => setMode("mark")}
          style={{ marginRight: "10px" }}
        >
          Mark Attendance
        </button>

        <button
          className={mode === "view" ? "primary" : ""}
          onClick={() => setMode("view")}
        >
          View Attendance
        </button>
      </div>

      {/* ===== MARK ATTENDANCE SECTION ===== */}
      {mode === "mark" && (
        <div className="card">
          <h3>Mark Attendance</h3>
           {error && <p style={{ color: "red" }}>{error}</p>}
           {success && <p style={{ color: "green" }}>{success}</p>}
          <input
            name="employee_id"
            placeholder="Employee ID"
            value={markForm.employee_id}
            onChange={handleMarkChange}
          />

          <input
            type="date"
            name="date"
            value={markForm.date}
            onChange={handleMarkChange}
          />

          <select
            name="status"
            value={markForm.status}
            onChange={handleMarkChange}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button className="primary" onClick={handleMarkSubmit}>
            Submit Attendance
          </button>
        </div>
      )}

      {/* ===== VIEW ATTENDANCE SECTION ===== */}
      {mode === "view" && (
        <>
          <div className="card">
            <h3>View Attendance</h3>

            <input
              placeholder="Enter Employee ID"
              value={viewEmpId}
              onChange={(e) => setViewEmpId(e.target.value)}
            />

            <button className="primary" onClick={handleViewAttendance}>
              View Records
            </button>
          </div>

          {loading && <Loader />}

          {error && <p style={{ color: "red" }}>{error}</p>}

          {hasSearched && !loading && records.length === 0 && !error && (
            <p>No attendance records found for this employee.</p>
          )}

          {records.length > 0 && (
            <div className="card">
              <h3>Attendance Records for {viewEmpId}</h3>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        borderBottom: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        borderBottom: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: "8px" }}>{rec.date}</td>
                      <td style={{ padding: "8px" }}>{rec.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MarkAttendance;
