console.log('working working')

const weatherForm = document.querySelector('form')
const search=document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const message3 = document.querySelector('#message-3')

weatherForm.addEventListener('submit',(e)=>{
    const location = search.value
    e.preventDefault()
    messageOne.textContent='Loading...'
    messageTwo.textContent='.'
   
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent=data.address
            messageTwo.textContent=data.temperature
            message3.textContent=data.cloud
        
        }
    })
})
   
})