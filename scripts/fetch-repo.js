import fs from "fs";
import fetch from "node-fetch";
import 'dotenv/config';

const token = process.env.GH_TOKEN;
if (!token) {
  console.error("❌ No GH_TOKEN found. Please set it in .env or your environment.");
  process.exit(1);
}

const repos = [
  { owner: "abbasmoosajee07", name: "challenge_utils" },
  { owner: "abbasmoosajee07", name: "AlgoVault" },
  { owner: "abbasmoosajee07", name: "PlasmaGasifierDP" },
  { owner: "abbasmoosajee07", name: "TuringMachineSim" },
  { owner: "abbasmoosajee07", name: "AdventofCode" },
  { owner: "abbasmoosajee07", name: "cryptopals" },
  { owner: "abbasmoosajee07", name: "EverybodyCodes" }
];

const GITHUB_TOKEN = process.env.GH_TOKEN; // put in .env.local, never commit

async function fetchRepo(owner, name) {
  const url = `https://api.github.com/repos/${owner}/${name}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  });
  if (!res.ok) throw new Error(`Failed to fetch ${owner}/${name}`);
  const data = await res.json();

  const filename = `data/${owner}_${name}.json`;
  fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`✅ Wrote ${filename}`);
}

(async () => {
  for (const repo of repos) {
    await fetchRepo(repo.owner, repo.name);
  }
})();

