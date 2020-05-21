import {getCurrencySymbol, extractFormData} from "./utils";
import {jobTemplate} from "./templates";

export class JobSearch {
    constructor(
        searchFormSelector,
        resultsContainerSelector,
        loadingElementSelector,
    ) {
        this.searchForm = document.querySelector(searchFormSelector);
        this.resultsContainer = document.querySelector(resultsContainerSelector);
        this.loadingElement = document.querySelector(loadingElementSelector);
    }

    setCountryCode() {
        this.countryCode = 'gb';
        this.setCurrencyCode();

        fetch('http://ip-api.com/json')
            .then(results => results.json())
            .then(results => {
                this.countryCode = results.countryCode.toLowerCase();
              //  this.setCurrencySymbol();
            });
    }

    setCurrencyCode(){
        this.currencySymbol = getCurrencySymbol(this.countryCode);

    }



    configureFormListener(){
        this.searchForm.addEventListener('submit', (event)=>{
            event.preventDefault();
            this.resultsContainer.innerHTML = '';
            const {search, location} = extractFormData(this.searchForm);

/*            if (location === 'london'){
                this.countryCode = 'gb';
            }*/
            switch (location) {
                case 'london':
                    //Statements executed when the
                    //result of expression matches gb
                    this.countryCode = 'gb';
                    break;
                case 'arizona':
                    //Statements executed when the
                    //result of expression matches us
                    this.countryCode = 'us';
                    break;
                case 'montreal':
                    //Statements executed when the
                    //result of expression matches ca
                    this.countryCode = 'ca';
                    break;
                    default:
                    //Statements executed when none of
                    //the values match the value of the expression
                    this.countryCode = 'de';
                    break;
            }


           const searchURL = `http://localhost:7000/?search=${search}&location=${location}&country=${this.countryCode}`;
           // const searchURL = `http://localhost:7000/?search=php`;



            this.startLoading();
            fetch(searchURL)
                .then(response => response.json())
                .then(({results}) => {
                    this.stopLoading();
                    return results
                        .map(job => jobTemplate(job, this.currencySymbol))
                        .join('');
                })
                .then(jobs => this.resultsContainer.innerHTML = jobs)
                .catch(()=> this.stopLoading());
        });


    }

    startLoading(){
        this.loadingElement.classList.add('loading')
    }

    stopLoading(){
        this.loadingElement.classList.remove('loading')
    }
}
