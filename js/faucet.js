import "../assets/modulepreload-polyfill-B5Qt9EMX.js";
window.addEventListener("DOMContentLoaded", () => {
  const n = "https://faucet.cyclonechain.com/faucet.php?w=";
  document.querySelector("#faucet-form").addEventListener("submit", o => {
    o.preventDefault();
    try {
      const e = new FormData(document.forms["faucet-form"]),
        t = new XMLHttpRequest;
      t.open("POST", n + e.get("address"), !1), t.send(e), document.querySelector(".input__warning").href = "https://explorer.cyclonechain.com/transaction-search.html#" + JSON.parse(t.response).txHash, document.querySelector(".input__warning").style.visibility = "visible"
    } catch {}
  })
});
