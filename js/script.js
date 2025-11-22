document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cidade = document.querySelector('#cidade').value;

    if (!cidade) {
        return alert('digita uma cidade seu preto');
    }

    const apiKey = '95f7eb33f31d0a5b62e6067e6b303307'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidade)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl)
    const json = await results.json();

    if (json.cod === 200) {
        showInfos({
            cidade: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            umidity: json.main.humidity,
        });
    } else {
        alert("Cidade não encontrada.")
    }
})

function showInfos(json) {
    document.querySelector('#title').innerHTML = `${json.cidade}, ${json.country}`;
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')}<sup>°C</sup>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')}<sup>°C</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')}<sup>°C</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.umidity}%`;
    
  
    document.querySelector('.weather').classList.add('active');
}