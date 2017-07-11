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

//chrome.runtime.onMessage.addListener(data => {
//	const code = `document.body.setAttribute('data-mac-address', "${data.mac}")`;
//	chrome.tabs.executeScript({ code });
//});
let mac,
	ip;

setMac = val => { 
	if (!val || val.split('_').length < 2) {
		return alert(`插件激活失败，请确认辅助程序已启动！`);
	}
	val = val.split('_');
	ip = val[0];
	mac = val[1];
	const code = `
		(function() {
			const ipDom = document.getElementById('login-form-ip'),
				macDom = document.getElementById('login-form-mac');
			if (ipDom) ipDom.value = '${ip}';
			if (macDom) macDom.value = '${mac}';
		})()
	`;
	chrome.tabs.executeScript({ code });
	alert(`激活插件成功! IP:${ip}, MAC:${mac}`);
};

chrome.runtime.onConnect.addListener(port => {
	port.onMessage.addListener(msg => {
		switch(msg.action) {
			case 'getMac':
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					const port = chrome.tabs.connect(tabs[0].id);
					port.postMessage({
						mac: mac,
						ip: ip
					});
				});
				break;
		}
	});
});


