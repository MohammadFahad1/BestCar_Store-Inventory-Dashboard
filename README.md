# BestCar - Car Rental Platform & Store/Inventory Admin Dashboard

A modern, full-stack, pixel-perfect Car Rental Customer Website, Store & Inventory Admin Dashboard, and Django REST API with AI Automations built for the **Digital Pylot Technical Assessment Task**.

---

## 🌟 Project Overview

This repository contains a full-stack architecture with three integrated modules:

1. **Customer Front-End (`website-frontend`)**:
   - **URL**: `http://localhost:9001/`
   - **Features**: Dynamic car rental booking, location search bar filter, category deals, vehicle detail modal with interactive pricing calculator, wishlist drawer with local & backend persistence, and toast notification alerts.
   - **AI Feature**: **BestCar AI Concierge** — a floating AI assistant widget that processes natural language queries or quick prompt shortcuts (*"Family Trip 7-seater"*, *"Luxury SUV"*, *"Budget deals under $100/day"*, *"Long Range Electric"*), recommending tailored vehicles from the catalog.

2. **Admin Dashboard (`dashboard-frontend`)**:
   - **URL**: `http://localhost:9002/`
   - **Features**: Store & inventory management, interactive Sales by Countries map (`react-simple-maps`), real-time KPI cards, sales analytics area chart, POS sale drawer, add-new vehicle modal, transactions manager, and responsive navigation sidebar.
   - **Automation Feature**: **AI Automations & Webhooks Drawer** — real-time automated lead scoring, CRM sync logs, payload inspector, and test webhook trigger runner.

3. **Backend API & Automations (`backend`)**:
   - **URL**: `http://localhost:9003/`
   - **Swagger Docs**: `http://localhost:9003/swagger/`
   - **ReDoc Docs**: `http://localhost:9003/redoc/`
   - **Tech**: Django 5.x + Django REST Framework + JWT Authentication + SQLite / PostgreSQL support.
   - **Automations**: Automated AI lead qualification and outbound webhook payload dispatching upon rental booking creation.

---

## 🤖 AI Feature Implementation (15% Evaluation Weight)

### **BestCar AI Concierge & Vehicle Recommendation Engine**
- **Location**: Floating assistant widget in `website-frontend/src/components/AiAssistantWidget.tsx`.
- **Capabilities**:
  - Accepts natural language inputs or quick prompt chips.
  - Connects to `/api/automations/ai-concierge/` with optional external LLM API fallback (Google Gemini / OpenAI API).
  - High-performance intelligence rule engine matching multi-attribute queries (passenger seats, fuel type, transmission, price tier, and category).
  - Direct **"Book Now"** CTA buttons inside chat messages triggering the vehicle rental workflow.

---

## ⚡ API & Automation Architecture (15% Evaluation Weight)

### **Automated Lead Qualification & Webhook Engine**
- **Location**: Admin Dashboard header button **"AI Automations"** (`dashboard-frontend/src/components/AutomationLogsModal.tsx`).
- **Capabilities**:
  - **Automated Lead Scoring**: Every booking creation calculates an AI Lead Score (`High` / `Medium` / `Low`) based on rental duration and vehicle price.
  - **Webhook Dispatches**: Dispatches `booking.created`, `lead.qualified`, and `webhook.dispatched` events with latency metrics and status codes (`200 OK`).
  - **JSON Payload Inspector**: View formatted payload structures, latency, and status.
  - **Outbound HTTP Webhook Dispatch**: Supports real HTTP POST webhook dispatches to external receivers (`WEBHOOK_URL` environment variable).

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS v4, Motion, Lucide Icons, `react-simple-maps`.
- **Backend**: Django 5.x, Django REST Framework, `drf-yasg` (Swagger), `djangorestframework-simplejwt`, `django-cors-headers`, `django-filter`, `Pillow`, `requests`, `gunicorn`.

---

## 🐳 One-Command Docker Setup

Run the entire full-stack platform (Backend, Website, and Admin Dashboard) with a single command:

```bash
docker-compose up -d --build
```

Access the applications in your browser:
- **Customer Website**: `http://localhost:9001/`
- **Admin Dashboard**: `http://localhost:9002/`
- **Backend API & Swagger**: `http://localhost:9003/swagger/`

To stop the containers:
```bash
docker-compose down
```

---

## 🚀 Local Development Setup (Manual)

### 1. Backend Service (`backend`)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py check
python manage.py migrate
python seed_data.py
python manage.py runserver 9003
```
Open **http://localhost:9003/swagger/** for Interactive API Documentation.

### 2. Customer Website (`website-frontend`)
```bash
cd website-frontend
npm install
npm run dev
```
Open **http://localhost:9001/** in your browser.

### 3. Admin Dashboard (`dashboard-frontend`)
```bash
cd dashboard-frontend
npm install
npm run dev
```
Open **http://localhost:9002/** in your browser.

---

## 🧪 Verification & Automated Tests

All modules pass build, typecheck, and test suites with zero errors:

```bash
# Backend Django Unit Tests
cd backend
./venv/bin/python manage.py test

# Frontends Typecheck & Build
cd website-frontend && npm run lint && npm run build
cd ../dashboard-frontend && npm run lint && npm run build
```

---

## 🌐 Live Deployment Guide

1. **Deploy Backend (Render / Railway / Fly.io)**:
   - Command: `gunicorn best_car.wsgi:application`
   - Set environment variables: `DEBUG=False`, `ALLOWED_HOSTS=*`, `WEBHOOK_URL=<optional_webhook_endpoint>`.
2. **Deploy Frontends (Vercel / Netlify)**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
