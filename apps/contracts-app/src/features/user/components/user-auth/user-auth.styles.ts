import { css } from "@microsoft/fast-element";

export const UserAuthStyles = css`
  .auth-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    max-width: 400px;
    margin: 0 auto;
    background: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .auth-switcher {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;פ
  }

  .auth-switcher button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
    transition: background 0.3s;
  }

  .auth-switcher button:hover:enabled {
    background: #e6f0ff;
  }

  .auth-switcher button:disabled {
    background: #ddd;
    cursor: not-allowed;
  }

  .email-login,
  .phone-login,
  .google-login {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }

  input {
    padding: 0.6rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 100%;
  }

  button {
    padding: 0.6rem;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    background: #007bff;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
  }

  button:hover:enabled {
    background: #0056b3;
  }

  button:disabled {
    background: #a0a0a0;
    cursor: not-allowed;
  }

  .error-message {
    color: #d9534f;
    background: #f2dede;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    width: 100%;
    text-align: center;
  }

  .spinner {
    font-size: 1.2rem;
    color: #007bff;
  }

  .welcome {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
  }

  .welcome p {
    margin-bottom: 1rem;
    font-weight: bold;
  }
`;
