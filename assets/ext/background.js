let isInit = false; // is first

const cookieName = 'rqdev'; //debug cookies name
const cookieSplitMark = '_'; //cookies splite mark
const curState = {};

/**
 * init cookies values
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
const init = (cb = () => {}) => {
	chrome.cookies.getAll({
		name: cookieName
	}, cookies => {
		isInit = true;
		cookies.length && cookies[0].value && cookies[0].value.split(cookieSplitMark).forEach(v => curState[v] = true); //get all cookie and store in curState
		cb(curState);
	});
}

init();

/**
 * get cookie(json)
 * @return {[json]} [all cookie]
 */
const getCookie = () => new Promise(resolve => {
	isInit ? resolve(curState) : init((cookies) => resolve(cookies))
});

/**
 * set dev cookie
 * @param  {Function} )               [description]
 * @param  {[type]}   domain:         item.domain   [description]
 * @param  {[type]}   path:           '/'           [description]
 * @param  {[type]}   secure:         false         [description]
 * @param  {[type]}   httpOnly:       false         [description]
 * @param  {[type]}   expirationDate: Date.now()    +             24 * 60 * 60 * 1000		} [description]
 * @param  {[type]}   (               [description]
 * @return {[type]}                   [description]
 */
const setCookie = () => Promise.all(
	[{
		url: 'https://www.ricequant.com/',
		domain: '.www.ricequant.com'
	}, {
		url: 'http://www.r.com/',
		domain: '.www.r.com'
	}, {
		url: 'http://www.p.com/',
		domain: '.www.p.com'
	}, {
		url: 'http://www.naga.com/',
		domain: '.www.naga.com'
	}].map(item => new Promise(resolve => {
		chrome.cookies.set({
			url: item.url,
			name: cookieName,
			value: Object.keys(curState).filter(k => curState[k]).join(cookieSplitMark),
			domain: item.domain,
			path: '/',
			secure: false,
			httpOnly: false,
			expirationDate: Date.now() + 24 * 60 * 60 * 1000
		}, () => {
			resolve();
		});
	}))
);

const enable = type => (curState[type] = true, setCookie());
const disable = type => (curState[type] = false, setCookie());
const action = [disable, enable];

const eventList = {
	switch: data => {
		action[+data.status](data.type);
	}
};

chrome.runtime.onMessage.addListener(msg => eventList[msg.event](msg.data));

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

getSwitchStatus = getCookie;
