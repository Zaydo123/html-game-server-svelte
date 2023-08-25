<link rel="stylesheet" href="/css/global.css" />
<script>
    /** @type {import('./$types').PageData} */
    export let data;
    let game = data.props.game;
  </script>
  
  <h1>{game.ID}</h1>
  <div>{@html game.Name}</div>