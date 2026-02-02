import { useEffect, useState } from "react";
import { getDashboardCounts } from "../../services/api";
import "./Dashboard.css";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    total_employees: 0,
    present_today: 0,
    absent_today: 0,
    date: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);

    try {
      const empData = await getDashboardCounts();
      console.log("Dashboard Counts:", empData);
      setCounts(empData);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }

      setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container">
      <h2>HRMS Dashboard</h2>

      {loading ? (
        <Loader/>
      ) : (
        <div className="card summary-card">

          <div className="summary-top">
            <h3>Total Employees</h3>
            <p className="stat-value">{counts.total_employees}</p>
          </div>

  
          <hr className="summary-divider" />

          <div className="summary-bottom">
            <div className="summary-item present">
              <h3>Present Today</h3>
              <p className="stat-value">{counts.present_today}</p>
            </div>

            <div className="summary-item absent">
              <h3>Absent Today</h3>
              <p className="stat-value">{counts.absent_today}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
