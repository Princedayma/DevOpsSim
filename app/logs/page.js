"use client";
import { useEffect, useState, useRef } from "react";

export default function TerminalOutput() {
  const [log, setLog] = useState("");
  const logRef = useRef(null);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/logs");
      const data = await res.json();
      setLog(data.output);
    } catch (err) {
      setLog("Error fetching logs: " + err.message);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace", background: "#111", color: "#0f0", minHeight: "100vh" }}>
      <h1>⚡ PowerShell Live Output</h1>
      <pre ref={logRef} style={{ background: "#000", padding: "1rem", borderRadius: "8px", maxHeight: "70vh", overflowY: "scroll" }}>
        {log || "Waiting for output..."}
      </pre>
    </div>
  );
}
