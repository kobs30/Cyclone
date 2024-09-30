const r = "https://cyclonechain.com/sm.php",
    s = document.querySelector(".feedback-dialog"),
    d = document.querySelector("#footer-form");
  d.addEventListener("submit", e => {
    e.preventDefault();
    try {
      const t = new FormData(document.forms["footer-form"]);
      t.set("form", "Subscribe");
      const o = new XMLHttpRequest;
      o.open("POST", r, !1), o.send(t), d.reset()
    } catch {}
  });