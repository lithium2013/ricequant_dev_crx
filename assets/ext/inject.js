var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
  // 我们只接受来自我们自己的消息
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    port.postMessage({
		action: event.data.action 
	});
  }
}, false);

chrome.runtime.onConnect.addListener(port => {
	port.onMessage.addListener(msg => {
		if (!msg.ip || !msg.mac) {
			return alert('获取MAC/IP地址失败, 请激活插件或者手动输入！');
		}
		
		document.getElementById('login-form-ip').value = msg.ip;
		document.getElementById('login-form-mac').value = msg.mac;
		console.log(`IP: ${msg.ip}, mac: ${msg.mac}`);
	});
});