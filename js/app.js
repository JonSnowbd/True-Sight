var TrueSight = (function(){

    this.videos = [
        {
            vidname:"spotlightVideo",
            hero:"Kunkka",
            poster:"static/image/poster/"+this.hero+".jpg"
        },
        {
            vidname:"8CullingBlade",
            hero:"Axe",
            poster:"static/image/poster/"+this.hero+".jpg"
        }
    ];

    this.volume = 0.5;

    var spotlight = videojs('spotlightVideo');
    var parent = this;

    this.init = function(){

        // If volume isnt defined in storage, set it to half.
        if(localStorage.getItem("volume") == undefined ){
            localStorage.setItem("volume", 0.5);
        }
        parent.volume = localStorage.getItem("volume");

        // Go through each video and set the volume to the stored volume.
        parent.videos.forEach(function(vid){

            videojs(vid.vidname).ready(function(){
                this.volume(parent.volume);
            });

        });
    }

    this.rememberVolume = function(){

        // Check if any video has changed its volume
        parent.videos.forEach(function(vid){

            if(videojs(vid.vidname).volume() != parent.volume){

                localStorage.setItem("volume", videojs(vid.vidname).volume());
                parent.volume = videojs(vid.vidname).volume();

                // Another for each due to it not updating any video before detection.
                parent.videos.forEach(function(vid){
                    videojs(vid.vidname).volume(parent.volume);
                });
            }

        });
    }

    // if browser support local storage, begin to remember the volume.
    setInterval(rememberVolume, 2000);
    this.init();

})()
