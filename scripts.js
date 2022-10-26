let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

// all the buttons
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){

    clearInterval(countdown) // clear any already existing timer
    const now=Date.now()
    const then=now+(seconds*1000)
    displayTimeLeft(seconds)
    displayEndTime(then)

    countdown=  setInterval(()=>{
        const secondsLeft=Math.round((then-Date.now())/1000);

        // check if we need to stop it
        if(secondsLeft<0){
            clearInterval(countdown)
            return;
        }


        displayTimeLeft(secondsLeft);

    },1000)

}



function displayTimeLeft(seconds){

    const min=Math.floor(seconds/60);
    const remainderSeconds=seconds%60

    const display=`${min}:${remainderSeconds<10? "0":""}${remainderSeconds}`
    
    // the title changes
    document.title=display;
    timerDisplay.textContent=display;

    console.log({min,seconds});
}

function displayEndTime(timestamp){
    const end=new Date(timestamp)

    const hour=end.getHours()
    const minutes = end.getMinutes();

    // to adjust am & pm
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;


}


function startTimer(){
    console.log(this.dataset.time);
    const seconds=parseInt(this.dataset.time)
    timer(seconds)

    // bug:queued up timers

}



// form input


buttons.forEach(button=>button.addEventListener("click",startTimer))



// just writ document.{any named attribute}  
// eg: document.customForm, it returns the element of the named value 
// also it can be nested


document.customForm.addEventListener("submit", function(e){
    //console.log(this);
    e.preventDefault()
    const min=this.minutes.value
    console.log(min);

    // mins->sec
    timer(min*60)
    this.reset();


})


