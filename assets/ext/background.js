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
