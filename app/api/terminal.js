import { exec } from "child_process";

export default function handler(req, res) {
  exec("ls -la", (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      return res.status(500).json({ error: stderr });
    }
    res.status(200).json({ output: stdout });
  });
}
