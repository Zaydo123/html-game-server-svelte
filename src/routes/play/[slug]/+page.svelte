<svelte:head>
{#if browser}  
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3855909962178868" crossorigin="anonymous"></script>
  <script src="/clever_ads.js" type="text/javascript"></script>
{/if}
</svelte:head>
<!-- Hi! -->
<script>
  /** @type {import('./$types').PageData} */
  import Title from "../../components/title.svelte"
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import Verify from "../../verify.svelte"

  export let data;

  let gameExtra = {};
  let game = {};


  try{
    game = data.props.game;
    gameExtra = JSON.parse(game.Extra);
  } catch(e){
    switch(e.name){
      case "SyntaxError":
        console.log("invalid json in game.Extra of game ????");
        break;
      default:
        console.log("unknown error in game.Extra of game ????");
        break;
    }

  } finally {
    if(browser && game.ID == null){
      window.alert("It looks like this game is not available. Please try again later.")
      window.location.href = "/";

    }
  }

  let websiteWidth = 1000;
  let isDevMode = false;
  let originalGameSRC = "";
  let isAdBlockEnabled = false;

  async function detectAdBlock () {
    await new Promise(r => setTimeout(r, 1000));
    if(document.getElementById('zZYIasLBEgpR')){
      isAdBlockEnabled = false;    
      console.log("adblock disabled");
    } else {
    isAdBlockEnabled = true;
    console.log("adblock enabled");
    alert("Please consider turning off adblock for this website. It helps us keep the website running.");
  }
  }

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

  let gameSRC = "/loading.html";
  
  if(browser){

    websiteWidth = window.innerWidth;
    
    //dev mode
    if(window.location.href.includes("localhost")){
      isDevMode = true;
    }
    //make opacity 0 then fade in ease in 
    if(game.gamedistribution!=null && game.gamedistribution.length>1){
      gameSRC = "https://html5.gamedistribution.com/" + game.gamedistribution + `/?gd_sdk_referrer_url=https://www.physics-central.com/play/${game.ID}`;
    } else {
      gameSRC = game.Image.substring(0, game.Image.lastIndexOf("/")) + "/index.html";
    }

    originalGameSRC = gameSRC;


    //send db visit update to server
    fetch("/api/countVisit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameID: game.ID
      })
    })
  }

  onMount(() => {
    detectAdBlock();
  });

</script>


<Title/>
<Verify/>
<div class="group">


  <div class="iframe-area game-{game.ID}">
    {#if !isDevMode && !isAdBlockEnabled}
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
        <img class="devAd" src="/images/placeholders/adPlaceHolder.png" alt="ads" />
      </div>
    {/if}  

  <iframe src={gameSRC} frameborder="5" allowfullscreen="true" allowtransparency="true" allow="autoplay; payment; fullscreen; microphone; focus-without-user-activation *; screen-wake-lock; clipboard-read; clipboard-write; " sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups" loading="lazy" data-hj-allow-iframe="true" class="game-iframe" title="game-{game.ID}" />

    {#if !isDevMode && !isAdBlockEnabled}
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
        <img class="devAd" src="/images/placeholders/adPlaceHolder.png" alt="ads" />
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

