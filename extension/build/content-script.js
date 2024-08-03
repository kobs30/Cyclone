document.getElementById('open').addEventListener('click', async () => {
  await chrome.runtime.sendMessage('open');
});
