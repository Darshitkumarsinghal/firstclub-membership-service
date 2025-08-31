# 🥇 FirstClub Membership Service

A backend service for managing subscription-based memberships with **plans, tiers, and benefits**.  
Built using **Node.js + Express**, designed with modularity, clean architecture, and extensibility in mind.

---

## ✨ Features
- 📦 Membership Plans: **Monthly, Quarterly, Yearly**
- 🏆 Membership Tiers: **Silver, Gold, Platinum**
- 👤 User actions:
  - Subscribe to a plan
  - Upgrade/Downgrade tier
  - Cancel subscription
  - Track membership & expiry
- 📈 Rule-based Tier Upgrades (based on order amount & count)
- 🎁 Configurable perks (discounts, delivery, early access, etc.)
- 🔒 Clean separation of concerns (routes, controllers, services, models, utils)

---

## 📂 Project Structure
firstclub-membership-service/
│── src/
│ ├── app.js # Express app setup
│ ├── routes/ # API routes
│ ├── controllers/ # Request handlers
│ ├── services/ # Business logic
│ ├── models/ # Entities & in-memory store
│ └── utils/ # Helpers (date, rule engine, etc.)
│── package.json
│── README.md


---

## 🚀 Getting Started

### 1️⃣ Clone the repository
``` 
git clone <your-repo-url>
cd firstclub-membership-service

2️⃣ Install dependencies
 
 
npm install
3️⃣ Run the server
 
 
npm start
Server will start on http://localhost:3000

📡 API Endpoints
🔹 Get all membership plans
http
 
GET /api/plans
🔹 Subscribe to a plan
http
 
POST /api/subscriptions
Content-Type: application/json

{
  "userId": 1,
  "planId": "MONTHLY",
  "tier": "SILVER"
}
🔹 Get current subscription
http
 
GET /api/subscriptions/:userId
🔹 Upgrade subscription tier
http
 
POST /api/subscriptions/:userId/upgrade?target=GOLD
🔹 Downgrade subscription tier
http
 
POST /api/subscriptions/:userId/downgrade?target=SILVER
🔹 Cancel subscription
http
 
DELETE /api/subscriptions/:userId/cancel
🔹 Simulate Order Event (for rule engine)
http
 
POST /api/admin/events/order
Content-Type: application/json

{
  "userId": 1,
  "orderAmount": 1500
}
🧪 Testing the APIs
Using curl
 
 
# Get plans
curl http://localhost:3000/api/plans

# Subscribe a user
curl -X POST http://localhost:3000/api/subscriptions \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"planId":"MONTHLY","tier":"SILVER"}'

# Get user subscription
curl http://localhost:3000/api/subscriptions/1

# Upgrade tier
curl -X POST "http://localhost:3000/api/subscriptions/1/upgrade?target=GOLD"

# Cancel subscription
curl -X DELETE http://localhost:3000/api/subscriptions/1/cancel
Using Postman
Create a new collection called FirstClub API.

Add the above endpoints.

Set Content-Type: application/json for POST requests.

Test interactively.

✅ Roadmap / Enhancements
 Replace in-memory store with MongoDB persistence

 Add unit + integration tests using Jest + Supertest

 Add authentication layer (JWT or OAuth2)

 Dockerize the service for container deployment

 Extend rule engine to be configurable from DB

 Implement CRON jobs for membership expiry reminders

👨‍💻 Author
Darshit Singhal 
