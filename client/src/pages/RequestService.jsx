import { useState } from "react";
import { createLead } from "../services/leadService";

const RequestService = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    serviceType: "Service 1",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await createLead(formData);

      setMessage(response.message);

      //Reset form
      setFormData({
        name: "",
        phone: "",
        city: "",
        serviceType: "Service 1",
        description: "",
      });
    } catch (error) {
      console.log(error);

      setMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-7">
      <h1 className="text-4xl font-extrabold mb-8">✨Request Your Service</h1>
      <div className="border rounded-md w-80 p-6">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="font-bold">Name: </label>
            <input
              className="bg-gray-200 rounded-md px-2 py-1 w-full text-gray-900"
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div>
            <label className="font-bold ">Phone: </label>
            <input
              className="bg-gray-200 rounded-md px-2 py-1 w-full text-gray-900"
              type="text"
              placeholder="Enter phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div>
            <label className="font-bold">City: </label>
            <input
              className="bg-gray-200 rounded-md px-2 py-1 w-full text-gray-900"
              type="text"
              placeholder="Enter city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div>
            <label className="font-bold">Service Type: </label>
            <select
              className="bg-gray-200 rounded-md px-2 py-1 text-black text-sm font-semibold w-1/2"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
            >
              <option value="Service 1">Service 1</option>
              <option value="Service 2">Service 2</option>
              <option value="Service 3">Service 3</option>
            </select>
          </div>
          <br />
          <div>
            <label className="font-bold">Description: </label>
            <textarea
              className="bg-gray-200 rounded-md px-2 py-1 w-full text-gray-900"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <br />
          <button
            className="bg-yellow-500 px-4 py-2 rounded font-bold self-center text-black w-full cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <br />

      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestService;
