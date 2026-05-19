import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export async function resetQuotaWebhook(webhookId) {
  const response = await axios.post(`${API_BASE_URL}/webhook/reset-quota`, {
    webhookId,
  });

  return response.data;
}
