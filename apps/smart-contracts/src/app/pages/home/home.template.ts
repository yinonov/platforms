import { html } from "@microsoft/fast-element";
import type { Home } from "./home";

export const HomeTemplate = html<Home>`
  <div class="home-hero">
    <div class="hero-background">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">מערכת ניהול חוזים חכמה</h1>
          <p class="hero-subtitle">
            צור, נהל וחתום על חוזים בקלות ובמהירות עם הטכנולוגיה המתקדמת ביותר
          </p>
          <div class="hero-actions">
            <sl-button
              variant="primary"
              size="large"
              href="/create-contract"
              class="cta-primary"
            >
              <sl-icon slot="prefix" name="plus-circle"></sl-icon>
              התחל עכשיו
            </sl-button>
            <sl-button
              variant="default"
              size="large"
              href="/dashboard"
              class="cta-secondary"
            >
              <sl-icon slot="prefix" name="list"></sl-icon>
              החוזים שלי
            </sl-button>
          </div>
        </div>
        <div class="hero-visual">
          <sl-card class="feature-preview">
            <sl-icon name="file-text" class="preview-icon"></sl-icon>
            <h3>חוזה דיגיטלי</h3>
            <p>חתימה דיגיטלית מאובטחת</p>
          </sl-card>
        </div>
      </div>
    </div>
  </div>

  <div class="features-section">
    <div class="container">
      <h2 class="section-title">למה לבחור במערכת שלנו?</h2>
      <div class="features-grid">
        <sl-card class="feature-card">
          <div class="feature-icon">
            <sl-icon name="shield-check"></sl-icon>
          </div>
          <h3>אבטחה מקסימלית</h3>
          <p>הצפנה מתקדמת וחתימה דיגיטלית מאובטחת לכל החוזים</p>
        </sl-card>

        <sl-card class="feature-card">
          <div class="feature-icon">
            <sl-icon name="lightning"></sl-icon>
          </div>
          <h3>מהירות יוצאת דופן</h3>
          <p>צור חוזים תוך דקות ושלח לחתימה מיידית</p>
        </sl-card>

        <sl-card class="feature-card">
          <div class="feature-icon">
            <sl-icon name="people"></sl-icon>
          </div>
          <h3>שיתוף פעולה</h3>
          <p>עבוד עם צוותים, שתף חוזים וקבל עדכונים בזמן אמת</p>
        </sl-card>

        <sl-card class="feature-card">
          <div class="feature-icon">
            <sl-icon name="graph-up"></sl-icon>
          </div>
          <h3>ניתוח ודוחות</h3>
          <p>קבל תובנות מפורטות על מצב החוזים וההתקדמות</p>
        </sl-card>

        <sl-card class="feature-card">
          <div class="feature-icon">
            <sl-icon name="cloud"></sl-icon>
          </div>
          <h3>גיבוי ענן</h3>
          <p>כל המידע שמור בענן עם גיבוי אוטומטי ואמין</p>
        </sl-card>

        <sl-card class="feature-card">
          <div class="feature-icon">
            <sl-icon name="phone"></sl-icon>
          </div>
          <h3>נגיש בכל מקום</h3>
          <p>גישה מכל מכשיר - מחשב, טאבלט או סמארטפון</p>
        </sl-card>
      </div>
    </div>
  </div>

  <div class="cta-section">
    <sl-card class="cta-card">
      <div class="cta-content">
        <h2>מוכן להתחיל?</h2>
        <p>הצטרף לאלפי משתמשים שכבר משתמשים במערכת שלנו</p>
        <sl-button
          variant="primary"
          size="large"
          href="/create-contract"
          class="cta-final"
        >
          <sl-icon slot="prefix" name="rocket"></sl-icon>
          צור את החוזה הראשון שלך
        </sl-button>
      </div>
    </sl-card>
  </div>
`;
