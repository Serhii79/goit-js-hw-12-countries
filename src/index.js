import './styles.css';
import fetchCountries from './fetchCountries';
import updateCountriesMarkup from './update-countries-markup';
import debounce from 'lodash.debounce';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';import '@pnotify/core/dist/BrightTheme.css';

const refs = {
    countriesUl: document.querySelector('.js-countries'),
    searchForm: document.querySelector('.js-search-form')
};

const errors = () => error({
    title: 'Warning!',
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 2000,
    closerHover: true,
});

const errorsFound = () => error({
    title: 'Warning!',
    text: 'Not found!',
    delay: 2000,
    closerHover: true,
});

// errors();
const debouncedFetchCountries = debounce(event => {
    event.preventDefault();

    // const form = event.currentTarget;
    // console.log(form);
    // const inputValue = form.elements.query.value;
    const inputValue = refs.searchForm.value;
    console.log(inputValue);
    refs.countriesUl.innerHTML = '';

    fetchCountries(inputValue).then((data) => {
        if (data.length > 10) {
            errors();            
        } else {
            if (data.status === 404) {
                errorsFound();
            } else {
                updateCountriesMarkup(data);
            }
        }
    }).catch(() => {
        if (refs.searchForm.value !== '') {
            errors();
       }
    });
}, 500);

refs.searchForm.addEventListener('input', debouncedFetchCountries);

// refs.searchForm.addEventListener('input', event => {
//     event.preventDefault();

//     const form = event.currentTarget;
//     const inputValue = form.elements.query.value;
//     refs.countriesUl.innerHTML = '';

//     fetchCountries(inputValue).then(updateCountriesMarkup);
// });

// const hanleInput = event => {
//     event.preventDefault();

//     const form = event.currentTarget;
//     const inputValue = form.elements.query.value;
//     refs.countriesUl.innerHTML = '';

//     fetchCountries(inputValue).then(updateCountriesMarkup);
// };

// refs.searchForm.addEventListener('input', hanleInput);