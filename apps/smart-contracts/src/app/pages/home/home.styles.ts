import { css } from "@microsoft/fast-element";

export const HomeStyles = css`
  .home-hero {
    min-height: 70vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .hero-background {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    width: 100%;
    padding: 4rem 2rem;
    position: relative;
  }

  .hero-background::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }

  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .hero-text {
    color: white;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    background: none;
    -webkit-background-clip: unset;
    -webkit-text-fill-color: unset;
    color: white;
  }

  .hero-subtitle {
    font-size: 1.3rem;
    line-height: 1.6;
    margin-bottom: 2.5rem;
    opacity: 0.95;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .cta-primary {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    border: none;
    box-shadow: 0 6px 20px rgba(17, 153, 142, 0.4);
    transition: all 0.3s ease;
  }

  .cta-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(17, 153, 142, 0.5);
  }

  .cta-secondary {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    transition: all 0.3s ease;
  }

  .cta-secondary:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  .hero-visual {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .feature-preview {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-align: center;
    padding: 2rem;
    color: white;
    max-width: 300px;
    transform: rotate(3deg);
    transition: all 0.3s ease;
  }

  .feature-preview:hover {
    transform: rotate(0deg) scale(1.05);
  }

  .preview-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.9;
  }

  .feature-preview h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    background: none;
    -webkit-background-clip: unset;
    -webkit-text-fill-color: unset;
    color: white;
  }

  .feature-preview p {
    margin: 0;
    opacity: 0.8;
    font-size: 0.9rem;
  }

  .features-section {
    padding: 5rem 2rem;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    text-align: center;
    padding: 2.5rem 2rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .feature-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.6s ease;
  }

  .feature-card:hover::before {
    left: 100%;
  }

  .feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .feature-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
    transition: all 0.3s ease;
  }

  .feature-card:hover .feature-icon {
    transform: scale(1.1) rotate(5deg);
  }

  .feature-card h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: var(--sl-color-neutral-800);
    background: none;
    -webkit-background-clip: unset;
    -webkit-text-fill-color: unset;
  }

  .feature-card p {
    color: var(--sl-color-neutral-600);
    line-height: 1.6;
    margin: 0;
  }

  .cta-section {
    padding: 4rem 2rem;
    background: var(--sl-color-neutral-0);
  }

  .cta-card {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 3rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
  }

  .cta-content h2 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    background: none;
    -webkit-background-clip: unset;
    -webkit-text-fill-color: unset;
    color: white;
  }

  .cta-content p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .cta-final {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    border: none;
    box-shadow: 0 6px 20px rgba(17, 153, 142, 0.4);
    transition: all 0.3s ease;
  }

  .cta-final:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(17, 153, 142, 0.5);
  }

  /* Responsive Design */
  @media (max-width: 968px) {
    .hero-content {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }

    .hero-title {
      font-size: 2.8rem;
    }

    .features-grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }

  @media (max-width: 640px) {
    .hero-title {
      font-size: 2.2rem;
    }

    .hero-subtitle {
      font-size: 1.1rem;
    }

    .hero-actions {
      flex-direction: column;
    }

    .section-title {
      font-size: 2rem;
    }

    .features-grid {
      grid-template-columns: 1fr;
    }

    .cta-content h2 {
      font-size: 1.8rem;
    }
  }
`;
