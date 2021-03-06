const bg = chrome.extension.getBackgroundPage();

$('.js-feedback').on('click', () => {
    bg.sendEmail('lithium@ricequant.com', 'Ricequant MAC Address Tool Feedback');
});

const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:10888", true);
xhr.onreadystatechange = () => {
	if (xhr.readyState == 4 && xhr.status === 200) {
		const res = bg.setMac(xhr.responseText);
		document.getElementById('ip-addr').innerText = res.ip;
		document.getElementById('mac-addr').innerText = res.mac;
	}
};
xhr.send();