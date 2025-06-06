# 🧃 New Life Bottles – Multi-Role POS System (HTML + Tailwind + localStorage)

A slick, no-backend POS system built for small businesses, home factories, or anyone who wants full control — no database, no frameworks, just pure front-end fire.

## 🔥 Features

- 🛂 **Role-Based Login**
  - `admin@newlife.com` / `admin123`
  - Roles: `admin`, `cashier`, `viewer`
  - Viewer can't checkout (read-only UI)
  
- 🛒 **Product Inventory**
  - Add/Edit/Delete items
  - Filter by category (Small / Medium / Large)
  - Stock decreases when orders are placed
  - Admin dashboard to manage stock

- 🧾 **Cart & Checkout**
  - Live cart with quantity tracking
  - Checkout clears cart and logs order
  - SweetAlert popup confirmation

- 📜 **Order History**
  - Stored in localStorage
  - Admin can delete all orders
  - Download order history as CSV
  - (CSV export includes date, product, qty)

- 📈 **Sales Analytics**
  - Chart.js bar graph of total units sold per product
  - Only visible to Admin

- 👤 **User Profile Display**
  - Email and role shown on top once logged in

## 📦 Tech Stack

- 💅 HTML + Tailwind CSS
- 🧠 Vanilla JS
- 💾 localStorage (No DB)
- ✨ SweetAlert2
- 📊 Chart.js

## 🧠 How It Works

- Everything runs in-browser.
- Data stored in localStorage (reload-safe).
- Product IDs are timestamp-based.
- Built with simplicity and flexibility in mind.

## 🚀 Getting Started

1. Clone or download the repo
2. Open `index.html` in your browser
3. Login as Admin to unlock full features
4. Customize products / categories as you wish

```bash
admin@newlife.com
admin123
