const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const errorMessage = document.getElementById('error');

function toggleButton() {
    button.disabled = !button.disabled;
    errorMessage.style = "display:none;"
}

function textToSpeech (joke) {
    VoiceRSS.speech({
        key: '5e15387d07064a9d92bb1afbf48a6c79',
        src: `${joke}`,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from API 
async function getJokes() {
    errorMessage.style = "display:none;"
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
            if (data.setup ){
                joke = `${data.setup} ...${data.delivery}`
            } else{
                joke =  data.joke
                
            }
            textToSpeech(joke);
            toggleButton();
    } catch(error){
        console.log('API error', error);
        errorMessage.style = "display:inline-block;"
        errorMessage.textContent = "Sorry, couldn't think of a joke, try again!"

    }
}


button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)