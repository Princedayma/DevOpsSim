"use client";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState("");

  const fetchOutput = async () => {
    const res = await fetch("/api/terminal");
    const json = await res.json();
    setData(json.output || json.error);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Terminal Output Viewer</h1>
      <button onClick={fetchOutput}>Run Command</button>
      <pre style={{ marginTop: 20, background: "#111", color: "#0f0", padding: 10 }}>
        {data}
      </pre>
    </div>
  );
}
