import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import fetchCounties from "./fetchCountries";
import countryInfoMarkup from './countryInfoBuilder.hbs'
import countryListMarkup from "./countryListBuilder.hbs";


const inputEl = document.querySelector('#search-box')
const countryListEl = document.querySelector('.country-list')
const countryContainerEl = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY))



function searchCountry(event) {
    clearElements()
    const countryInput = event.target.value.trim();
    if (countryInput === "") {
        return
    }
    fetchCounties(countryInput)
        .then(showCountry)
        .catch(error => {
            Notify.failure("Oops, there is no country with that name")
            clearElements()
            console.log(error);
        })
}
function showCountry(countries){
  
    if (countries.length > 10) {
        return Notify.info("Too many matches found. Please enter a more specific name.")
    }
    if (countries.length === 1) {
        countryContainerBuilder(countries)
        return
    }
    if (countries.length > 1 || countries.length <= 10) {
        countryListBuilder(countries)
        return
    }

}
function countryContainerBuilder(countries) {
    countryContainerEl.insertAdjacentHTML('beforeend', countryInfoMarkup(countries))
}

function countryListBuilder(countries) {
    countryListEl.insertAdjacentHTML('beforeend', countryListMarkup(countries))
}

function clearElements() {
    countryListEl.innerHTML = ""
    countryContainerEl.innerHTML = ""
}
