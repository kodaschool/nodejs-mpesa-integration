import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const generateToken = async () => {
  const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY as string;
  const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET as string;
  const URL =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString(
    "base64"
  );
  console.log("Basic auth", auth);
  try {
    const response = await axios(URL, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    console.log(response.data.access_token);
    return response.data.access_token;
    // res.status(200).json({ message: "Success", data: response.data });
    // next();
  } catch (error) {
    console.log(error);
  }
};

export { generateToken };
