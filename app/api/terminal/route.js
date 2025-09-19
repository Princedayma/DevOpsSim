import { NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export async function GET() {
  try {
    // Example command: list files
    const { stdout, stderr } = await execPromise("ls -la");

    if (stderr) {
      return NextResponse.json({ error: stderr }, { status: 500 });
    }

    return NextResponse.json({ output: stdout });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
