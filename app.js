if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js');
} else {
  console.log("Service worker is not supported");
}

const record = document.querySelector('.record');
const stop = document.querySelector('.stop');
const soundClips = document.querySelector('.sound-clips');
const mainSection = document.querySelector('.main-controls');

stop.disabled = true;

const createScheduledNotification = async (tag, title, body, seconds, minutes, hours, days) => {
  const registration = await navigator.serviceWorker.getRegistration();
  registration.showNotification(title, {
    tag: tag,
    body: body,
    showTrigger: new TimestampTrigger(Date.now() + seconds * 1000 + minutes * 60 * 1000 + hours * 60 * 60 * 1000 + days * 24 * 60 * 60 * 1000),
  });
};

const cancelScheduledNotification = async (tag) => {
  const registration = await navigator.serviceWorker.getRegistration();
  const notifications = await registration.getNotifications({
    tag: tag,
    includeTriggered: true,
  });
  notifications.forEach((notification) => notification.close());
};  

if (navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');

  const constraints = { audio: true };
  let chunks = [];

  let onSuccess = function(stream) {
    const mediaRecorder = new MediaRecorder(stream);

    record.onclick = function() {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");
      record.style.background = "red";

      stop.disabled = false;
      record.disabled = true;
    }

    stop.onclick = function() {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
      record.style.background = "";
      record.style.color = "";
      // mediaRecorder.requestData();

      stop.disabled = true;
      record.disabled = false;
    }

    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      const clipContainer = document.createElement('article');
      const clipLabel = document.createElement('p');
      const audio = document.createElement('audio');
      const deleteButton = document.createElement('button');

      const notificationTitle = prompt('Enter the title of your notification');
      const notificationBody = prompt('Enter the body of your notification');
      const notificationTimeDays = parseInt(prompt("Enter a time for your notification (in days)", "0"), 10);
      const notificationTimeHours = parseInt(prompt("Enter a time for your notification (in hours)", "0"), 10);
      const notificationTimeMinutes = parseInt(prompt("Enter a time for your notification (in minutes)", "0"), 10);
      const notificationTimeSeconds = parseInt(prompt("Enter a time for your notification (in seconds)", "0"), 10);
      if(notificationTitle === null) {
        clipLabel.textContent = 'My unnamed clip';
      } else {
        clipLabel.textContent = notificationTitle;
      }
      createScheduledNotification(
        notificationTitle,
        notificationTitle,
        notificationBody,
        notificationTimeSeconds,
        notificationTimeMinutes,
        notificationTimeHours,
        notificationTimeDays
      );
      const dateString = new Date(
        Date.now() + 
        notificationTimeSeconds * 1000 + 
        notificationTimeMinutes * 60 * 1000 + 
        notificationTimeHours * 60 * 60 * 1000 + 
        notificationTimeDays * 24 * 60 * 60 * 1000
      ).toLocaleTimeString('pt-BR');
      clipLabel.textContent += ` (${dateString})`;
      localStorage.setItem(notificationTitle, `${notificationBody}:::${dateString}`);


      clipContainer.classList.add('clip');
      audio.setAttribute('controls', '');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete';

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      soundClips.appendChild(clipContainer);

      audio.controls = true;
      const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
      console.log("recorder stopped");

      deleteButton.onclick = function(e) {
        let evtTgt = e.target;
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        cancelScheduledNotification(clipLabel.textContent)
      }
    }

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }
  }

  let onError = function(err) {
    console.log('The following error occured: ' + err);
  }

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

} else {
   console.log('getUserMedia not supported on your browser!');
}