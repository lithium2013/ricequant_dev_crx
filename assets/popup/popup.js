const bg = chrome.extension.getBackgroundPage();

$('.js-feedback').on('click', () => {
    bg.sendEmail('lithium@ricequant.com', 'Ricequant MAC Address Tool Feedback');
});