function openDialogSucsess() {
  const dialogSucsess = document.querySelector('[data-dialog-sucsess]')
  const dialogForm = document.querySelector('[data-dialog-form]')
  dialogSucsess.classList.remove('not-active')
  dialogForm.classList.add('not-active')
}

function openDialogForm() {
  document.getElementById("openDialog").classList.remove("close-form-container");
  document.getElementById("openDialog").classList.add("open-form-container");
  //  document.body.style.position = 'fixed';
  //  document.body.style.width = '100%';
}

function closeDialofForm() {
  document.getElementById("openDialog").classList.remove("open-form-container");
  document.getElementById("openDialog").classList.add("close-form-container");
  //  document.body.style.position = '';
}
