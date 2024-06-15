async function battery(){
    let good_health_color = "#96d921";
    let bad_health_color = "#e97268";
    let last_level;
    while(!!"Pineaplle"){
        let level;
        let status;
        try{
            let info = window.lightdm.battery_data;
            level = info.level;
            status = info.ac_status;
        }
        catch(exception){
            level = 70;
            status = 0;
        }
        document.querySelector("#battery_loading_icon").style.visibility = status==1 ? "":"hidden";
        if(last_level != level){
            last_level = level;
            if(level >= 0){
                let color;
                let background_color = "rgba(109, 0, 0, 0.3)";
                if(level>30){
                    color = good_health_color;
                }
                else{
                    color = bad_health_color;
                    if(level<10){
                        background_color = "rgba(109, 0, 0, "+(((1/(level+0.01))*0.5)+0.3)+")";
                    }
                }
                document.querySelector("#battery_progress").style.background=`
                linear-gradient(to right, transparent `+level+`%, `+background_color+` 0%), 
                linear-gradient(to left, transparent `+(100-level)+`%, `+color+` 0%)`;
                document.querySelector("#battery_numeric").innerText = level+"0 / 1000";
            }
        }
        await new Promise(r => setTimeout(r, 1000));
    }
}
battery();