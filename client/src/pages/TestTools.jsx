import { createLead } from "../services/leadService";
import { resetQuotaWebhook } from "../services/webhookService";

const TestTools = () => {
  async function handleResetQuota() {
    try {
      const webhookId = `payment-${Date.now()}`;
      const response = await resetQuotaWebhook(webhookId);

      alert(response.message);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleWebhookSpam() {
    try {
      const webhookId = "same-payment-id";

      const requests = [];

      for (let i = 1; i <= 5; i++) {
        requests.push(resetQuotaWebhook(webhookId));
      }

      const responses = await Promise.all(requests);
      console.log(responses);

      alert("Webhook spam test completed");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGenerateLeads() {
    try {
      const requests = [];

      for (let i = 1; i <= 10; i++) {
        const leadData = {
          name: `Test user ${i}`,
          phone: `99999${Math.floor(Math.random() * 100000)}`,
          city: "Delhi",
          serviceType:
            i % 3 === 0 ? "Service 1" : i % 3 === 1 ? "Service 2" : "Service 3",
          description: "Concurrency test lead",
        };

        requests.push(createLead(leadData));
      }

      await Promise.all(requests);

      alert("10 leads generated successfully");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center py-7">
      <h1 className="text-4xl font-extrabold mb-15">🔍Test Tools</h1>

      <button
        className="bg-blue-400 px-4 py-2 rounded-2xl font-bold self-center text-white w-70 cursor-pointer"
        onClick={handleResetQuota}
      >
        Reset Provider Quota
      </button>
      <br />

      <button
        className=" px-4 py-2 rounded-2xl border font-bold self-center text-gray-100 w-70 cursor-pointer"
        onClick={handleWebhookSpam}
      >
        Call Webhook multiple times
      </button>
      <br />

      <button
        className="bg-blue-400 px-4 py-2 rounded-2xl font-bold self-center text-white w-70 cursor-pointer"
        onClick={handleGenerateLeads}
      >
        Generate 10 leads Instantly
      </button>
    </div>
  );
};

export default TestTools;
