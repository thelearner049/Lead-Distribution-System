import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export async function getDashboardData() {
  const response = await axios.get(`${API_BASE_URL}/dashboard`);

  return response.data;
}
