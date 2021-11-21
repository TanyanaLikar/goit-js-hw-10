import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import countryInfo from './country-info.hbs';
import countryList from "./country-list.hbs";

const DEBOUNCE_DELAY = 300;


const inputEl = document.querySelector('#search-box');
const countryListEL = document.querySelector('.country-list');
const countryInfoEL = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onSearchCountry,DEBOUNCE_DELAY));


function onSearchCountry(event) {
    event.preventDefault();
    const countryInput = event.target.value.trim();   

    fetchCountries(countryInput)
    .then(renderCountriesCard);
    if(countryInput === ''){
        inputEl.reset();
    }
    
         
}


function renderCountriesCard(country) {
    const markup = countryInfo(country);   
    countryInfoEL.innerHTML = markup;
}
function renderCountriesList(countries) {
    countries.forEach(country => {
      const markup = countryList(country);
      refs.countryList.insertAdjacentHTML('beforeend', markup);
    });
  }