import * as React from "react";

const pages = ["home", "about"];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        © {new Date().getFullYear()} SYNERGYCAP. All Rights Reserved.
        <br />
        AI : 이정윤 / Fullstack : 정현지
        <br />
        Seocho AI College
      </div>
    </footer>
  );
}
