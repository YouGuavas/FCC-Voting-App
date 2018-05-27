import axios from 'axios';

const BASE_URL = 'http://localhost:3333';
export {getPollsData, vote, newPoll, getPollData};
function getPollsData(user) {
	//console.log(user);
	const url = `${BASE_URL}/api/polls`;
	return axios.post(url, user).then(res=>res.data);
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