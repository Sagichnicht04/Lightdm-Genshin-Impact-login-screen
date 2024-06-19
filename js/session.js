var session = -1;
async function startSession(){
    await new Promise(r => setTimeout(r, 2000));
    if(session == -1){
        session = window.lightdm.default_session;
    }
    window.lightdm.start_session(session);
}

function toggleSessionDialog(){
    if(document.querySelector("#sessions_section").hasAttribute("hidden")){
        openDialog();
        document.querySelector("#login_section").setAttribute("hidden","hidden");
        document.querySelector("#sessions_section").removeAttribute("hidden");
        let select = document.querySelector("#sessions_select");

        if(select.innerHTML == "") setSessionButtonText(select,window.lightdm.sessions[0].name);
    }
    else{
        openDialog();
        document.querySelector("#sessions_section").setAttribute("hidden","hidden");
        document.querySelector("#login_section").removeAttribute("hidden");
        session = window.lightdm.sessions[document.querySelector("#sessions_select").getAttribute("data-session")].key;
    }
}
function switchSession(){
    let index=0;
    let div = document.querySelector("#session_options");
    window.lightdm.sessions.forEach(session => {
        let option = document.createElement("button");
        option.setAttribute("data-session", index++);
        option.setAttribute("onclick","sessionSelected(this)");
        setSessionButtonText(option, session.name);
        div.appendChild(option);
    });
}
function sessionSelected(input){
    let select = document.querySelector("#sessions_select");
    setSessionButtonText(select, window.lightdm.sessions[input.getAttribute("data-session")].name);
    select.setAttribute("data-session",input.getAttribute("data-session"));
    document.querySelectorAll('#session_options > button:not(:first-child)').forEach(element=>{
        element.remove();
    })
}

function setSessionButtonText(button, text){
    button.innerHTML = "<img src='desktop_environment.svg'> | "+text;
    button.innerHTML = `
    <div>
        <img src="desktop_environment.svg">
        <span> | </span>
        <span>`+text+`</span>
    </div>
    `
}