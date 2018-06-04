import axios from 'axios';

const BASE_URL = 'http://localhost:3333';
export {getPollsData, getMyPollsData, vote, newPoll, getPollData, deleteMe, addOptionToPoll};
function getPollsData() {
	//console.log(user);
	const url = `${BASE_URL}/api/polls`;
	return axios.get(url).then(res=>res.data);
}
function addOptionToPoll(_id, option) {
	const url = `${BASE_URL}/api/updatepoll`;
	return axios.post(url, {
		_id: _id,
		option: option
	}).then(res=>res.data);
}
function getMyPollsData(user) {
	//console.log(user);
	const url = `${BASE_URL}/api/mypolls`;
	return axios.post(url, user).then(res=>res.data);
}
function deleteMe(poll, cb) {
	const url = `${BASE_URL}/api/delete/${poll}`;
	axios.get(url)
		.then(() => {
					cb();
			})
		.catch(o_O => {
			console.log(o_O);
		})
}
function getPollData(poll) {
	const url = `${BASE_URL}/api/poll/${poll}`;
	return axios.get(url);
}
function vote(poll) {
	const url = `${BASE_URL}/api/vote/${poll}`;
	axios.get(url);
}
function newPoll(title, user, options) {
	const url = `${BASE_URL}/api/newpoll`;
	axios.post(url, {
		id: user.id,
		email: user.email,
		title: title,
		options: options
	});
}