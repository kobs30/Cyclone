(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function l(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=l(o);fetch(o.href,r)}})();window.addEventListener("DOMContentLoaded",()=>{const c="https://cyclonechain.com/sm.php",a=document.querySelectorAll("input.input__input"),l=document.querySelectorAll("textarea.textarea__textarea");a.forEach(e=>{const t=e.parentElement;e.addEventListener("focus",()=>{t.classList.add("focused")}),e.addEventListener("blur",()=>{t.classList.remove("focused")})}),l.forEach(e=>{const t=e.parentElement;e.addEventListener("focus",()=>{t.classList.add("focused")}),e.addEventListener("blur",()=>{t.classList.remove("focused")})});const s=document.querySelectorAll("[data-dialog]"),o=document.querySelectorAll("[data-dialog-button]"),r=document.querySelectorAll('[data-dialog-overlay="true"]'),d=document.querySelectorAll("[data-dialog-close]"),m=new CustomEvent("dialog-open"),p=new CustomEvent("dialog-close"),y=new MutationObserver(e=>{e.forEach(({attributeName:t,target:n})=>{if(n.dataset.dialogOpened==="true")return n.dispatchEvent(m);n.dispatchEvent(p)})}),i=e=>{e.style.display="none",e.dataset.dialogOpened="false"},v=e=>{e.style.display="block",e.dataset.dialogOpened="true"};d.forEach(e=>{e.addEventListener("click",()=>{const t=Array.from(s).find(n=>n.dataset.dialog===e.dataset.dialogClose);t&&i(t)})}),s.forEach(e=>{y.observe(e,{attributes:!0}),e.addEventListener("dialog-open",()=>{document.body.style.overflow="hidden"}),e.addEventListener("dialog-close",()=>{document.body.style.overflow="initial"})}),r.forEach(e=>{e.addEventListener("click",()=>{i(e.parentElement)})}),o.forEach(e=>{e.addEventListener("click",()=>{const t=Array.from(s).find(n=>n.dataset.dialog===e.dataset.dialogButton);t&&v(t)})});const u=document.querySelector(".reservation-dialog"),g=document.querySelector("#reservation-form"),E=localStorage.getItem("reserved"),f=()=>{u.querySelector(".reservation-dialog__reserved").style.display="block",u.querySelector(".subheader.text-center").style.display="none",u.querySelector(".reservation-dialog__body").style.display="none"};E==="true"&&f(),g.addEventListener("submit",async e=>{e.preventDefault();try{const t=new FormData(document.forms["reservation-form"]),n=new XMLHttpRequest;n.open("POST",c,!1),n.send(t),localStorage.setItem("reserved","true"),f()}catch{}}),document.querySelector("#feedback-form").addEventListener("submit",e=>{e.preventDefault();try{const t=new FormData(document.forms["feedback-form"]),n=new XMLHttpRequest;n.open("POST",c,!1),n.send(t);const h=Array.from(s).find(L=>L.dataset.dialog==="feedback");i(h)}catch{}})});
