// JavaScript Document

// Tabs
const tabs = document.querySelectorAll('[data-tab]')
const forms = document.querySelectorAll('[data-form]')
tabs.forEach((item) => {
  item.addEventListener('click', (e) => {
    tabs.forEach((item) => {
      item.classList.remove("active-tab")
    })
    e.target.classList.add("active-tab")
    let dataAttribute = e.target.getAttribute('data-tab')
    const form = document.getElementById(dataAttribute)
    forms.forEach((item) => {
      item.classList.remove("active-form")
    })
    form.classList.add("active-form")
  })
})

// Close form Wallet Connect
function closeWalletForm() {
  document.querySelector('[data-connect-wallet]').classList.remove("active-popup")
}

function openWalletForm() {
  document.querySelector('[data-connect-wallet]').classList.add("active-popup")
}

// Selection
const dataSelect = document.querySelectorAll('[data-select]')
dataSelect.forEach((item) => {
  item.addEventListener('click', (e) => {
    let dataAttributeSelect = e.target.getAttribute('data-select')
    document.getElementById(dataAttributeSelect).classList.toggle("active-form")
  })
})
