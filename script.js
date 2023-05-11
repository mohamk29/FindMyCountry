'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function(data, className = ''){
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
      `;
      countriesContainer.insertAdjacentHTML('beforeend',html);
      countriesContainer.style.opacity = 1;
}

const renderError = function(msg){
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
}

///////////////////////////////////////
/*
const getCountryData = function (country){
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/name/${country}`);
request.send();

request.addEventListener('load', function(){
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend',html);
    countriesContainer.style.opacity = 1;
})
}

getCountryData('saudi arab');
getCountryData('pakistan');
getCountryData('afghanistan');
*/



/*
const getCountryAndNeighbour = function (country){
    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();
    
    request.addEventListener('load', function(){
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        // Render country 1
        renderCountry(data);

        // Get neighbour country (2)
        const [neighbour] = data.borders;

        if(!neighbour) return;

        // AJAX call country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
        request2.send();

        request2.addEventListener('load', function(){
            const data2 = JSON.parse(this.responseText);
            console.log(data2);

            renderCountry(data2, 'neighbour');
        })
    })
}

    //getCountryAndNeighbour('saudi');
*/
    

    /*--------------------PROMISE METHOD----------------*/
    // const request = new XMLHttpRequest();
    // request.open('GET', `https://restcountries.com/v2/name/${country}`);

    // const request = fetch(`https://restcountries.com/v2/name/afghanistan`);
    // console.log(request);

    // const getCountryData = function(country){
    //   fetch(`https://restcountries.com/v2/name/${country}`)
    //   .then(function(response){
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then(function(data){
    //     console.log(data);
    //     renderCountry(data[0]);
    //   })
    // }

    
/* Simpler version of Promis*/
    // const request = fetch(`https://restcountries.com/v2/name/afghanistan`);
    // console.log(request);

    // const getCountryData = function(country){
    //   fetch(`https://restcountries.com/v2/name/${country}`)
    //   .then(response => response.json())
    //   .then(data => renderCountry(data[0]));
    // };

    // getCountryData('afghanistan');

    // -----FLAT CHAIN OF PROMIS (Better than callback hell)------

    // const request = fetch(`https://restcountries.com/v2/name/afghanistan`);


//////NO HELPER FUNCTION SIMPLE VERSION///////
    // const getCountryData = function(country){
    //   fetch (`https://restcountries.com/v2/name/${country}`).then(function(response) 
    //   {
    //     if(!response.ok){
    //       throw new Error(`Country not found ${response.status})`);
    //     }
    //     return response.json();

    //   }).then(function(data){
    //     renderCountry(data[0]);

    //     console.log(data);
    //     // const neighbour = data[0].borders[0];
    //     const neighbour = 'fdsre';
    
    //     if(!neighbour) return;

    //     //Country 2
    //     return fetch(`https://restcountries.com/v2/name/${neighbour}`);
    //   })
    //   .then(function(response){
    //     if(!response.ok){
    //       throw new Error(`Country not found ${response.status})`);
    //     }
    //     return response.json();
    //   })
    //   .then(function(data){
    //     renderCountry(data[0], 'neighbour');
    //   }).catch(function(err){
    //     console.log(`${err} 🧨 🧨 🧨`);
    //     renderError(`Something went wrong 🧨 🧨 🧨 ${err.message}. Try again!`)
    //   })
    //   .finally(function(){
    //     countriesContainer.style.opacity = 1;
    //   })
    // }


    const getJSON = function(url, errMsg = 'Something went wrong'){
      return fetch(url).then(function(response)
      {
        if(!response.ok){
          throw new Error(`${errMsg} (${response.status})`);
        }
        return response.json();
      });
    }

    // const getCountryData = function(country){
    //   //Country 1
    //   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found').then(function(data){
    //     renderCountry(data[0]);
    //     const neighbour = data[0].borders[0];
        
    //     if(!neighbour){
    //       throw new Error('No neighbour found!');
    //     }

    //     //Country 2
    //     return getJSON(`https://restcountries.com/v2/name/${neighbour}`, 'Country not found');
    //   })
    //   .then(function(data){
    //     renderCountry(data[0], 'neighbour');
    //   })
    //   .catch(function(err){
    //     console.log(`${err} 🧨 🧨 🧨`);
    //     renderError(`Something went wrong 🧨 🧨 🧨 ${err.message}. Try again!`)
    //   })
    //   .finally(function(){
    //     countriesContainer.style.opacity = 1;
    //   })
    // }

  // btn.addEventListener('click', function(){
  //   getCountryData('pakistan');
  // })
  

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
/*
const whereAmI = function(lat,lng){
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  .then(function(response){
    if(!response.ok){
      throw new Error(`Problem with geocoding ${res.status}`);
    }
      return response.json();
  })
  .then(function(data){
      console.log(data);
      console.log(`You are in ${data.city} ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
  })
  .then(function(response){
    if(!response.ok){
      throw new Error(`Country not found ${response.status})`);
    }
    return response.json();
  })
  .then(function(data){
    renderCountry(data[0]);
  })
  .catch(function(err){
    console.log(`${err.message} 🧨`);
  })
}

whereAmI(52.508,13.381);
whereAmI(19.037,72.873);
whereAmI(-33.933,18.474);
*/

/*
////////////////Event loop Lecture////////
console.log('Test start');
setTimeout(function(){
  console.log('0 sec timer');
},0);
Promise.resolve('Reolved promise 1').then(function(response){
  console.log(response);
})

Promise.resolve('Resolved promise 2').then(function(response){
  for(let i = 0; i < 10000; i++){
    console.log(response);
  }
})
console.log('Test end');


const lotteryPromise = new Promise(function(resolve, reject){
  console.log('Lottery draw is happening 🔮');
  setTimeout(function(){
    if(Math.random() >= 0.5){
      resolve('YOU WIN 💰');
    }
    else{
      reject(new Error ('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(function(response){
  console.log(response);
}).catch(function(err){
  console.log(err);
})

//Promisifying setTimeout
const wait = function(seconds){
  return new Promise(function(resolve){
    setTimeout(resolve, seconds * 1000);
  })
}

wait(2).then(function(){
  console.log('1 second passed');
  return wait(1);
}).then(function(){
  console.log('2 seconds passed');
  return wait(1);
}).then(function(){
  console.log('3 seconds passed');
  return wait(1);
}).then(function(){
  console.log('4 seconds passed');
})

Promise.resolve('abc').then(function(response){
  console.log(response);
});

Promise.reject(new Error ('Oh no')).catch(function(err){
  console.log(err);
})
*/

// navigator.geolocation.getCurrentPosition(function(position,err){
//   console.log(position);
//   console.log(err);
// });

// console.log('Getting position');

// const getPosition = function(){
//   return new Promise(function(resolve, reject){
//     navigator.geolocation.getCurrentPosition(function(position, err){
//       resolve(position);
//       reject(err);
//     })
//   })
// }
/*
//////TAKE the geolocation of the user and display their country using Promises/////
const getPosition = function(){
  return new Promise(function(resolve, reject){
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

// getPosition().then(function(position){
//   console.log(position);
// })

const whereAmI = function(){

  getPosition().then(function(position){
    const {latitude : lat , longitude : lng} = position.coords;

    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  })
  .then(function(response){
    if(!response.ok){
      throw new Error(`Problem with geocoding ${res.status}`);
    }
      return response.json();
  })
  .then(function(data){
      console.log(data);
      console.log(`You are in ${data.city} ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
  })
  .then(function(response){
    if(!response.ok){
      throw new Error(`Country not found ${response.status})`);
    }
    return response.json();
  })
  .then(function(data){
    renderCountry(data[0]);
  })
  .catch(function(err){
    console.log(`${err.message} 🧨`);
  })
}

btn.addEventListener('click', whereAmI());
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/


/*
const imgContainer = document.querySelector('.images');

const wait = function(seconds){
  return new Promise(function(resolve){
    setTimeout(resolve, seconds * 1000);
  })
}

const createImage = function(imgPath){
  return new Promise(function(resolve,reject){
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function(){
      imgContainer.append(img);
      resolve(img);
    })

    img.addEventListener('error', function(){
      reject(new Error('Image not found'))
    })
  })
}

let currentImg;
createImage('img/img-1.jpg').then(function(response){
  currentImg = response;
  console.log('Image 1 loaded');
  return wait(2);
})
.then(function(){
  currentImg.style.display = 'none';
  return createImage('img/img-2.jpg');
})
.then(function(response){
  currentImg = response;
  console.log('Image 2 loaded');
  return wait(2);
})
.then(function(){
  currentImg.style.display = 'none';
})
.catch(function(err){
  console.log(err);
})

*/
////////USING ASYNC AWAIT////////////

try{
const getPosition = function(){
  return new Promise(function(resolve, reject){
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

const whereAmI = async function(){
  //Geolocation
  const pos = await getPosition();
  const {latitude: lat, longitude:lng} = pos.coords;

  //Reverse geocoding
   const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
   if(!resGeo.ok) throw new Error('Problem getting location data');

   const dataGeo = await resGeo.json();

   //Country data
  const response = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);

  const data = await response.json();
  renderCountry(data[0]);

  return `You're in ${dataGeo.city}, ${dataGeo.country}`;
}

  btn.addEventListener('click', function(){
    console.log('1: Will get location');
    (async function(){
      try {
        const city = await whereAmI();
        console.log(`2: ${city}`);
      } catch(err){
        console.error(`2: Something went wrong (${err.message}) 🧨`);
      }
    })();
    console.log('3: Finished getting location');
  })
}
catch(err){
  console.error(`${err} 🧨`);
  renderError(`Something went wrong 🧨 ${err.message}`);

  //Reject promise returned from async function
  throw err;
}

/*
// const get3Countries = async function(c1, c2, c3){
//   try{
//   //  const [data1] =  await getJSON(`https://restcountries.com/v2/name/${c1}`);

//   //  const [data2] =  await getJSON(`https://restcountries.com/v2/name/${c2}`);

//   //  const [data3] =  await getJSON(`https://restcountries.com/v2/name/${c3}`);
//   // console.log([data1.capital, data2.capital, data3.capital]);

//    const data = await Promise.all([
//     getJSON(`https://restcountries.com/v2/name/${c1}`),
//     getJSON(`https://restcountries.com/v2/name/${c2}`),
//     getJSON(`https://restcountries.com/v2/name/${c3}`)
//   ])
//   console.log(data.map(function(d){
//     return d[0].capital;
//   }));
//   }catch(err){
//     console.error(err);
//   }
// }

// get3Countries('canada', 'portugal', 'tanzania')

//Promise.race
(async function(){
  const response = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`)
  ]);
  console.log(response[0]);
})();

const timeout = function(seconds){
  return new Promise(function(_,reject){
    setTimeout(function(){
      reject(new Error('request took too long!'))
    }, seconds * 1000)
  })
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(5)
]).then(function(response){
  console.log(response[0]);
}).catch(function(err){
  console.error(err);
});

//Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(function(response){
  console.log(response);
})

//promise.any [ES2021]
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(function(response){
  console.log(response);
}).catch(function(err){
  console.log(err);
})
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/
/*
//PART 1
const imgContainer = document.querySelector('.images');

const wait = function(seconds){
  return new Promise(function(resolve){
    setTimeout(resolve, seconds * 1000);
  })
}

const createImage = function(imgPath){
  return new Promise(function(resolve,reject){
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function(){
      imgContainer.append(img);
      resolve(img);
    })

    img.addEventListener('error', function(){
      reject(new Error('Image not found'))
    })
  })
}

// const loadNPause = async function(){
//   try{
//     //load image 1
//     let img = await createImage('img/img-1.jpg');console.log('Image 1 loaded');
//     await wait(2);
//     img.style.display = 'none';
    
//     //load image 2
//     img = await createImage('img/img-2.jpg');
//     console.log('Image 2 loaded');
//     await wait(2);
//     img.style.display = 'none';

//   } catch(err){
//     console.log(err);
//   }
// }

// loadNPause()

//Part 2
const loadAll = async function(imgArr){
  try{
    const imgs = imgArr.map(async function(img){
     return await createImage(img);
    })
    console.log(imgs);

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);

    imgsEl.forEach(function(img){
      img.classList.add('parallel');
    })
  }
  catch(err){
    console.error(err);
  }
}
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
*/

