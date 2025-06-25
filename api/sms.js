// api/sms.js
const axios = require("axios");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({ error: "Missing phone or message" });
  }

  try {
    const response = await axios.post("https://www.onurix.com/api/v1/sms/send", {
      key: process.env.ONURIX_KEY,
      client: process.env.ONURIX_CLIENT,
      phone,
      message,
      sender: process.env.ONURIX_SENDER
    });

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
}