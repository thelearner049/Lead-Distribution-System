import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export async function createLead(leadData) {
  const response = await axios.post(`${API_BASE_URL}/leads`, leadData);

  return response.data;
}
