// Notification service using Shoelace <sl-alert> for toast notifications
// Usage: notificationService.showToast('Message', {variant: 'success'});

let alertContainer: HTMLElement | null = null;

function ensureContainer() {
  if (!alertContainer) {
    alertContainer = document.createElement('div');
    alertContainer.style.position = 'fixed';
    alertContainer.style.top = '1rem';
    alertContainer.style.right = '1rem';
    alertContainer.style.zIndex = '9999';
    document.body.appendChild(alertContainer);
  }
}

export interface ToastOptions {
  variant?: 'primary' | 'success' | 'neutral' | 'warning' | 'danger';
  duration?: number; // ms
}

export const notificationService = {
  showToast(message: string, options: ToastOptions = {}) {
    ensureContainer();
    const alert = document.createElement('sl-alert');
    alert.variant = options.variant || 'primary';
    alert.duration = options.duration || 3000;
    alert.innerHTML = `<sl-icon slot="icon" name="info-circle"></sl-icon>${message}`;
    alert.style.marginBottom = '0.5rem';
    alert.addEventListener('sl-after-hide', () => {
      alert.remove();
    });
    alert.open = true;
    alertContainer!.appendChild(alert);
  }
};

// Note: Make sure to install Shoelace and import its components in your app root:
// npm install @shoelace-style/shoelace
// import '@shoelace-style/shoelace/dist/components/alert/alert.js';
// import '@shoelace-style/shoelace/dist/components/icon/icon.js';
