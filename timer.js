export default class Timer{
    constructor(root){
        root.innerHTML = Timer.getHTML()

        this.el ={
            hours : root.querySelector(".timer_part-hours"),
            minutes: root.querySelector(".timer_part-minutes"),
            seconds: root.querySelector(".timer_part-seconds"),
            control: root.querySelector(".timer_btn-control"),
            reset : root.querySelector(".timer_btn-reset"),
        };

        this.interval = null;
        this.remainingSeconds = 0;

        this.el.control.addEventListener("click",() => {
            if(this.interval ===null){
                this.start()
            }
            else{
                this.stop()
            }
        });
        this.el.reset.addEventListener("click",() => {
            const inputMinutes = window.prompt("Enter a number of minutes:");
            if(inputMinutes <= 1440){
                this.remainingSeconds = inputMinutes * 60
                this.updateInterfaceTime()
            }
            else{
                window.prompt("Please put within 24 hours :D")
            }
            

        });
    };

    updateInterfaceTime(){
        let hours   = Math.floor(this.remainingSeconds / 3600); // get hours
        let minutes = Math.floor((this.remainingSeconds - (hours * 3600)) / 60); // get minutes
        let seconds = this.remainingSeconds - (hours * 3600) - (minutes * 60);
        
        this.el.hours.textContent = hours.toString().padStart(2,"0")
        this.el.minutes.textContent = minutes.toString().padStart(2,'0')
        this.el.seconds.textContent = seconds.toString().padStart(2,'0')
        
    };

    updateInterfaceControl(){
        if(this.interval ===null){
            this.el.control.innerHTML = `<span class="material-icons">start</span>`+"Get_started";
            this.el.control.classList.add("timer_btn-start")
            this.el.control.classList.remove("timer_btn-stop")
        }
        else{
            this.el.control.innerHTML = `<span class="material-icons">pause</span>` + "Lets_pause";
            this.el.control.classList.add("timer_btn-stop")
            this.el.control.classList.remove("timer_btn-start")
        }
    };
    
    start(){
        if(this.remainingSeconds === 0) return;

        this.interval = setInterval(() =>{
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if(this.remainingSeconds ===0){
                this.stop();
            }

        } ,1000)
        this.updateInterfaceControl();
    }

    stop(){
        clearInterval(this.interval);
        this.interval = null
        this.updateInterfaceControl()
    }
    static getHTML(){
        return  `
            <span class="timer_part timer_part-hours">00 </span>
            <span class="timer_part">:</span>
            <span class="timer_part timer_part-minutes">00 </span>
            <span class="timer_part">:</span>
            <span class="timer_part timer_part-seconds">00 </span>
            <button type="button" class="timer_btn timer_btn-control timer_btn-start" title="start">
                <span class="material-icons">start</span>Get.started
            </button>
            <button type="button" class="timer_btn timer_btn-reset" title="set and stop">
                <span class="material-symbols-outlined">
                    timer
                </span> Set/Pause
            </button>
        `;
    }
}