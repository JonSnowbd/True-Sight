var TrueSight = (function(){

    var spotlight = videojs('spotlightVideo'),
        defaultVol;

    if(localStorage.getItem("volume") == undefined ){
        localStorage.setItem("volume", 0.5);
    }

    defaultVol = localStorage.getItem("volume");

    spotlight.ready(function(){
        this.volume(defaultVol);
    });

    this.rememberVolume = function(){
        if(spotlight.volume() != defaultVol){
            localStorage.setItem("volume", spotlight.volume());
        }
    }

    // if browser support local storage, begin to remember the volume.
    setInterval(rememberVolume, 5000);

})()
