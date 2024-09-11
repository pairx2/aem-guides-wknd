import React, { useEffect } from "react";
import Prism from "prismjs";
//import "prismjs/themes/prism-tomorrow.css";
import "./Code.scss";

export default function Code({ code, language }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);
  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}
