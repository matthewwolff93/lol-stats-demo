import axios from 'axios';

export function fetchApiData(subUrl) {
	// Need this proxy to prevent CORS issue with GET request
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const apiKey = process.env.REACT_APP_API_KEY;
	const url = `https://oc1.api.riotgames.com/lol/${subUrl}/?api_key=${apiKey}`;

	return axios.get(proxyUrl + url);
}
