<script>
    
    let websiteWidth = 1000;

    let slides = [
      {
        "title": "",
        "description": "",
        "image": "banners/PhysicsChatAd.png",
        "href" : "https://physics-chat.com"
      },
      {
        "title": "Welcome",
        "description": "The new and improved Physics Central!",
        "image": "banners/RocketBanner1@2.5x.png",
        "href" : "/"
      },
      {
        "title": "Having issues?",
        "description": "Email us at: support@physics-central.com",
        "image": "banners/RocketBanner2@2.5x.png",
        "href" : "mailto:support@physics-central.com"
      }, 
      {
        "title": "Request a game",
        "description": "Send us a suggestion. We'll try to make it happen.",
        "image": "banners/RocketBanner3@2.5x.png"
      }
    ];

  let currentIndex = 0;

  $: slideURL = slides[currentIndex].image;
  $: slideTitle = slides[currentIndex].title;
  $: slideDescription = slides[currentIndex].description;

  let dots = [];

  for(let i = 0; i < slides.length; i++){
    dots.push("dot");
  }
  function updateDots(){
    for(let i = 0; i < dots.length; i++){
      dots[i] = "dot";
    }
    dots[currentIndex] = "dot active";
  }

  const incrementIndex = () => {
    currentIndex++;
    if(currentIndex >= slides.length){
      currentIndex = 0;
    }
    updateDots();
  }

  const decrementIndex = () => {
    currentIndex--;
    if(currentIndex < 0){
      currentIndex = slides.length - 1;
    }
    updateDots();
  }
  
  function setIndex(index){
    currentIndex = index;
    updateDots();
  }
  let changes = 0;
  setInterval(()=>{
    if(changes == 0){
      changes++;
    } else {
      incrementIndex();
    }
  }, 15000);



  

</script>
<svelte:window bind:innerWidth={websiteWidth} />


<div class="slideshow-container">

  <div class="slides fade" style="display: block" onclick="window.location.href='{slides[currentIndex].href}'">
    <div class="slider-text">
      {#if slides[currentIndex].title.length > 0}
      <h1 id="slideshow-title">{slideTitle}</h1>
      {/if}
      {#if slideDescription.length > 0}
      <p id="slideshow-description">{slideDescription}</p>
      {/if}
    </div>
    <img
      src = {slideURL}
      alt="Slideshow"
      id="slideshow-image"
      style="width: 100%"
    />
  </div>
    <!-- Add navigation buttons -->
    <div class="navigation-slideshow">
      <button class="prev" on:click={decrementIndex}>&#10094;</button>
      <button class="next" on:click={incrementIndex}>&#10095;</button>
    </div>
</div>
<!-- Add the dots navigation -->

{#if websiteWidth >= 716}
<div class="dot-container" style="text-align: center">
  {#each slides as slide, i}
    <span role="button" tabindex=0 class={dots[i]} on:keypress={setIndex(i)} on:click={setIndex(i)}></span>
  {/each}
</div>
{/if}

<style>

/*Slider and stuff*/

#slideshow-image {
  border-radius: 5px;
}
/* Slideshow container */
.slideshow-container {
  padding-top: 40px;
  min-width: 800px;
  max-width: 800px;
  height: 228px;
  position: relative;
  margin: auto;
}

.slides {
  display: none;
}

.slider-text {
  position: absolute;
  bottom: 75px;
  left: 50px;
  color: #f9f8f9;
  text-align: left;
  width: 400px;
  height: 100px;
  font-size: 70px;
}
.slider-text h1 {
  width: fit-content;
  justify-content: center;
  padding: 5px;
  font-size: 30px;
  margin-bottom: 5px;
  color: #fff;
  background-color: rgba(33, 33, 33, 0.7);
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.2);
}

.slider-text p {
  padding: 4px;
  width: fit-content;

  font-size: 15px;
  color: #fff;
  background-color: rgba(33, 33, 33, 0.7);
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.2);
}

.prev,
.next {
  cursor: pointer;
  position:absolute;
  
  width: auto;
  padding: 10px;
  margin-top: -17%;
  color: #fff;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  /* get rid of default button formatting */
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0.0);


}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #717171;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active,
.dot:hover {
  background-color: #bbb;
}


/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
@media (max-width: 800px){
  .slideshow-container {
    display: none;
  }
  .dot-container {
    display: none;
  }
}


</style>

