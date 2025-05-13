
# 🚀 Xeno Mini CRM PLatform - SDE Internship Assignment

Welcome to the Mini CRM Backend built for the **Xeno SDE Internship Assignment**!  
This project simulates a real-world CRM system that handles customer segmentation, campaign delivery, and message logging.

---

## 📂 Folder Structure

```
backend/
├── index.js                  # Entry point
├── .env                      # Environment variables
├── config/
│   ├── auth.js               # Google OAuth setup
│   └── db.js                 # MongoDB connection
├── routes/
│   └── api/
│       ├── auth.js
│       ├── customers.js
│       ├── orders.js
│       ├── campaigns.js
│       └── delivery-receipt.js
├── controllers/
│   ├── authController.js
│   ├── customerController.js
│   ├── orderController.js
│   └── campaignController.js
├── models/
│   ├── Customer.js
│   ├── Order.js
│   ├── Campaign.js
│   ├── CommunicationLog.js
│   └── User.js
├── middleware/
│   └── auth.js
├── services/
│   ├── segmentService.js     # Rule-based segmentation logic
│   └── dummyVendorService.js # Simulated delivery vendor
├── utils/
│   ├── errorResponse.js
│   └── validator.js
```

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: Google OAuth 2.0 (Passport.js)
- **AI Integration**: OpenAI API (optional extension)
- **Delivery Simulation**: Dummy Vendor Service

---

## 🚀 Features Implemented

✅ Google OAuth Login  
✅ REST APIs for Customer and Order Ingestion  
✅ Campaign Creation with Dynamic Rule Builder  
✅ Audience Segmentation using AND/OR Rules  
✅ Campaign Delivery Simulation (~90% success)  
✅ Delivery Receipt API & Logging  
✅ AI-Ready Messaging (pluggable)  
✅ MongoDB Models for Full Tracking  
✅ Error Handling, Validation, Modular Code  

---

## 🧪 How to Run the Project Locally

1. **Clone the Repo**
```bash
git clone https://github.com/your-username/xeno-crm-backend.git
cd xeno-crm-backend/backend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup .env File**
Create a `.env` file and add:
```
MONGO_URI=your_mongo_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
SESSION_SECRET=your_secret
NODE_ENV=development
PORT=5000
```

4. **Run the Server**
```bash
npm start
```

Server will start on `http://localhost:5000`

---

## 📬 API Endpoints (Use Postman)

### 👤 Create Customer
```
POST /api/customers
```
```json
{
  "name": "Mohit",
  "email": "mohit@example.com",
  "phone": "9999999999",
  "address": "Delhi",
  "spend": 12000,
  "visits": 2,
  "lastActive": "2024-12-01"
}
```

### 📦 Create Order
```
POST /api/orders
```
```json
{
  "customerId": "customer_id_here",
  "amount": 2000,
  "status": "delivered",
  "date": "2025-05-01"
}
```

### 📣 Create Campaign
```
POST /api/campaigns
```
```json
{
  "name": "High Spender",
  "rules": [
    { "field": "spend", "operator": ">", "value": 10000 },
    { "field": "visits", "operator": "<", "value": 3 }
  ]
}
```

### 📩 Delivery Receipt (Simulated)
```
POST /api/delivery-receipt
```
```json
{
  "messageId": "log_id_here",
  "status": "SENT"
}
```

---

## 🧠 AI Features (Pluggable)

Use OpenAI API to:
- Convert natural language to segmentation rules
- Generate personalized message suggestions

> Not required, but highly recommended as a creative extension.

---

## 📊 MongoDB Collections

- `users`: OAuth logins
- `customers`: Customer records
- `orders`: Orders linked to customers
- `campaigns`: Audience rules & name
- `communicationlogs`: Message status (sent/failed)

---

## 🌐 Deployment

You can deploy this project on:
- [Render](https://render.com)
- [Railway](https://railway.app)
- [Vercel (Frontend)](https://vercel.com)

---

## 📈 Architecture Flow

```
[Google Login]
    ↓
[Create Customers / Orders]
    ↓
[Define Campaign Rules]
    ↓
[Segment Audience]
    ↓
[Send Message via Dummy Vendor]
    ↓
[Vendor hits /delivery-receipt]
    ↓
[Update Log & Track Stats]
```

---

## 👨‍💻 Author

**Shrey Garg**  
[LinkedIn](https://www.linkedin.com/in/shreygrg03/) | [GitHub](https://github.com/ShreyGrg03)

---

## 📬 Contact Me

If you’d like to collaborate or review more of my work, feel free to reach out!

---

🎉 Thank you for reviewing this project!
