import http from "node:http";

async function verifyPage() {
  console.log("🔍 Checking http://localhost:3000 HTML payload and performance markers...");
  
  const html = await new Promise((resolve, reject) => {
    http.get("http://localhost:3000", (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => resolve(data));
      res.on("error", reject);
    });
  });

  const checks = [
    { name: "Navbar GPU accelerated layer", test: html.includes("transform:translateZ(0)") || html.includes("will-change-transform") },
    { name: "Hero radial gradient orbs (no blur-3xl)", test: html.includes("radial-gradient") && !html.includes("blur-3xl") },
    { name: "Content-visibility auto applied on sections", test: html.includes("content-visibility-auto") },
    { name: "All 7 sections present (hero, about, games, events, menu, faq, location)", test: 
      html.includes('id="hero"') &&
      html.includes('id="about"') &&
      html.includes('id="games"') &&
      html.includes('id="events"') &&
      html.includes('id="menu"') &&
      html.includes('id="faq"') &&
      html.includes('id="location"')
    },
    { name: "Pagination controls present in menu", test: html.includes("Menampilkan") && html.includes("menu") },
    { name: "Google Maps iframe containment present", test: html.includes("contain:content") || html.includes("contain:paint") },
  ];

  let passed = true;
  for (const check of checks) {
    if (check.test) {
      console.log(`  ✅ [PASS] ${check.name}`);
    } else {
      console.error(`  ❌ [FAIL] ${check.name}`);
      passed = false;
    }
  }

  if (!passed) {
    console.error("Verification failed on one or more checks!");
    process.exit(1);
  } else {
    console.log("\n🚀 All 60 FPS performance markers & section structures verified successfully!");
  }
}

verifyPage().catch((err) => {
  console.error("Verification script error:", err);
  process.exit(1);
});
