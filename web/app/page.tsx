import { readFileSync, writeFileSync } from "fs";

const p = "web/app/page.tsx";
let s = readFileSync(p, "utf8");

// 1) Import shared schema and types
if (!/from "@\/lib\/typed"/.test(s)) {
  s = s.replace(
    /(^import[^\n]*\n)+/m,
    (m) => m + 'import { EIP712Domain, types } from "@/lib/typed";\nimport type { LoginMessage } from "@/lib/typed";\n'
  );
} else {
  if (!/import\s+type\s+{[^}]*LoginMessage[^}]*}\s+from\s+"@\/lib\/typed"/.test(s)) {
    s = s.replace(
      /from\s+"@\/lib\/typed";/,
      'from "@/lib/typed";\nimport type { LoginMessage } from "@/lib/typed";'
    );
  }
}

// 2) Remove any local LoginMessage type or local types object
s = s.replace(/type\s+LoginMessage\s*=\s*{[\s\S]*?};\s*/m, "");
s = s.replace(/const\s+types\s*=\s*{[\s\S]*?};\s*/m, "");

// 3) Ensure primaryType is LoginMessage
s = s.replace(/primaryType:\s*"Login"\s*/g, 'primaryType: "LoginMessage"');

// 4) Ensure message is annotated as LoginMessage
if (/const\s+message\s*:\s*{/.test(s)) {
  s = s.replace(/const\s+message\s*:\s*{[\s\S]*?}\s*=\s*{/, "const message: LoginMessage = {");
} else {
  s = s.replace(/const\s+message\s*=\s*{/, "const message: LoginMessage = {");
}

// 5) Save
writeFileSync(p, s);

export default function DefaultExport(){ return null }
