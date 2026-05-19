import axios from "axios";

const API_BASE_URL = "https://bookmypackers-backend.onrender.com/api";

export async function createLead(leadData) {
  const response = await axios.post(`${API_BASE_URL}/leads`, leadData);

  return response.data;
}
