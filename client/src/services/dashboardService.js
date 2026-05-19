import axios from "axios";

const API_BASE_URL = "https://bookmypackers-backend.onrender.com/api";

export async function getDashboardData() {
  const response = await axios.get(`${API_BASE_URL}/dashboard`);

  return response.data;
}
