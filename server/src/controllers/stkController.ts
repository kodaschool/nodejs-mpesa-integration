import axios from "axios";
import { generateToken } from "../middlewares/generateToken";
import { Request, Response } from "express";
function parseDate(val: number) {
  return val < 10 ? "0" + val : val;
}
const timestamp = () => {
  const dateString = new Date().toLocaleString("en-us", {
    timeZone: "Africa/Nairobi",
  });
  const dateObject = new Date(dateString);
  const month = parseDate(dateObject.getMonth() + 1);
  const day = parseDate(dateObject.getDate());
  const hour = parseDate(dateObject.getHours());
  const minute = parseDate(dateObject.getMinutes());
  const second = parseDate(dateObject.getSeconds());
  return (
    dateObject.getFullYear() +
    "" +
    month +
    "" +
    day +
    "" +
    hour +
    "" +
    minute +
    "" +
    second
  );
};

const handleStkPush = async (req: Request, res: Response) => {
  const { phone, amount } = req.body;
  await generateToken();
  const BUSINESS_SHORT_CODE = process.env.MPESA_BUSINESS_SHORT_CODE as string;
  //shortcode + passkey + timestamp
  const password = Buffer.from(
    BUSINESS_SHORT_CODE + process.env.MPESA_PASS_KEY + timestamp
  ).toString("base64");

  const payload = {
    BusinessShortCode: BUSINESS_SHORT_CODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: process.env.MPESA_BUSINESS_SHORT_CODE,
    PhoneNumber: phone,
    CallBackURL: "https://mydomain.com/path",
    AccountReference: "BuySasa online shop",
    TransactionDesc: "Payment",
  };
  console.log("generateToken", await generateToken());
  try {
    const response = await axios.post(
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer vW5HeyAwS7q0QZ0UBWqdef4JSNk4`,
        },
      }
    );
    console.log("lipa", response.data);
    res.status(201).json({
      message: true,
      data: response.data,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "Failed",
      error: error.message,
    });
  }
};
export { handleStkPush };
