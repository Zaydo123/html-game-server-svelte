<link rel="stylesheet" href="/css/global.css" />
<script>
  /** @type {import('./$types').PageData} */
  import { browser } from '$app/environment';
  export let data;
  let game = data.props.game;
  let gameExtra = JSON.parse(game.Extra);

  let websiteWidth = 1000;
  let isDevMode = false;
  let originalGameSRC = "";

  function toggleFullScreen() {
    const iframe = document.querySelector('.game-iframe');
    if (!document.fullscreenElement) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) { /* Firefox */
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) { /* IE/Edge */
        iframe.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    }
  }

  let gameSRC = "/";
  
  if(browser){

    websiteWidth = window.innerWidth;
    
    //dev mode
    if(window.location.href.includes("localhost")){
      isDevMode = true;
    }

    //make opacity 0 then fade in ease in 
    if(game.gamedistribution!=null && game.gamedistribution.length>0){
      //for development convenience
      let currentURL = window.location.href;
      if(currentURL.includes("localhost")){
        currentURL = "https://www.physics-central.com/play/" + game.ID;
      }
      gameSRC = "https://html5.gamedistribution.com/" + game.gamedistribution + `/?gd_sdk_referrer_url=${currentURL}`;
    } else {
      gameSRC = game.Image.substring(0, game.Image.lastIndexOf("/")) + "/index.html";
    }

    originalGameSRC = gameSRC;




  }





</script>
<div class="group">

  <div class="iframe-area game-{game.ID}">
      {#if !isDevMode}
        <div class="game-ads left-ad">
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3855909962178868"
             crossorigin="anonymous"></script>
          <!-- leftIframe -->
          <ins class="adsbygoogle"
             style="display:inline-block;width:150px;height:550px"
             data-ad-client="ca-pub-3855909962178868"
             data-ad-slot="4563054865"></ins>
          <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>
      {:else}
        <div class="game-ads left-ad">
          <img class="devAd" src="https://placehold.co/150x550" alt="ads" />
        </div>
      {/if}
    
  
  
    <iframe src={gameSRC} frameborder="5" allowfullscreen="true" allowtransparency="true" class="game-iframe" title="game-{game.ID}"></iframe>
  
      {#if !isDevMode}
        <div class="game-ads right-ad">
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3855909962178868"
          crossorigin="anonymous"></script>
          <!-- leftIframe -->
          <ins class="adsbygoogle"
              style="display:inline-block;width:150px;height:550px"
              data-ad-client="ca-pub-3855909962178868"
              data-ad-slot="4563054865"></ins>
          <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>
      {:else}
        <div class="game-ads right-ad">
          <img class="devAd" src="https://placehold.co/150x550" alt="ads" />
        </div>
      {/if}
  
  </div>

  <div class="game-controls">
    <button class="full-screen-btn" on:click={toggleFullScreen}>Full Screen</button>

    {#if gameExtra.mirrors}
      <select class="mirror-select" bind:value={gameSRC}>
        <option class="mirror-option" value={originalGameSRC}>Main Server</option>
        {#each gameExtra.mirrors as mirror}
          <option class="mirror-option" value={mirror.url}>{mirror.name}</option>
        {/each}
      </select>
    {/if}

</div>
</div>



<style>

.group{

  display: flex;
  flex-direction: column;
  margin-top: 4%;

}

.iframe-area{
  width: 80%;
  height: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.game-iframe{
  width: 90%;
  height: 550px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
}

.game-ads{
  width: 150px;
  height: 550px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
}

.left-ad{
  margin-right: 1%;
}

.right-ad{
  margin-left: 1%;
}

.game-controls{
  width: 80%;
  margin: 0 auto;
  margin-top: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.full-screen-btn{
  width: 100px;
  height: 30px;
  border-radius: 2px;
  border: none;
  background-color: #af40ff;
  color: white;
}

.mirror-select{
  width: 200px;
  height: 30px;
  border-radius: 2px;
  border: none;
  background-color: #af40ff;
  color: white;
  margin-left: 1%;
  text-align: center;
}




</style>

