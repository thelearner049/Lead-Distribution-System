# BookMyPackers — Lead Distribution System

A full-stack lead distribution system built as part of an internship assignment for BookMyPackers.

The system accepts customer leads and automatically distributes them to service providers based on predefined business rules, provider quotas, and round-robin allocation logic.

The project also includes concurrency handling, webhook idempotency, real-time dashboard updates, and provider quota management.

## Live Demo

Frontend: [VERCEL_URL](https://lead-distribution-system-git-main-thelearner059-6054s-projects.vercel.app/)

Backend: [RENDER_URL](https://bookmypackers-backend.onrender.com)

## Features

* Submit new customer leads
* Automatically allocate leads to providers
* Mandatory provider assignment support
* Round-robin provider allocation
* Monthly quota tracking
* Provider dashboard with assigned leads
* Real-time dashboard updates using polling
* Concurrency-safe lead allocation
* Webhook-based quota reset simulation
* Idempotency handling for duplicate webhooks
* Stress testing tools for concurrency and webhook testing

## Tech Stack

### Frontend

* React
* Vite
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

## Project Structure

```bash
client/
├── src/
│   ├── pages/
│   ├── services/
│   └── App.jsx

server/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── seeds/
│   └── utils/
```

## How Lead Allocation Works

Each service type has its own allocation rules.

Some providers are mandatory and always receive leads for a particular service type.

The remaining provider slots are filled using a round-robin approach. The system remembers the last assigned provider index in MongoDB so that distribution remains fair even after server restarts.

Each provider also has a monthly quota. Providers who exhaust their quota are skipped automatically during allocation.

## Concurrency Handling

Since multiple leads can arrive at the same time, MongoDB transactions were used to avoid race conditions during lead assignment.

Provider quota updates and lead assignment creation happen inside a transaction to keep the system consistent even under concurrent requests.

## Webhook Idempotency

The project includes a simulated payment-success webhook that resets provider quotas.

To prevent duplicate webhook processing, webhook IDs are stored in a separate collection. If the same webhook arrives multiple times, it is ignored safely.

## Real-Time Dashboard Updates

The dashboard uses polling to fetch updated provider data every few seconds so that new leads appear automatically without manually refreshing the page.

## API Endpoints

### Create Lead

POST `/api/leads`

### Get Dashboard Data

GET `/api/dashboard`

### Reset Provider Quotas

POST `/api/webhook/reset-quota`

## Running Locally

### Clone Repository

```bash
git clone [GITHUB_REPO](https://github.com/thelearner049/Lead-Distribution-System/)
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file inside `server/`

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

## Test Tools

The project contains a dedicated test tools page to simulate:

* Quota reset webhooks
* Duplicate webhook requests
* Multiple concurrent lead requests

## Notes

This project was built to focus more on backend architecture and system design rather than UI complexity.

The main focus areas were:

## Made By
Nandni Atray

* allocation logic
* consistency
* concurrency safety
* webhook handling
* backend reliability
