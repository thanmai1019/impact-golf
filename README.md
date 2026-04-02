# ⛳️ ImpactGolf Platform

A full-stack SaaS platform built for the Digital Heroes Trainee Project. ImpactGolf allows users to subscribe, log their golf scores, and automatically participate in monthly prize draws, with a portion of proceeds going to charity.

## 🚀 Live Demo
**[View Live Website](https://impact-golf-delta.vercel.app)**

## 💻 Tech Stack
* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Supabase (PostgreSQL), Next.js API Routes
* **Payments:** Stripe (Checkout & Webhooks)
* **Deployment:** Vercel

## ✨ Key Features (Mandatory Deliverables Met)
* **User Authentication:** Secure signup/login flow using Supabase Auth.
* **Subscription Management:** Fully integrated Stripe checkout in Test Mode, utilizing webhooks to automatically update database roles upon successful payment.
* **User Dashboard:** Secure, gated routing where users can manage their profiles and view their handicap.
* **Admin Control Panel:** Dedicated `/admin` portal featuring User Management, Charity Distribution tracking, and a simulated Monthly Draw Engine with a Winner Verification queue.

## 🛠 Local Setup
1. Clone the repository
2. Run `npm install`
3. Add your Supabase and Stripe keys to `.env.local`
4. Run `npm run dev`