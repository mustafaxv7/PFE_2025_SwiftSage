# SwiftSage — Final QA Checklist

## Authentication
- [ ] User registration with valid data → redirects to login
- [ ] Registration with duplicate email → shows error
- [ ] Registration with short password → shows validation error
- [ ] Login with valid credentials → redirects to dashboard
- [ ] Login with wrong password → shows "Invalid credentials"
- [ ] Login with non-existent email → shows error
- [ ] Logout → clears cookies, redirects to landing page
- [ ] Refresh token → new access token issued
- [ ] Unauthenticated access to /api/* → 401

## User Dashboard
- [ ] My Reports page loads with reports from DB
- [ ] Alerts page loads with alerts from DB
- [ ] User cannot access /admin/* routes (redirected to /)
- [ ] Sidebar shows real user name from /auth/me

## Report CRUD
- [ ] Create report with map click → report saved to DB
- [ ] Create report with crisis details → details saved
- [ ] View report in My Reports list
- [ ] Edit report description → update saved
- [ ] Report appears in admin Reports Overview

## Admin Panel
- [ ] Admin login → reaches admin panel
- [ ] Reports Overview → table with all reports
- [ ] Change report status → status updated
- [ ] Manage Alerts → create/delete/toggle status
- [ ] Manage Users → view/edit/delete users
- [ ] Crisis Map → reports plotted on Google Maps
- [ ] Statistics → charts render with real data

## Feedback
- [ ] Submit feedback → saved with user ID from token
- [ ] Admin views feedback list

## Security
- [ ] CSP headers present in response
- [ ] Rate limiting on /auth (20 req/15min)
- [ ] Rate limiting on /api/* (100 req/15min)
- [ ] JWT in httpOnly cookie (not accessible via JS)
- [ ] CORS blocks unauthorized origins
- [ ] SQL injection attempt → blocked by parameterized queries
- [ ] XSS attempt → blocked by React escaping + CSP

## Performance
- [ ] Static assets have cache headers
- [ ] JS/CSS bundles use content hashing
- [ ] Lazy-loaded routes load on demand
- [ ] Database queries use indexes
- [ ] Connection pool limits enforced

## Responsive Design
- [ ] Mobile (375px) — sidebar collapses, forms stack
- [ ] Tablet (768px) — sidebar visible, grid adjusts
- [ ] Desktop (1280px) — full layout

## Cross-Browser
- [ ] Chrome (latest) — all features work
- [ ] Firefox (latest) — all features work
- [ ] Safari (latest) — all features work

## Error States
- [ ] Network failure → error message displayed
- [ ] 404 page → user-friendly redirect
- [ ] Server error → "Internal server error" (no stack trace)
- [ ] Loading states shown during async operations

## Internationalization
- [ ] Language switcher toggles EN/FR/AR
- [ ] RTL layout for Arabic
- [ ] All strings translated (no hardcoded English)

## Logout / Re-login
- [ ] User logout → session cleared
- [ ] Admin logout → session cleared
- [ ] Re-login after logout → works correctly
- [ ] Token refresh → seamless continuation
