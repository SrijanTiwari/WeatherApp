console.log('working working')

const weatherForm = document.querySelector('form')
const search=document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit',(e)=>{
    const location = search.value
    e.preventDefault()
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent=data.address
            messageTwo.textContent=data.temperature
        
        }
    })
})
   
})