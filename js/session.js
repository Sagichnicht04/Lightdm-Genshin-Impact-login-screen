var session = -1;
async function startSession(){
    await new Promise(r => setTimeout(r, 2000));
    if(session == -1){
        session = window.lightdm.default_session;
    }
    window.lightdm.start_session(session);
}

function switchSession(){
    openDialog();
    document.querySelector("#login_section").setAttribute("hidden","hidden");
    document.querySelector("#sessions_section").removeAttribute("hidden");
    let select = document.querySelector("#sessions_select");

    let index=0;
    window.lightdm.sessions.forEach(session => {
    //["default","not_default","dontusethis"].forEach(session => {
        let option = document.createElement("option");
        option.setAttribute("value", index++);
        option.innerText = session.name;
        select.appendChild(option);
    });
}
function sessionSelected(){
    openDialog();
    document.querySelector("#sessions_section").setAttribute("hidden","hidden");
    document.querySelector("#login_section").removeAttribute("hidden");
    session = window.lightdm.sessions[document.querySelector("#sessions_select").value].key;
}
