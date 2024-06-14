var last_focus = document.querySelector("#dialog_password");
var caps_lock = false;

function sendVirtualKey(key){
    if(key != "Delete"){
        if(caps_lock){
            key = key.toUpperCase();
        }
        last_focus.value += key;
    }
    else{
        last_focus.value = last_focus.value.slice(0, -1);
    }
}

function toggleCaps(button){
    caps_lock = !caps_lock;
    if(caps_lock){
        button.style.color = "#d7bc6f";
    }
    else{
        button.style.color = "#cfcfcf";
    }
}

function toggleVirtualKeyboard(){
    let virtual_keyboard = document.querySelector("#virtual_keyboard");
    if(virtual_keyboard.innerHTML == ""){

        //Trash Can
        let button = document.createElement("button");
        button.setAttribute("class","button virtual_key");
        button.setAttribute("onclick","sendVirtualKey('Delete')");
        /*let image = document.createElement("img")
        image.setAttribute("src","trashcan.png")
        image.style.width = "80%";
        button.appendChild(image);
        button.style.backgroundColor = "transparent";
        button.style.outline = "none";
        button.style.border = "none";*/
        button.innerHTML = "DELETE";
        button.style.width = "fit-content";
        virtual_keyboard.append(button);

        //Caps Lock
        button = document.createElement("button");
        button.setAttribute("class","button virtual_key");
        button.setAttribute("onclick","toggleCaps(this)");
        button.innerHTML = "CAPS";
        button.style.width = "fit-content";
        virtual_keyboard.append(button);

        let keys = "1234567890abcdefghijklmnopqrstuvwxyzäöü!\"§$%&/()=?ß+#*-.,'_:;<>|~".split("");
        keys.forEach(key => {
            let button = document.createElement("button");
            button.setAttribute("class","button virtual_key");
            button.setAttribute("onclick","sendVirtualKey('"+key+"')");

            button.innerHTML = key;
            virtual_keyboard.append(button);
        });
    }
    else{
        virtual_keyboard.innerHTML = "";
    }
}
