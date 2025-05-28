import { css } from "@microsoft/fast-element";

export const ContractDocumentStyles = css`
  :host {
    display: block;
    font-family: "Open Sans", "Segoe UI", Arial, sans-serif;
    background: #f9f9f7;
    color: #232323;
    padding: 2.5rem 2rem;
    border-radius: 14px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    max-width: 900px;
    margin: 2rem auto;
    border: 1.5px solid #e0e0e0;
  }
  .contract-body {
    line-height: 1.7;
    font-size: 1.08rem;
    letter-spacing: 0.01em;
  }
  .contract-body h1 {
    font-size: 2.1rem;
    font-weight: 700;
    color: #1a237e;
    margin-bottom: 1.2rem;
    border-bottom: 2px solid #e3e3e3;
    padding-bottom: 0.4rem;
    margin-top: 0;
  }
  .contract-body h2 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #283593;
    margin-top: 2rem;
    margin-bottom: 0.7rem;
    border-bottom: 1px solid #e3e3e3;
    padding-bottom: 0.2rem;
  }
  .contract-body h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #3949ab;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .contract-body ol,
  .contract-body ul {
    margin-left: 2.2em;
    margin-bottom: 1.2em;
    padding-left: 0.5em;
  }
  .contract-body li {
    margin-bottom: 0.5em;
    padding-left: 0.2em;
  }
  .contract-body p {
    margin: 0.7em 0;
    text-align: justify;
  }
  .contract-body strong {
    color: #1a237e;
    font-weight: 600;
  }
  .contract-body em {
    color: #616161;
  }
  .contract-body table {
    border-collapse: collapse;
    width: 100%;
    margin: 1.5em 0;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
  }
  .contract-body th,
  .contract-body td {
    border: 1px solid #e0e0e0;
    padding: 0.7em 1em;
    text-align: left;
  }
  .contract-body th {
    background: #f0f4ff;
    color: #1a237e;
    font-weight: 600;
  }
  .contract-body hr {
    border: none;
    border-top: 1.5px dashed #bdbdbd;
    margin: 2em 0;
  }
  .contract-body blockquote {
    border-left: 4px solid #bdbdbd;
    margin: 1.2em 0;
    padding: 0.7em 1.2em;
    background: #f5f5f5;
    color: #555;
    font-style: italic;
  }
`;
