async function clock(){
    while(!!"Pineable"){
        let time = new Date();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let name;
        if(hour >= 6 && hour < 11){
            name = "morning";
        }
        else if(hour >= 11 && hour < 16){
            name = "midday";
        }
        else if(hour >= 16 && hour < 21){
            name = "evening";
        }
        else if(hour >= 21 || hour < 6){
            name = "night";
        }
        let reduced_hour = hour;
        if(hour > 12){
            reduced_hour -= 12;
        }
        document.querySelector("#big_clock_arrow").style.transform="rotate("+6*minute+"deg)";
        document.querySelector("#small_clock_arrow").style.transform="rotate("+30*reduced_hour+"deg)";
        document.querySelector("#clock_background_time").src="clock/clock_background_"+name+".png";
        document.querySelector("#digital_clock").innerText = (hour < 10 ? '0' : '') + hour + ":" + (minute < 10 ? '0' : '') + minute;
        await new Promise(r => setTimeout(r, 1000));
    }
}
clock();