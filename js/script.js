document.body.style.fontSize = (document.body.clientWidth/80)+"px";
document.querySelectorAll("#dialog .close")[0].style.fontSize = (document.querySelector("#dialog").clientWidth/20)+"px";

let width = document.body.clientWidth;
let height = document.body.clientHeight;
let video_height = width*(10/16);
document.querySelector("#content").style.top = (height - video_height)/2 + "px";
document.querySelector("#content").style.height = video_height + "px";


document.querySelectorAll("input").forEach(element => {
    element.addEventListener("focus", (event) => {
        last_focus = event.target;
    });
    element.addEventListener("keyup", ({key}) => {
    if (key === "Enter" && element.value != "") {
        login();
    }
    });
});

function openDialog(){
    document.querySelector("#dialog").setAttribute("open","open");
}


async function start(){
    document.querySelector("#virtual_keyboard").innerHTML="";
    document.querySelector("#dialog").close();
    document.querySelector("#open_door_gif").removeAttribute("hidden");

    await new Promise(r => setTimeout(r, 800));

    document.querySelector("#open_door_gif").style.animation = "zoom_door 0.5s linear 0.5s 1 normal forwards";
    document.querySelector("#background_video").style.animation = "zoom_door 0.5s linear 0.5s 1 normal forwards";
    document.body.style.animation = "white_filter 3s linear 0.5s 1 normal forwards";		
}

async function login(){
    try{
        window.lightdm.respond(document.querySelector("#dialog_username").value);
        await new Promise(r => setTimeout(r, 500));
        window.lightdm.respond(document.querySelector("#dialog_password").value);
    }
    catch(exception){
        start();
    }
    
}

function shutdown(){
    if(confirm("Shutdown?")){
        window.lightdm.shutdown();
    }
}

function autologin_timer_expired(username) {}

window.authentication_complete = function() {
    if (window.lightdm.is_authenticated) {
        start();
        document.body.addEventListener("animationend", (event) => {
            startSession();
        });			
    } else {
        show_message("Authentication Failed", "error");
        confirm("Authentication Failed");
        setTimeout(start_authentication, 2000);
    }
};

window.start_authentication = function() {
    clear_messages();
    window.lightdm.authenticate(null);
};

window.addEventListener("GreeterReady", () => {
    window.lightdm.show_message.connect(show_message)
    window.lightdm.authentication_complete.connect(authentication_complete)
    window.lightdm.autologin_timer_expired.connect(autologin_timer_expired)

    start_authentication()
});