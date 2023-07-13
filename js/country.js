

let fullNameCountry = localStorage.getItem('fullname');
const baseURL="https://restcountries.com/v2";

window.addEventListener('DOMContentLoaded', () => {
    getCountry(fullNameCountry);
})

async function getCountry(isName){
    try{
        const response = await fetch(`${baseURL}/name/${isName}?fullText=true`);
        const result = await response.json();
        console.log(result)
        renderCountry(result);
    }catch(error){
        console.log("Fetch error" + error.message)
    }finally{
        console.log('Success!')
    }
}


function renderCountry(data) {

    data.forEach((item) => {
        let card = document.createElement('div');
        card.classList.add('country-card');

        card.innerHTML = `
            
            <img class="country-card__img" src="${item.flag}" alt="flag">
            <div class="country-card__body">
                <h5 class="country-card__body--name">${item.name}</h5>
                <div class="country-card__body--info">
                    <ul>
                        <li> Native Name: <span>${item.nativeName}</span></li>
                        <li> Population:  <span>${item.population.toLocaleString('en-US')}</span></li>
                        <li> Region: <span>${item.region}</span></li>
                        <li> Sub Region: <span>${item.subregion}</span></li>
                        <li> Capital: <span>${item.capital}</span></li>
                    </ul>
                    <ul>
                        <li>Top Level Domain: <span>${item.topLevelDomain}</span></li>
                        <li>Currencies: <span>${item.currencies.map(value => value.name)}</span></li>
                        <li>Languages: <span>${item.languages.map(value => value.name)}</span></li>
                    </ul>
                </div>

                <div class="country-card__body--border">
                    <p>Border Countries: </p> ${item.borders.map(item => {
                        return `<span class="border-divide">${item}</span>`
                    })} 
                </div>
            </div>
        `
       
        $(".wrapper-country").append(card);
    })
}