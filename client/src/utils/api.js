import axios from 'axios';

const BASE_URL = 'http://localhost:3333';
export {getPollsData, vote, newPoll};
function getPollsData() {
	const url = `${BASE_URL}/api/polls`;
	return axios.get(url).then(res=>res.data);
}
function vote(poll) {
	const url = `${BASE_URL}/api/vote/${poll}`;
	axios.get(url);
}
function newPoll(title, options) {
	const url = `${BASE_URL}/api/newpoll`;
	axios.post(url, {
		title: title,
		options: options
	});
}