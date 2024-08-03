chrome.runtime.onMessage.addListener((request) => {
  if (request === 'open') {
    chrome.windows.getCurrent(async (w) => {
      const width = 360;
      const height = 600;
      const left = w.width / 2 - width / 2;
      const top = w.height / 3 - height / 2;

      await chrome.windows.create(
        {
          width,
          height,
          top,
          left,
          focused: true,
          type: 'popup',
          url: 'index.html',
        },
        async () => {
          await chrome.storage.local.set({
            request,
          });
        }
      );
    });
  }
});
