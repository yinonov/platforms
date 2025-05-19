# Contract-User Invitation: Action Items

## Data Model

- [x] invitations/{invitationId} or contractShares/{linkId}: { contractId, email, role, status, expiry, createdAt }

## Backend Implementation

- [x] Create TypeScript interfaces for Invitation
- [ ] Implement invitation creation (write to invitations collection)
- [ ] Implement invitation acceptance (move from invitations to contractAccess)
- [ ] Ensure dual-write consistency if needed
- [ ] Upgrade invite flow to support inviting by email (lookup UID by email, handle new users)

## Frontend Implementation

- [ ] UI for inviting users (by email, with role selection)
- [ ] UI for accepting invitations (link or dashboard)

## Security & Access Control

- [ ] Ensure only invited users can accept invitations
- [ ] Add Firestore rules for invitations

## Maintenance & Cleanup

- [ ] Add expiry date to invitations
- [ ] Implement a scheduled function (Cloud Functions cron job) to clean up expired invitations
  - Best practice: Use Google Cloud Scheduler to trigger a Firebase Function daily to delete expired invitations

## Testing & Validation

- [ ] Test invitation flow (invite, accept, reject, expire)
- [ ] Test access control for invitations
- [ ] Test UI for all invitation states

---

**Note:** For cleaning up expired invitations, a scheduled (cron) Cloud Function triggered by Google Cloud Scheduler is the recommended and scalable approach for Firestore. This avoids manual cleanup and keeps the invitations collection tidy.
