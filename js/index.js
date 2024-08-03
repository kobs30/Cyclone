import "../assets/modulepreload-polyfill-B5Qt9EMX.js";
import "../assets/shared-DyXCX77j.js";
window.addEventListener("DOMContentLoaded", () => {
  const t = new XMLHttpRequest;
  t.open("GET", "https://cyclonechain.com/wallet_approved_tokens/testnetstat.php", !1), t.send(null);
  const o = JSON.parse(t.responseText),
    l = document.querySelector("#total-wallets"),
    n = document.querySelector("#total-wallets-mobile"),
    a = document.querySelector("#total-tx"),
    s = document.querySelector("#total-tx-mobile");
  [a, s].forEach(e => {
    e.textContent = o.total_transactions
  }), [l, n].forEach(e => {
    e.textContent = o.total_wallets
  })
});
