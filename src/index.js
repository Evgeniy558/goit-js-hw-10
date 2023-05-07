import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';
import Notiflix from 'notiflix';

const inputEl = document.getElementById('search-box');
const ulEl = document.querySelector('.country-list');

const divEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

function creatListOfCountries(countries) {
  ulEl.innerHTML = '';
  countries.forEach(({ flags, name }) => {
    const liEl = document.createElement('li');
    liEl.innerHTML = `<img width="20px" height="20px"
    src='${flags.svg}'/> <span style=padding-left:20px; font-size:20px>${name.official}</span>`;
    return ulEl.prepend(liEl);
  });
}

function creatCountryInfo(countries) {
  ulEl.innerHTML = '';
  let country = countries[0];
  const { capital, name, population, flags, languages } = country;
  let languageArray = [];
  for (const language in languages) {
    languageArray.push(languages[language]);
  }
  divEl.style.display = 'flex';
  divEl.style.flexDirection = 'column';
  divEl.innerHTML = `<p style=display:flex;gap:15px;align-items:center;padding-left:20px;font-size:40px;font-weight:700> <img width="40px" height="40px" 
    src='${flags.svg}'/> ${name.official}</p>
    <p style=padding-left:20px;font-weight:700;font-size:20px;margin:5px>Capital: <span style=font-weight:400>${capital}</span></p>
    <p style=padding-left:20px;font-weight:700;font-size:20px;margin:5px>Population: <span style=font-weight:400> ${population}</span></p>
    <p style=padding-left:20px;font-weight:700;font-size:20px;margin:5px>Languages:<span style=font-weight:400> ${languageArray.join(
      ', '
    )}</span></p>
    `;
}

inputEl.addEventListener(
  'input',
  debounce(ev => {
    let nameOfCountry = ev.target.value.trim();
    fetchCountries(nameOfCountry).then(countries => {
      if (countries.length > 10) {
        divEl.innerHTML = '';
        ulEl.innerHTML = '';
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (10 >= countries.length && countries.length >= 2) {
        divEl.innerHTML = '';
        creatListOfCountries(countries);
      } else {
        creatCountryInfo(countries);
      }
    });
  }, DEBOUNCE_DELAY)
);
