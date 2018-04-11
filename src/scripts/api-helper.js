import axios from 'axios';

export function fetchApiData(subUrl) {
	// Need this proxy to prevent CORS issue with GET request
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	// TODO: Hide api key
	const apiKey = 'RGAPI-1b1f38f9-e123-4b9b-a02b-4d414167b8e3'
	const url = `https://oc1.api.riotgames.com/lol/${subUrl}/?api_key=${apiKey}`;

	return axios.get(proxyUrl + url);
}