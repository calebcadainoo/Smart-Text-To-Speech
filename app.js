const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// add speech recognition
try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    const greetings = [
        'Good day King, how may I serve you?',
        'Lavendar @ your service my Lord',
        'You need to go and eat Sair'
    ];

    const weather = [
        'The weather is fine Your Highness',
        'You may need an umbrella today'
    ];

    recognition.onstart = function(){
        console.log('you can talk to microphone');
    }

    // recognition.onspeechend = function(){
    //     console.log('you\'ve stopped talking');
    // }

    recognition.onresult = function(e){
        const current = e.resultIndex;

        const transcript = e.results[current][0].transcript;
        const confidence = e.results[current][0].confidence;
        // content.textContent = transcript + ' - '+confidence;
        content.textContent = transcript;
        readOutLoud(transcript);
        console.log(e);
    }

    // add event listener to btn
    btn.addEventListener('click', () => {
        recognition.start();
    });

    function readOutLoud(msg){
        const speech = new SpeechSynthesisUtterance();

        // speech.text = 'i have no clue sir'; 
        speech.text = 'Searching for '+ msg; 

        // if (msg.includes('Good day')) {
        //    const finalText = greetings[Math.floor(Math.random() * greetings.length)];
        //    speech.text = finalText;
        //    console.log(msg);
        // }

        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
        window.open('https://www.google.com/search?q='+msg, '_blank').focus();
    }

} catch (error) {
    console.log(error);
}