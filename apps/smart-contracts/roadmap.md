# Product Roadmap

## Phase 1: Core Product & MVP

-[x] User authentication (email, phone, Google, guest)
-[x] Contract creation from vetted templates (rental, service, etc.)
-[x] AI-powered contract generation (Vertex AI integration)
-[x] User dashboard for managing contracts
-[x] Real-time Firestore storage and retrieval
-[x] Basic access control (only creator can view/edit/delete)
-[x] Responsive UI with Shoelace and FASTElement

## Phase 2: Trust & Legal Quality

-[ ] “Reviewed by Legal Expert” badge for templates
-[ ] Option to request human legal review (paid add-on)
-[ ] Clear disclaimers and risk assessment for AI-generated contracts
-[ ] Version history and change tracking for contracts

## Phase 3: Collaboration & Workflow

-[ ] Break contract generation to sections
-[ ] Share contract with users
    - [ ] Design contract-user sharing data model (many-to-many)
    - [ ] Implement invitation flow (invite by email, handle new/existing users)
    - [ ] UI for managing shared users (add/remove, view permissions)
    - [ ] Access control enforcement in backend and frontend
    - [ ] Notification/email for invitations and sharing events
-[ ] Multi-user editing and comments on contracts
    - [ ] Real-time collaborative editing (Firestore or similar)
    - [ ] User presence indicators (who is viewing/editing)
    - [ ] Inline and thread-based comments on contract sections
    - [ ] Comment notification system
    - [ ] Versioning and conflict resolution for edits
-[x] Approval workflows and e-signature integration
-[ ] Audit trails for contract changes and signatures
-[ ] Reminders and contract lifecycle management

## Phase 4: Compliance & Localization

-[ ] Templates tailored to specific jurisdictions and industries
-[ ] Compliance checks (e.g., GDPR, HIPAA) and flagging risky clauses
-[ ] Support for multiple languages

## Phase 5: Integrations & Analytics

-[ ] Integrations with CRM, accounting, and cloud storage tools
-[ ] Analytics dashboard for contract status, deadlines, and key metrics

## Phase 6: Monetization & Scaling

-[ ] Freemium model: free basic use, paid advanced features
-[ ] Pay-per-contract or per-signature pricing
-[ ] B2B SaaS offering for teams/businesses
-[ ] Marketplace for connecting with legal professionals
-[ ] White-label solution for law firms/enterprises
