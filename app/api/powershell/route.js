// app/api/powershell/route.js
import { NextResponse } from "next/server";
import { spawn } from "child_process";

let output = "";

export async function GET() {
  if (!output) {
    const ps = spawn("powershell.exe", ["-NoExit", "-Command", "npm run dev"], {
      shell: true,
    });

    ps.stdout.on("data", (data) => {
      output += data.toString();
    });

    ps.stderr.on("data", (data) => {
      output += data.toString();
    });
  }

  return NextResponse.json({ output });
}
