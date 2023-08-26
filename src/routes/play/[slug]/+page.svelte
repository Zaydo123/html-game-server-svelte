<link rel="stylesheet" href="/css/global.css" />
<script>
    /** @type {import('./$types').PageData} */
    export let data;
    let game = data.props.game;
    let gameExtra = JSON.parse(game.Extra);
    console.log(gameExtra);

    let gameSRC = "https://zayddesign.uk/" + game.ID + "/index.html";


  </script>
  
  <h1>{game.ID}</h1>
  <div>{@html game.Name}</div>



  <div class="iframe-area game-{game.ID}">

    <iframe src={gameSRC} frameborder="0" allowfullscreen></iframe>



  </div>