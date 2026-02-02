const API_BASE = import.meta.env.VITE_API_BASE;

export const getEmployees = async () => {
  const res = await fetch(`${API_BASE}/employees/`);
  return res.json();
};

export const addEmployee = async (data) => {
  const res = await fetch(`${API_BASE}/employees/add/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteEmployee = async (id) => {
  const res = await fetch(`${API_BASE}/employees/${id}/`, {
    method: "DELETE",
  });
  return res.json();
};

export const markAttendance = async (data) => {
  const res = await fetch(`${API_BASE}/attendance/mark/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getAttendance = async (id) => {
  const res = await fetch(`${API_BASE}/attendance/${id}/`);
  return res.json();
};

export const getDashboardCounts = async () => {
  const res = await fetch(`${API_BASE}/dashboard/counts/`);
  return res.json();
};

export const getRecentEmployees = async () => {
  const res = await fetch(`${API_BASE}/employees/recent/`);
  return res.json();
};
