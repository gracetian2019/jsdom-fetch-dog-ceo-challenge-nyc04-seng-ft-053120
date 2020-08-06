console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", function() {
    const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
    const dogImgContainer = document.querySelector("#dog-image-container")
        //1
    fetch(imgUrl, { method: "GET" })
        .then(function(response) {
            if (response.ok) {
                return response.json()
            }
            console.log(response)
        })
        .then(function(dogImgData) {
            console.log(dogImgData)
            dogImgData.message.forEach(function(imgUrl) { dogImgContainer.innerHTML += `<img src=${imgUrl}>` })
        })
        //2
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    const dogBreedUl = document.querySelector("#dog-breeds")
    fetch(breedUrl, { method: "GET" })
        .then((resp) => resp.json())
        //breedData is array
        .then((breedData) => {
            allBreeds = Object.keys(breedData.message)
            console.log(allBreeds)
            allBreeds.forEach(function(breed) { dogBreedUl.innerHTML += `<li>${breed}</li>` })
        })
        //3
    dogBreedUl.addEventListener("click", (event) => {
            event.target.style.color = 'blue'
        })
        //4
    let allBreeds = []
    const breedDropdown = document.querySelector("#breed-dropdown")
    breedDropdown.addEventListener("change", (event) => {
        //get all breeds
        let selectedLetter = event.target.value
            //filter it
        let filteredBreeds = allBreeds.filter((breed) => {
                return breed.startsWith(selectedLetter)
            })
            // console.log(filteredBreeds)
            //render filteredBreeds into browser
        dogBreedUl.innerHTML = filteredBreeds.map((breed) => `<li>${breed}</li>`).join('')
    })
})

//another solution
// const dogContainer = document.querySelector('#dog-image-container');
// const dogBreedList = document.querySelector('#dog-breeds');
// let allBreeds = [];
// fetch(’https: //dog.ceo/api/breeds/image/random/4')
//         .then(resp => resp.json())
//         .then(data => {
//             data.message.forEach(dogUrl => {
//                 createNewImg(dogUrl)
//             })
//         });

//         function createNewImg(dogUrl) {
//             let img = document.createElement('img')
//             img.src = dogUrl
//             dogContainer.appendChild(img)
//         }
//         fetch('https://dog.ceo/api/breeds/list/all')
//         .then(resp => resp.json())
//         .then(breedData => {
//             for (const breed in breedData.message) {
//                 // for(let i < 0; i < breed.length;);
//                 if (breedData.message[breed].length > 0) {
//                     breedData.message[breed].forEach(subBreed => {
//                         allBreeds.push(`${subBreed} ${breed}`)
//                     })
//                 } else {
//                     allBreeds.push(breed)
//                 }
//             }
//             createLi(allBreeds)
//         })
//         function createLi(allBreeds) {
//             allBreeds.forEach(dog => {
//                 let newli = document.createElement('li')
//                 newli.innerText = dog
//                 dogBreedList.append(newli)

//                 newli.addEventListener('mouseover', function() {
//                     newli.style.color = ‘blue’
//                 })
//             })
//         }
//         const dropdown = document.querySelector("#breed-dropdown")
//         dropdown.addEventListener(‘change’, function(evt) {
//             let letter = evt.target.value
//             let result = allBreeds.filter(breed => breed[0] === letter);
//             dogBreedList.innerText = “”
//                 createLi(result)
//         })