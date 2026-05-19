import axios from "axios";

const API_BASE_URL = "https://bookmypackers-backend.onrender.com/api";

export async function resetQuotaWebhook(webhookId) {
  const response = await axios.post(`${API_BASE_URL}/webhook/reset-quota`, {
    webhookId,
  });

  return response.data;
}
