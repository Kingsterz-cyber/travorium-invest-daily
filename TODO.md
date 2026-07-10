# TRAVORIUM Task Dashboard — Implementation TODO

- [x] Refactor `src/lib/wallet.ts` to make tasks ad-driven (5 tasks/day × 500 FRW) using `getDailyAds()` + day key persistence.
- [x] Update `src/routes/dashboard.tsx` to render the 5 daily ad tasks (image/title/desc) and simulate watching ads with 0→100% loading + earnings 0→500.
- [x] Align UI wording to 500 FRW/task and daily max 2,500 FRW.



- [ ] Ensure task completion credits wallet correctly and persists completed tasks for the day.
- [ ] Align UI wording to 500 FRW/task and daily max 2,500 FRW.
- [ ] Run typecheck/build to verify TS passes.
- [ ] Manually verify with local usage flow: register → dashboard → complete tasks → withdraw reflects new totals.


