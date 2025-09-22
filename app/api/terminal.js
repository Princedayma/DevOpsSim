import { exec } from "child_process";

export default function handler(req, res) {
  // Use 'dir' for Windows, 'ls -la' for Unix
  const command = process.platform === "win32" ? "dir" : "ls -la";
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      return res.status(500).json({ error: stderr });
    }
    res.status(200).json({ output: stdout });
  });
}