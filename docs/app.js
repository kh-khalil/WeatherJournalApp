/* Global Variables */
const generate = document.getElementById('generate');
const city = document.getElementById('city');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '6fd0d8d8f6a15f72f4763189521cde7f';


generate.addEventListener('click', (e) => {
    const feeling = document.getElementById('feelings').value;
    const zipCode =  document.getElementById('zip').value;
    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = `${d.getMonth()+1}` + '.' + d.getDate() + '.' + d.getFullYear();
    
    getTemp(baseURL, zipCode, apiKey)
    .then(
        (data) =>
            postData('/addTemp', {city:data.name + ` City`, date:newDate, temp:data.main.temp + ` Fahrenheit`, feeling})
    )
    .then(
        updateUI
    )
    .catch((error) => {
        console.error(error);
        alert("Please enter a valid zipcode!");
    });
});

const getTemp = async (baseURL, zipCode, apiKey)=>{
    const res = await fetch(`${baseURL}${zipCode}&appid=${apiKey}&units=imperial`);
    // console.log(res);
    try {
        if (res.status === 404){
            alert("wrong zipCode");
            throw Error;
        }
        const data = await res.json(); // from JSON to variable
        console.log(data);
        return(data);
    } catch (error) {
        console.log("Wrong zip code!");
    }
}

/* POST example */
const postData = async ( url = '', data = {})=> {
    const res = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), //turns JS objs and JSON data into a string for our server to receive the information
    });
    const newData = await res.json();
    console.log(newData);
    return newData;
    
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      city.innerHTML = allData[allData.length-1].city;
      date.innerHTML = allData[allData.length-1].date;
      temp.innerHTML = allData[allData.length-1].temp;
      content.innerHTML = allData[allData.length-1].feeling;
  
    }catch(error){
    //   console.log("error", error);
      if (res.status === 404){
          alert("wrong zipCode");
      }
    }
}
