import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Jost", sans-serif;

  }

  body {
    font-size: 16px;
    line-height: 23px;
    color: var(--text-primary);
    //background:var(--bg-main);
    //  background-color: #ffa100;
      background: #283048;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #859398, #283048);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #859398, #283048); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  a {
    text-decoration:none;
  }


  button {
    cursor: pointer;
    outline: none;
    border:none;
    background:transparent;


  }

  :root {
    --bg-main: #f7f8fd;
    --bg-secondary: #f2f4ff;
    --primary-color: #fff;
    --text-primary: #3a4374;
    --text-secondary: #647196;
    --button-color: #ad1fea;
    --link-color:#4661e6; 
    --hover-color: #cfd7ff;
    --error-color:#ed4337;
    
   

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

    --border-radius:10px;

    --transition:all .3s ease;

    --box-shadow: 0px 10px 40px -7px rgba(55, 63, 104, 0.35);
;


  }
    `;
