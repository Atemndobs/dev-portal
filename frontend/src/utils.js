export const getCurrencySymbol = countryCode => {
    const currencies = {
        gb: '£',
        de: '€',
        au: 'A$',
        ca: '$',
        us: '$',

    };
    return currencies[countryCode];
};


export const extractFormData = form => Array
.from(form.elements)
.reduce((acc, {id, value}) => ({...acc, [id]: value}), {});
