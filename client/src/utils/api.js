import axios from 'axios';

const BASE_URL = 'http://localhost:3333';
export {getPollData};
function getPollData() {
	const url = `${BASE_URL}/api/polls`;
	return axios.get(url).then(res=>res.data);
}