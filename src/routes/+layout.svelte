<script>
let websiteTitle = "Physics Central";

//when website size changes, update the title

let websiteWidth = 1000;
function updateTitle(){
  if(websiteWidth < 600){
    websiteTitle = "Physics";
  }else{
    websiteTitle = "Physics Central";

  }
}
$: websiteWidth, updateTitle();




</script>

<svelte:window bind:innerWidth={websiteWidth} />

<header>
<nav>
    <ul>
      <li>
        <img
          id="logo"
          src="/images/logos/RocketLogo-nobg@0.5x.png"
          alt="logo"
          href="index.html"
        />
      </li>
      <li>
        <a style="color: #fff;
              background-color: rgba(33, 33, 33, 0.7);
              border-radius: 10px;
              box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.2);" href="/"><strong>{websiteTitle}</strong></a>
      </li>
      <li><a href="/mirrors">Mirrors</a></li>
      <li><a href="/requestapp">Requests</a></li>
      {#if websiteWidth > 600 }
      <li><a href="https://github.com/Zaydo123/html-game-server/issues/new" target="_blank">Bug Reports</a></li>
      {/if}
      <li><a href="mailto:zayd@physics-central.com">Contact</a></li>

      </ul>
</nav>
</header>

<link rel="stylesheet" href="https://use.typekit.net/cir1tmq.css" />


<style>
header {
  background-color: #58595b;
  padding: 5px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(144deg, #af40ff, #f9f8f9);
}

header nav ul {
  display: flex;
  position: sticky;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

header nav a {
  color: #fff;
  text-decoration: none;
  font-size: 17px;
  padding: 0.45em;
}
header nav a:hover {
  color: #fff;
  background-color: rgba(33, 33, 33, 0.7);
  border-radius: 10px;
  transition: box-shadow, color, background-color 0.3s ease-in-out;
  box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.2);
}

#logo {
  height: 50px;
  width: 50px;
  margin-right: 20px;
}

</style>

<slot></slot>