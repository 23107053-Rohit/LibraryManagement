// ---- Data (replace with API / database calls later) ----
const navItems = [
  ["⌂", "Dashboard"], ["▯", "Books"], ["⇄", "Books Circulation"], ["?", "Books Requests"],
  ["☺", "Members"], ["▤", "Publishers"], ["✎", "Authors"], ["★", "Membership Plan"],
  ["✉", "Subscriptions"], ["☻", "Users"], ["⛨", "Roles & Permission"], ["!", "Penalties"], ["⚙", "Settings"]
];

const stats = [
  { label: "Total Books", value: 142, color: "var(--blue)", icon: "▯" },
  { label: "Total Members", value: 44, color: "var(--green)", icon: "☺" },
  { label: "Issued Books", value: 28, color: "var(--cyan)", icon: "⇄" },
  { label: "Reserved Books", value: 13, color: "var(--amber)", icon: "★" },
  { label: "Overdue Books", value: 27, color: "var(--red)", icon: "!" }
];

const circulation = [
  { label: "Issued Books", value: 28, color: "#00c4f0" },
  { label: "Reserved Books", value: 13, color: "#fbd000" },
  { label: "Overdue Books", value: 27, color: "#ef4a3c" }
];

const books = [
  ["Karim Jannat", "Don Alvard", "Hq Publication", 90],
  ["Abdul Samad", "Mac John", "Fajeri", 90],
  ["Will Sameed", "Asif Mahmud", "NT Publication", 90],
  ["Azaduzzaman mia", "Den Carlegy", "Cheq Publication", 90],
  ["Hosneyara Gulbahar", "Mahmud Shohag", "NT Publication", 90],
  ["Asif Mahmud", "Asif Al Amin", "Haque", 90],
  ["Dee Hassive", "Haimon Amin", "Self publication", 90],
  ["Ben Ducking", "Munzarin Shaid", "Fajeri", 90],
  ["Sumiya Rahman Kasif", "Ayman Sadiq", "Hq Publication", 90],
  ["Ashik Mahmud", "Alvard Thomas", "Fajeri", 90]
];

// ---- Sidebar ----
const nav = document.getElementById("nav");
nav.innerHTML = navItems.map(([icon, name], i) =>
  `<a href="#" class="${i === 0 ? "active" : ""}"><span class="ico">${icon}</span>${name}</a>`
).join("");

nav.addEventListener("click", e => {
  const link = e.target.closest("a");
  if (!link) return;
  e.preventDefault();
  nav.querySelectorAll("a").forEach(a => a.classList.remove("active"));
  link.classList.add("active");
  document.getElementById("sidebar").classList.remove("open");
});

document.getElementById("menuBtn").addEventListener("click", () =>
  document.getElementById("sidebar").classList.toggle("open"));

// ---- Stat cards ----
document.getElementById("stats").innerHTML = stats.map(s =>
  `<div class="stat" style="--c:${s.color}">
     <div class="badge">${s.icon}</div>
     <strong>${s.value}</strong><span>${s.label}</span>
   </div>`
).join("");

// ---- Donut chart ----
const total = circulation.reduce((sum, c) => sum + c.value, 0);
const r = 78, circ = 2 * Math.PI * r;
let offset = 0;
document.getElementById("donut").innerHTML = circulation.map(c => {
  const len = (c.value / total) * circ;
  const seg = `<circle cx="100" cy="100" r="${r}" stroke="${c.color}"
    stroke-dasharray="${len} ${circ - len}" stroke-dashoffset="${-offset}"/>`;
  offset += len;
  return seg;
}).join("");

document.getElementById("legend").innerHTML = circulation.map(c =>
  `<span><i style="background:${c.color}"></i>${c.label}</span>`).join("");

// ---- Table ----
document.getElementById("rows").innerHTML = books.map(([name, author, pub, pct]) =>
  `<tr>
     <td>${name}</td><td>${author}</td><td>${pub}</td>
     <td><div class="bar"><div><i style="width:${pct}%"></i></div><small>${pct}%</small></div></td>
   </tr>`
).join("");
