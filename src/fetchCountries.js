export default function fetchCounties(countryInput) {
    const BASE_URL  = `https://restcountries.com/v3.1`;
   
    return  fetch(`${BASE_URL}/name/${countryInput}`)
        .then(response => {
            if(!response.ok){
                throw new Error(response.status);
            }
            return response.json();
         });   
     
}

