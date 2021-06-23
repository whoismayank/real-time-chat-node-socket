const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
do {
    name = prompt('Please enter your name: ');
} while(!name);

// scroll to last message
const scrollToBottom = () => {
    messageArea.scrollTop = messageArea.scrollHeight;
}
const appendMessage = (final_msg, type) =>{
    let mainDiv =document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');
    let markup = `
    <h4>${final_msg.user}</h4>
    <p>${final_msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

const sendMessage = (userMessage) =>{
    let final_msg = {
        user: name,
        message:userMessage.trim()
    }

    // Append
    appendMessage(final_msg, 'outgoing');
    socket.emit('message',final_msg)
    textarea.value = '';
    scrollToBottom();
}

textarea.addEventListener('keyup',(e)=>{
    // console.log(e.key);
    if(e.key == 'Enter' && e.target.value.trim()){
        sendMessage(e.target.value);
    }
})

// receive message
socket.on('message',(userMessage)=>{
    console.log(userMessage)
    appendMessage(userMessage, 'incoming');
    scrollToBottom();
})

