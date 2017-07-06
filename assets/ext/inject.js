//window.addEventListener('error', e => {
//    alert(`Uncaught js error : ${e.message}`)
//});

const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
	if (xhr.readyState === 4 && xhr.status === 200) {
		console.log(xhr.response, 'gg');
	}
};

xhr.open('GET', 'https://locolhost:10888', true);
xhr.send(null);