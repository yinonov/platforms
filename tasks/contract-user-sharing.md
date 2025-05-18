# Contract-User Sharing: Action Items

## Data Model

- [ ] Define Firestore data models:
  - contracts/{contractId}/sharedWith: array of { uid, role }
  - invitations/{invitationId}: { contractId, email, role, status, expiry }
  - users/{uid}/contracts: array or subcollection of { contractId, role }

## Backend Implementation

- [ ] Create TypeScript interfaces for Contract, Invitation, and UserContract
- [ ] Implement invitation creation (write to invitations collection)
- [ ] Implement invitation acceptance (move from invitations to contract.sharedWith and user.contracts)
- [ ] Implement role management (edit/view) in sharedWith and user.contracts
- [ ] Ensure dual-write consistency between contracts and users
- [ ] Upgrade invite flow to support inviting by email (lookup UID by email, handle new users)

## Frontend Implementation

- [ ] UI for inviting users (by email, with role selection)
- [ ] UI for accepting invitations (link or dashboard)
- [ ] UI for managing shared users and their roles on a contract
- [ ] UI for users to see all contracts they have access to

## Security & Access Control

- [ ] Update Firestore security rules to enforce access based on sharedWith
- [ ] Ensure only invited users can accept invitations
- [ ] Enforce role-based permissions (edit/view)

## Maintenance & Cleanup

- [ ] Add expiry date to invitations
- [ ] Implement a scheduled function (Cloud Functions cron job) to clean up expired invitations
  - Best practice: Use Google Cloud Scheduler to trigger a Firebase Function daily to delete expired invitations

## Testing & Validation

- [ ] Test invitation flow (invite, accept, reject, expire)
- [ ] Test access control for shared contracts
- [ ] Test UI for all user roles and states

---

**Note:** For cleaning up expired invitations, a scheduled (cron) Cloud Function triggered by Google Cloud Scheduler is the recommended and scalable approach for Firestore. This avoids manual cleanup and keeps the invitations collection tidy.
