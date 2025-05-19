# Contract-User Sharing: Action Items

## Data Model

- [x] contracts/{contractId}: contract document (no sharedWith array)
- [x] contractAccess/{contractId_uid}: { contractId, uid, role, addedAt }

## Backend Implementation

- [x] Create TypeScript interfaces for Contract and ContractAccess
- [ ] Implement access management (grant/revoke roles via contractAccess)

## Frontend Implementation

- [x] UI for managing shared users and their roles on a contract
- [x] UI for users to see all contracts they have access to

## Security & Access Control

- [x] Update Firestore security rules to enforce access based on contractAccess
- [x] Enforce role-based permissions (view/edit/owner)

## Testing & Validation

- [ ] Test access control for shared contracts
- [ ] Test UI for all user roles and states
