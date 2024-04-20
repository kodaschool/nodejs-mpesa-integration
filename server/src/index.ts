import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/lipaRoute";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
//middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Daraja API payment gateway");
});
app.use("/lipa", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// let headers = new Headers();
// headers.append("Content-Type", "application/json");
// headers.append("Authorization", "Bearer IQg1mE9PK8EgHOIxAQOFdm9LCK6C");
// fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
//   method: "POST",
//   headers,
//   body: JSON.stringify({
//     BusinessShortCode: 174379,
//     Password:
//       "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNDIwMTkxMzEz",
//     Timestamp: "20240420191313",
//     TransactionType: "CustomerPayBillOnline",
//     Amount: 1,
//     PartyA: 254708374149,
//     PartyB: 174379,
//     PhoneNumber: 254708374149,
//     CallBackURL: "https://mydomain.com/path",
//     AccountReference: "CompanyXLTD",
//     TransactionDesc: "Payment of X",
//   }),
// })
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));
