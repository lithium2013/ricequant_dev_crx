// export
sendEmail = (email, subject) => {
	chrome.tabs.create({
		url: `mailto:${email}?subject=[${subject}]`
	}, tab => {
		setTimeout(() => {
			chrome.tabs.remove(tab.id);
		}, 500);
	});
};

chrome.runtime.onMessage.addListener(data => {
	const code = `document.body.setAttribute('data-mac-address', "${data.mac}")`;
	chrome.tabs.executeScript({ code });
});