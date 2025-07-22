import dotenv from "dotenv";


dotenv.config();

const rapidApiKey = 


const url = 'https://seeking-alpha.p.rapidapi.com/market/get-earnings-calendar?with_rating=false&currency=USD';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'cc1092c0f7msh3c32e5b541badf4p175daejsn4d01f33bd9ff',
    'x-rapidapi-host': 'seeking-alpha.p.rapidapi.com'
  }
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}