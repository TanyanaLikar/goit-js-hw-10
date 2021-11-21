import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import countryCard from './country-card.hbs'

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

input.addEventListener('input', debounce(onSearchCountry,DEBOUNCE_DELAY));


function onSearchCountry(event) {
    event.preventDefault();
    const form = event.target.value;
   

    fetchCountries()
    .then(renderCountriesCard)
    .catch(error => console.log(error));     
}

function fetchCountries(name) {
   return  fetch(`https://restcountries.com/v3.1/name/peru`)
   .then(response => {
       return response.json();
    });   
}

function renderCountriesCard(name) {
    const markup = countryCard(name);   
    countryList.innerHTML = markup;
}
