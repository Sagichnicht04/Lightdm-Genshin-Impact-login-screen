
window.show_message = function(text, type) {
    if (0 === text.length) {
        return;
    }
    let messages = document.getElementById('messages');
    messages.style.visibility = "visible";
    if (type == 'error') {
        text = `<p style="color:red;">${text}</p>`;
    }
    messages.innerHTML = `${messages.innerHTML}${text}`;
};

function clear_messages() {
    let messages = document.getElementById("messages");
    messages.innerHTML = "";
    messages.style.visibility = "hidden";
}