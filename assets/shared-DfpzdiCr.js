window.addEventListener("DOMContentLoaded",()=>{const r="https://cyclonechain.com/sm.php",s=document.querySelector(".feedback-dialog"),d=document.querySelector("#footer-form");d.addEventListener("submit",e=>{e.preventDefault();try{const t=new FormData(document.forms["footer-form"]);t.set("form","Subscribe");const o=new XMLHttpRequest;o.open("POST",r,!1),o.send(t),d.reset()}catch{}});const u=document.querySelectorAll("input.input__input"),f=document.querySelectorAll("textarea.textarea__textarea");u.forEach(e=>{const t=e.parentElement;e.addEventListener("focus",()=>{t.classList.add("focused")}),e.addEventListener("blur",()=>{t.classList.remove("focused")})}),f.forEach(e=>{const t=e.parentElement;e.addEventListener("focus",()=>{t.classList.add("focused")}),e.addEventListener("blur",()=>{t.classList.remove("focused")})});const n=document.querySelectorAll("[data-dialog]"),m=document.querySelectorAll("[data-dialog-button]"),v=document.querySelectorAll('[data-dialog-overlay="true"]'),p=document.querySelectorAll("[data-dialog-close]"),y=new CustomEvent("dialog-open"),g=new CustomEvent("dialog-close"),E=new MutationObserver(e=>{e.forEach(({attributeName:t,target:o})=>{t==="data-dialog-opened"&&(o.dataset.dialogOpened==="true"?o.dispatchEvent(y):o.dispatchEvent(g))})}),c=e=>{e.style.display="none",e.dataset.dialogOpened="false"},L=e=>{e.style.display="block",e.dataset.dialogOpened="true"};p.forEach(e=>{e.addEventListener("click",()=>{const t=Array.from(n).find(o=>o.dataset.dialog===e.dataset.dialogClose);t&&c(t)})}),n.forEach(e=>{E.observe(e,{attributes:!0}),e.addEventListener("dialog-open",()=>{document.body.style.overflow="hidden"}),e.addEventListener("dialog-close",()=>{document.body.style.overflow="initial"})}),v.forEach(e=>{e.addEventListener("click",()=>{c(e.parentElement)})}),m.forEach(e=>{e.addEventListener("click",()=>{const t=Array.from(n).find(o=>o.dataset.dialog===e.dataset.dialogButton);t&&L(t)})});const a=document.querySelector(".reservation-dialog"),b=document.querySelector("#reservation-form"),S=localStorage.getItem("reserved"),l=()=>{a.querySelector(".reservation-dialog__reserved").style.display="block",a.querySelector(".subheader.text-center").style.display="none",a.querySelector(".reservation-dialog__body").style.display="none"};S==="true"&&l(),b.addEventListener("submit",async e=>{e.preventDefault();try{const t=new FormData(document.forms["reservation-form"]);t.set("form","CoinPreBook");const o=new XMLHttpRequest;o.open("POST",r,!1),o.send(t),localStorage.setItem("reserved","true"),l()}catch{}});const i=document.querySelector("#feedback-form");s.addEventListener("dialog-close",()=>{s.classList.remove("response")}),i.addEventListener("submit",e=>{e.preventDefault();try{const t=new FormData(document.forms["feedback-form"]);t.set("form","Contacts");const o=new XMLHttpRequest;o.open("POST",r,!1),o.send(t),s.classList.add("response"),i.reset()}catch{}})});
