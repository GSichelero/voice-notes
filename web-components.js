const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');

const clipContainer = document.createElement('article');
const clipLabel = document.createElement('p');
const audio = document.createElement('audio');
const deleteButton = document.createElement('button');

clipContainer.classList.add('clip');
audio.setAttribute('controls', '');
deleteButton.textContent = 'Delete';
deleteButton.className = 'delete';

if(clipName === null) {
    clipLabel.textContent = 'My unnamed clip';
} else {
    clipLabel.textContent = clipName;
}

clipContainer.appendChild(audio);
clipContainer.appendChild(clipLabel);
clipContainer.appendChild(deleteButton);
soundClips.appendChild(clipContainer);

audio.controls = true;
const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
chunks = [];
const audioURL = window.URL.createObjectURL(blob);
audio.src = audioURL;

deleteButton.onclick = function(e) {
    let evtTgt = e.target;
    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
}

clipLabel.onclick = function() {
    const existingName = clipLabel.textContent;
    const newClipName = prompt('Enter a new name for your sound clip?');
    if(newClipName === null) {
        clipLabel.textContent = existingName;
    } else {
        clipLabel.textContent = newClipName;
    }
}


// create a web component called audionote that is rendered inside a shadow DOM that has the following structure:
// const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');

// const clipContainer = document.createElement('article');
// const clipLabel = document.createElement('p');
// const audio = document.createElement('audio');
// const deleteButton = document.createElement('button');

// clipContainer.classList.add('clip');
// audio.setAttribute('controls', '');
// deleteButton.textContent = 'Delete';
// deleteButton.className = 'delete';

// if(clipName === null) {
//     clipLabel.textContent = 'My unnamed clip';
// } else {
//     clipLabel.textContent = clipName;
// }

// clipContainer.appendChild(audio);
// clipContainer.appendChild(clipLabel);
// clipContainer.appendChild(deleteButton);
// soundClips.appendChild(clipContainer);

// audio.controls = true;
// const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
// chunks = [];
// const audioURL = window.URL.createObjectURL(blob);
// audio.src = audioURL;

// deleteButton.onclick = function(e) {
//     let evtTgt = e.target;
//     evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
// }

// clipLabel.onclick = function() {
//     const existingName = clipLabel.textContent;
//     const newClipName = prompt('Enter a new name for your sound clip?');
//     if(newClipName === null) {
//         clipLabel.textContent = existingName;
//     } else {
//         clipLabel.textContent = newClipName;
//     }
// }
