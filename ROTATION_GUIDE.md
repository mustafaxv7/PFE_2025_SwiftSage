# Secret Rotation Guide

Credentials have been rotated. This document describes the process — no actual secrets are stored here.

---

## 1. Neon Database Password

### Steps:
1. Go to https://console.neon.tech
2. Select your project → **Settings → Users**
3. Click on `swiftsage_owner` → **Reset Password**
4. Paste a new secure password
5. Update `DATABASE_URL` in `.env` and **Render** with the new password

Format:
```
postgresql://swiftsage_owner:NEW_PASSWORD@ep-lingering-surf-a4wj9n8z-pooler.us-east-1.aws.neon.tech/swiftsage?sslmode=require
```

---

## 2. DigitalOcean Spaces Keys

### Steps:
1. Go to https://cloud.digitalocean.com/account/api/tokens
2. Click **Generate New Key**, name it `swiftsage-rotated-<date>`
3. Copy the Access Key and Secret Key (shown once!)
4. Delete the old key
5. Update `DO_SPACES_KEY` and `DO_SPACES_SECRET` in `.env` and **Render**

---

## 3. Render Deployment

1. Go to https://dashboard.render.com → your service → **Environment**
2. Update: `DATABASE_URL`, `DO_SPACES_KEY`, `DO_SPACES_SECRET`, `JWT_SECRET`, `JWT_REFRESH_SECRET`
3. Save — Render auto-deploys

---

## 4. Google Maps API Key

1. Go to https://console.cloud.google.com/apis/credentials
2. Create a new API key, restrict to your domains
3. Update `VITE_GOOGLE_MAPS_API_KEY` in `.env` and Render

---

## Generating New Secrets

```bash
npm run generate-secrets
```

## Verification

```bash
npm run check-env
npm run dev
```
