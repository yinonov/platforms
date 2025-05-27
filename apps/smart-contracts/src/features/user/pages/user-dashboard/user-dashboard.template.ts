import { html, repeat } from "@microsoft/fast-element";
import type { UserDashboard } from "./user-dashboard";

export const UserDashboardTemplate = html<UserDashboard>`
  <div class="dashboard-hero">
    <div class="hero-card glass-card gradient-bg">
      <div class="hero-content">
        <sl-icon name="file-text" class="hero-icon"></sl-icon>
        <h1>לוח ניהול חוזים</h1>
        <p class="hero-subtitle">נהל את כל החוזים שלך במקום אחד</p>
      </div>
    </div>
  </div>

  <div class="dashboard-stats">
    <div class="stat-card glass-card hover-lift">
      <div class="stat-content">
        <sl-icon name="file-text" class="stat-icon"></sl-icon>
        <div class="stat-info">
          <span class="stat-number">${(x) => x.contracts.length}</span>
          <span class="stat-label">חוזים פעילים</span>
        </div>
      </div>
    </div>
    
    <div class="stat-card glass-card hover-lift">
      <div class="stat-content">
        <sl-icon name="clock" class="stat-icon"></sl-icon>
        <div class="stat-info">
          <span class="stat-number">${(x) => x.contracts.filter(c => c.status === 'draft').length}</span>
          <span class="stat-label">טיוטות</span>
        </div>
      </div>
    </div>
    
    <div class="stat-card glass-card hover-lift">
      <div class="stat-content">
        <sl-icon name="check-circle" class="stat-icon"></sl-icon>
        <div class="stat-info">
          <span class="stat-number">${(x) => x.contracts.filter(c => c.status === 'signed').length}</span>
          <span class="stat-label">חתומים</span>
        </div>
      </div>
    </div>
  </div>

  <div class="dashboard-container">
    <div class="dashboard-header">
      <h2>החוזים שלי</h2>
      <sl-button variant="primary" href="/create-contract" class="create-btn">
        <sl-icon slot="prefix" name="plus-circle"></sl-icon>
        צור חוזה חדש
      </sl-button>
    </div>

    ${(x) =>
      x.loading
        ? html` 
          <div class="loading-container text-center">
            <sl-spinner style="font-size: 3rem;"></sl-spinner>
            <p class="loading-text">טוען חוזים...</p>
          </div>
        `
        : html`
            ${x.contracts.length > 0
              ? html`
                  <div class="contracts-grid">
                    ${repeat(
                      (x) => x.contracts,
                      html<any>`
                        <sl-card class="contract-card hover-lift">
                          <div class="contract-header">
                            <h3 class="contract-title">
                              ${(x) => x.title || "חוזה ללא כותרת"}
                            </h3>
                            <sl-badge variant="neutral" pill class="contract-status">
                              ${(x) => x.status || 'טיוטה'}
                            </sl-badge>
                          </div>
                          
                          <div class="contract-meta">
                            <div class="meta-item">
                              <sl-icon name="calendar"></sl-icon>
                              <span>${(x) => {
                                const val = x.createdAt;
                                let date: Date | null = null;
                                if (val && typeof val.toDate === "function") {
                                  date = val.toDate();
                                } else if (
                                  typeof val === "string" ||
                                  typeof val === "number"
                                ) {
                                  date = new Date(val);
                                }
                                return date && !isNaN(date.getTime())
                                  ? date.toLocaleDateString('he-IL')
                                  : "תאריך לא ידוע";
                              }}</span>
                            </div>
                            
                            <div class="meta-item">
                              <sl-icon name="person"></sl-icon>
                              <span>${(x) => x.createdBy || 'לא מוגדר'}</span>
                            </div>
                          </div>
                          
                          <div class="contract-actions">
                            <sl-button variant="text" href="/contract/${(x) => x.id}" class="view-btn">
                              <sl-icon slot="prefix" name="eye"></sl-icon>
                              צפייה
                            </sl-button>
                            <sl-button variant="text" href="/contract/${(x) => x.id}/edit" class="edit-btn">
                              <sl-icon slot="prefix" name="pencil"></sl-icon>
                              עריכה
                            </sl-button>
                          </div>
                        </sl-card>
                      `
                    )}
                  </div>
                `
              : html` 
                  <div class="empty-state">
                    <div class="empty-card glass-card text-center">
                      <div class="empty-content">
                        <sl-icon name="file-plus" class="empty-icon"></sl-icon>
                        <h3>אין חוזים עדיין</h3>
                        <p>התחל ליצור את החוזה הראשון שלך</p>
                        <sl-button variant="primary" href="/create-contract" size="large">
                          <sl-icon slot="prefix" name="plus-circle"></sl-icon>
                          צור חוזה ראשון
                        </sl-button>
                      </div>
                    </div>
                  </div>
                `}
          `}
  </div>
`;
