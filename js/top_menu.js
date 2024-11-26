function openDialogSucsess(){
	const dialogSucsess=document.querySelector('[data-dialog-sucsess]')
	const dialogForm = document.querySelector('[data-dialog-form]')
	dialogSucsess.classList.remove('not-active')
	dialogForm.classList.add('not-active')
}

function openDialogForm() {
		 
		document.getElementById("openDialog").classList.remove("close-form-container");
      document.getElementById("openDialog").classList.add("open-form-container");
	}

	function closeDialofForm(){
		document.getElementById("openDialog").classList.remove("open-form-container");
      document.getElementById("openDialog").classList.add("close-form-container");
	}
	
    document.addEventListener('DOMContentLoaded', () => {
      const formPopup = document.getElementById('popupForm');
      const successPopup = document.getElementById('successPopup');
      const closeFormPopup = document.getElementById('closeFormPopup');
      const closeSuccessPopup = document.getElementById('closeSuccessPopup');
      const infinityForm = document.getElementById('infinityForm');
		

    });
