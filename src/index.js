import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import countryInfo from './country-info.hbs';
import countryList from "./country-list.hbs";

const DEBOUNCE_DELAY = 300;


const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onSearchCountry,DEBOUNCE_DELAY));


function onSearchCountry(event) {
    event.preventDefault();
    const countryInput = event.target.value.trim();   
  
    fetchCountries(countryInput)    
    .then(showCountry)
    .catch(onFetchError);
             
}

function renderCountryCard(country) {
    const markup = countryInfo(country);   
    countryInfoEl.innerHTML = markup;       
}

function renderCountriesList(countries) {
    countries.forEach(country => {
      const markup = countryList(country);
      countryListEl.insertAdjacentHTML('beforeend', markup);      
    });
  }
  function showCountry(countries) {
    if(countries.length <= 1){  
        clear()     
        renderCountryCard(countries);
        console.log(renderCountryCard())
    } 
    if(countries.length > 1 && countries.length <= 10){
        clear()
        renderCountriesList(countries)
    } 
    if(countries.length > 10) {
        clear()
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }  
  }
  function onFetchError(error) {
    clear();
    Notiflix.Notify.failure('Oops, there is no country with that name!!!');
  }
  function clear() {
    countryInfoEl.innerHTML = '';
    countryListEl.innerHTML = '';
  }