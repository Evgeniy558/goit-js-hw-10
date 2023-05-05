API_URL = 'https://restcountries.com/v3.1/name/';
import Notiflix from 'notiflix';

export function fetchCountries(nameOfCountry) {
  return fetch(
    `${API_URL}${nameOfCountry}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
    }
    return response.json();
  });
}
