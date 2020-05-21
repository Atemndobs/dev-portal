
const createServer = require('http').createServer;
const url = require('url');
const axios = require('axios');
const chalk = require('chalk');
const config = require('./config');


const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET'
};

/// ?search=php&location=dusseldorf

const decodeParams = searchParams => Array
    .from(searchParams.keys())
    .reduce((acc, key) => ({...acc, [key]: searchParams.get(key)}), {});

const server = createServer((req, res) => {
    const requestURL = url.parse(req.url);


    // {search: 'php, 'location: dusseldorf}
    const decodedParams = decodeParams(new  URLSearchParams(requestURL.search));

    const {search = 'php', location = 'dusseldorf', country = 'de'} = decodedParams;

   // const targetURL = `${config.BASE_URL}/${country.toLowerCase()}/${config.BASE_PARAMS}&app_id=${config.API_ID}&app_key=${config.API_KEY}&what=${search}$where=${location}`;

    // SEARCH_URL: 'https://api.adzuna.com/v1/api/property/gb/search/1?app_id={YOUR_APP_ID}&app_key={YOUR_APP_KEY}',
    //              https://api.adzuna.com/v1/api/jobs/de/search/1?app_id=f2a5ddf6&app_key=ff8cda3fe673b86f9365a7573bf46834&results_per_page=20&what=php&where=dusseldorf
    //              https://api.adzuna.com/v1/api/jobs/de/search/1?app_id=f2a5ddf6&app_key=ff8cda3fe673b86f9365a7573bf46834&results_per_page=20&what=php$where=dusseldorf
    //              https://api.adzuna.com/v1/api/jobs/de/search/1?app_id=f2a5ddf6&app_key=ff8cda3fe673b86f9365a7573bf46834&results_per_page=20&what=php&where=dusseldorf

     const searchURL = `${config.BASE_URL}/${country.toLowerCase()}/search/1?app_id=${config.API_ID}&app_key=${config.API_KEY}&results_per_page=20&what=${search}$where=${location}`;

     // const staticURL = 'https://api.adzuna.com/v1/api/jobs/de/search/1?app_id=f2a5ddf6&app_key=ff8cda3fe673b86f9365a7573bf46834&results_per_page=20&what=php&where=dusseldorf';
      const staticURL = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=f2a5ddf6&app_key=ff8cda3fe673b86f9365a7573bf46834&results_per_page=20&what=${search}&where=${location}`;

    if (req.method === 'GET'){
        console.log(chalk.green(staticURL));
        axios.get(staticURL)
            .then(response =>{
                res.writeHead(200, headers);
                res.end(JSON.stringify(response.data));
            })
            .catch(error => {
                console.log(chalk.red(error));
                res.writeHead(500, headers);
                res.end(JSON.stringify(error));
            })
    }
});

const PORT = '7000';
server.listen
(PORT, () => {
    console.log(chalk.yellow('Server Listening on port: '+PORT));
    console.log('http://localhost:7000?search=')
});
