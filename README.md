# BestCar - Car Rental Platform & Admin Dashboard

A modern, high-performance, pixel-perfect Car Rental Customer Website and Store & Inventory Admin Dashboard built for the **Digital Pylot Technical Assessment Task**.

---

## 🌟 Projects Overview

This repository contains two fully functional applications:

1. **Customer Front-End (`website-frontend`)**:
   - **URL**: `http://localhost:3000/`
   - **Features**: Interactive car rental booking, location search filter, category deals, vehicle detail modal with pricing calculator, wishlist drawer, and real-time toast alerts.
   - **AI Feature**: **BestCar AI Concierge** — a floating AI assistant widget that provides smart vehicle recommendations based on trip type, budget, passenger count, and long-range preferences.

2. **Admin Dashboard (`dashboard-frontend`)**:
   - **URL**: `http://localhost:3002/`
   - **Features**: Store & inventory overview, interactive Sales by Countries map (`react-simple-maps`), KPI cards, sales analytics area chart, POS drawer, add-new vehicle modal, transactions manager, and responsive sticky navigation sidebar.
   - **Automation Feature**: **AI Automations & Webhooks Drawer** — real-time automated lead scoring, CRM sync logs, low-stock notifications, and JSON payload inspector.

---

## 🤖 AI Feature Implementation (15% Evaluation Weight)

### **BestCar AI Concierge & Vehicle Matcher**
- **Location**: Floating widget on the bottom-right corner of the Customer Website (`website-frontend`).
- **Capabilities**:
  - Accepts natural language queries or quick prompt shortcuts (*"Family Trip 7-seater"*, *"Luxury SUV"*, *"Budget deals under $100/day"*, *"Long Range Electric"*).
  - Computes vehicle suitability scores and generates instant recommendation cards with pricing and vehicle specs.
  - Features direct **"Book Now"** CTA buttons inside chat messages that trigger the vehicle rental modal.

---

## ⚡ API & Automation Architecture (15% Evaluation Weight)

### **Automated Lead Qualification & Webhook Activity Log**
- **Location**: Accessible via the **"AI Automations"** header button on the Admin Dashboard (`dashboard-frontend`).
- **Capabilities**:
  - Automatically qualifies customer leads (*High / Medium / Low Lead Score*) based on rental duration and vehicle category.
  - Logs automated webhook dispatches (`booking.created`, `lead.qualified`, `inventory.alert`) with latency tracking and status codes (`200 OK`).
  - Includes an interactive **JSON Payload Inspector** and a **"Trigger Test Webhook"** runner to simulate real-time workflow events.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS v4 + Vanilla CSS Utilities
- **Mapping & Data Viz**: `react-simple-maps` + TopoJSON + Lucide Icons + Motion

---

## 🚀 Quick Start & Local Setup

### 1. Customer Website (`website-frontend`)
```bash
cd website-frontend
npm install
npm run dev
```
Open **http://localhost:3000/** in your browser.

### 2. Admin Dashboard (`dashboard-frontend`)
```bash
cd dashboard-frontend
npm install
npm run dev
```
Open **http://localhost:3002/** in your browser.

---

## 📝 Verification & Build Commands

Both projects compile cleanly with zero errors:

```bash
# Typecheck & Build Website
cd website-frontend
npm run lint
npm run build

# Typecheck & Build Dashboard
cd dashboard-frontend
npm run lint
npm run build
```
