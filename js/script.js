


const baseURL="https://restcountries.com/v2";
let regions = [];

async function fetchingCountries(){
    try{
        const response = await fetch(`${baseURL}/all`);
        const result = await response.json();
        renderData(result)
        filterRegions(result)
    }catch(error){
        console.log("Fetch error" + error.message)
    }finally{
        console.log('Success!')
    }
}

fetchingCountries()



////////////////////  Render dates for html page


function renderData(data){
   
    if(data.length){
        data.forEach((value, index) => {
            let card = document.createElement('div');
            card.classList.add('countries-card');
    
            card.innerHTML = `
                
                <img class="countries-card__img" src="${value?.flag}" alt="flag">
               
                <div class="countries-card__body">
                    <h5 class="countries-card__body--name">${value?.name}</h5>
                    <ul class="countries-card__body--list">
                        <li>Population: <span>${value?.population.toLocaleString('en-US')}</span></li>
                        <li>Region: <span>${value?.region}</span></li>
                        <li>Capital: <span>${value?.capital ? value?.capital : '-'}</span></li>
                    </ul>
                </div>

                <a href="./country.html" target="_blank" class="countries-card__btn" data-fullname=${value?.name}>Details</a>
            `
           
            $(".countries-cards").append(card);
        })
    }
}




//////////////////// Select option for filter countries by name;

function filterRegions(data){
    if(data){
        let res= data.map(el => {
            return el.region
        })
        regions = Array.from(new Set(res))
        renderOption(regions)
    }
}

/////////// Render Options

function renderOption(data){
    if(data){
       data?.sort().forEach((el) => {
           const option = createElement('option', 'item', el);
           $(".countries-search__select").append(option)
       })
    }
}

////////////////// Input field for searching countries by name /////////////////


$(".countries-search__input--inp").addEventListener('keyup', (e) => {
    $(".countries-cards").innerHTML = "";
    fetchingSearch(e.target.value);
})

async function fetchingSearch(text){
    try{
        const response = await fetch(`${baseURL}/name/${text}`);
        const result = await response.json();
        renderData(result)

        if(!result.length){
            fetchingCountries()
        }
    }catch(error){
        console("Fetch error" + error.message)
    }finally{
        console.log('Success!')
    }
    
}


/////////  Show filtered regions

$(".countries-search__select").addEventListener('change', (e) => {
    $(".countries-cards").innerHTML = "";
    fetchingRegion(e.target.value);
})


async function fetchingRegion(region){
    try{
        const response = await fetch(`${baseURL}/region/${region}`);
        const result = await response.json();
        renderData(result)

        if(!result.length){
            fetchingCountries()
        }
    }catch(error){
        console("Fetch error" + error.message)
    }finally{
        console.log('Success!')
    }
    
}



/////// Dark and light mode



let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
    $("header").classList.add("header-mode-theme");
    $(".header__mode p").textContent = "Light Mode";
    $("body").classList.add("body-mode-theme");
    $(".countries-search__input").classList.add("card-mode-theme");
    $(".countries-search__select").classList.add("card-mode-theme");
    $$(".countries-card").forEach((value) => {
        value.classList.add("card-mode-theme");
    })
    $$(".countries-card__body").forEach((value) => {
        value.classList.add("card-mode-theme");
    })
    localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
    $("header").classList.remove("header-mode-theme");
    $(".header__mode p").textContent = "Dark Mode";
    $("body").classList.remove("body-mode-theme");
    $(".countries-search__input").classList.remove("card-mode-theme");
    $(".countries-search__select").classList.remove("card-mode-theme");
    $$(".countries-card").forEach((value) => {
        value.classList.remove("card-mode-theme");
    })
    $$(".countries-card__body").forEach((value) => {
        value.classList.remove("card-mode-theme");
    })
    localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
    enableDarkMode(); // set state of darkMode on page load
}

$(".header__mode").addEventListener("click", (e) => {
    darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
    if (darkMode === "disabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
});






$(".countries-cards").addEventListener('click', (e) => {
    if(e.target.classList.contains('countries-card__btn')){
        localStorage.setItem('fullname', e.target.getAttribute('data-fullname'))
    }
})