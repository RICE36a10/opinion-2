import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Jost", sans-serif;
    font-size: 16px;
    line-height: 23px;
    color: var(--text-primary);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  :root {
    --primary-color: #fff;
    --text-primary: #3a4374;
    --text-secondary: #647196;
    --button-color: #ad1fea;
    --link-color:#4661e6; 
    
    --mobile:768px;
    --tablet:1024px;

    --h1-size:24px;
    --h1-line:35px;
    --h1-spacing:-0.33;

    --h2-size:20px;
    --h2-line:29px;
    --h2-spacing:-0.25;

    --h3-size:18px;
    --h3-line:26px;
    --h3-spacing:-0.25;

    --h4-size:14px;
    --h4-line:20px;
    --h4-spacing:-0.2;

    --body1-size:16px;
    --body1-line:23px;

    --body2-size:15px;
    --body2-line:22px;

    --body3-size:13px;
    --body3-line:19px;

  }
    `;
