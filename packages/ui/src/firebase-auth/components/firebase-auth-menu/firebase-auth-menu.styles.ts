import { css } from "@microsoft/fast-element";

export const FirebaseAuthMenuStyles = css`
  .avatar-menu {
    position: relative;
    display: inline-block;
  }
  .avatar-btn {
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .avatar-initials {
    background: #ccc;
    color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2em;
    border-radius: 50%;
  }
  .dropdown {
    position: absolute;
    top: 48px;
    right: 0;
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    min-width: 120px;
    z-index: 10;
  }
  .dropdown-item {
    padding: 10px 16px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .dropdown-item:hover {
    background: #f5f5f5;
  }
`;
