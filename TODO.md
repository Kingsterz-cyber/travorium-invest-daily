# TODO

## Dashboard real-time updates after task completion

- [x] Inspect existing dashboard logic (src/routes/dashboard.tsx) and wallet storage (src/lib/wallet.ts)
- [ ] Implement real-time refresh of wallet values while tasks are being watched/completed (without page refresh)
- [ ] Ensure task completion UI marks the ad as completed immediately
- [ ] Ensure balance/todayEarnings progress increments by +500 FRW per completed task
- [x] Add a lightweight polling or cross-tab sync mechanism so the dashboard updates in real-time
- [ ] Run lint/build/tests (if available) to confirm no TS errors

