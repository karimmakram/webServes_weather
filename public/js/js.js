// alert("Welcome to index page")


const weather = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#error')
const msg2 = document.querySelector('#weather')


weather.addEventListener('submit',(e)=>{
    e.preventDefault()
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    const location = search.value 
    fetch('http://localhost:3000/weather?address='+location).then((res)=>{
res.json().then((data)=>{
    if(data.error){
        console.log("Error")
        msg1.textContent = data.error 
    }
    else{
        msg1.textContent = data.place
        msg2.textContent = data.features.timezone+" temperature "+data.features.temp
    }
        })
    })
})

