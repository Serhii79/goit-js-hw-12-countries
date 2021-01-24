import countryTpl from './templates/country.hbs';
import countriesTpl from './templates/countries.hbs';

const refs = {
    countriesUl: document.querySelector('.js-countries')
    // searchForm: document.querySelector('.js-search-form')
};

function updateCountriesMarkup(countries) {
    console.log(countries.length);
    const massObject = Object.values(countries);
    console.log(massObject);
    for (const countriesItem of massObject) {
        console.log(countriesItem.name);
    };
    if (countries.length > 1) {
        const markup = countriesTpl(countries);
        refs.countriesUl.insertAdjacentHTML('beforeend', markup);
    } else {
        const markup = countryTpl(countries);
        refs.countriesUl.insertAdjacentHTML('beforeend', markup)
    };
};

export default updateCountriesMarkup;