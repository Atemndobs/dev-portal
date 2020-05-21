// Main



import {JobSearch} from "./JobSearch";



// params in job search class are the css classes / ids

const jobSearch = new JobSearch('#search-form', '.result-container', '.loading-element');



jobSearch.setCountryCode();
jobSearch.configureFormListener();

