
<script>

    import { onMount } from "svelte";

    //get all game info from the server
    let games = JSON.parse(`{"home_visits":268807,"games":[{"name":"Cookie Clicker","id":"Cookie-Clicker","image":"/images/game_images/resized_appImage_Cookie-Clicker.png","visits":24975,"ranking":3,"description":""},{"name":"Mario Vs Luigi","id":"Mario-Vs-Luigi","image":"/images/game_images/resized_appImage_Mario-Vs-Luigi.png","visits":2802,"ranking":27,"description":""},{"name":"Super Mario 64","id":"Super-Mario-64","image":"/images/game_images/resized_appImage_Super-Mario-64.png","visits":11595,"ranking":9,"description":""},{"name":"2048","id":"2048","image":"/images/game_images/resized_appImage_2048.gif","visits":2908,"ranking":26,"description":""},{"name":"Slope","id":"Slope","image":"/images/game_images/resized_appImage_Slope.png","visits":36245,"ranking":2,"description":""},{"name":"Thwack","id":"thwack","image":"/images/game_images/resized_appImage_thwack.png","visits":2726,"ranking":29,"description":""},{"name":"Narrow One","id":"narrow-one","image":"/images/game_images/resized_appImage_narrow-one.png","visits":3240,"ranking":25,"description":""},{"name":"Geometry Dash","id":"Geometry-Dash","image":"/images/game_images/resized_appImage_Geometry-Dash.png","visits":7154,"ranking":16,"description":""},{"name":"Picohot","id":"picohot","image":"/images/game_images/resized_appImage_picohot.png","visits":2227,"ranking":32,"description":""},{"name":"Cat Ninja","id":"Cat-Ninja","image":"/images/game_images/resized_appImage_Cat-Ninja.jpeg","visits":4579,"ranking":22,"description":""},{"name":"Tanuki Sunset","id":"tanuki-sunset","image":"/images/game_images/resized_appImage_tanuki-sunset.webp","visits":12853,"ranking":7,"description":""},{"name":"Clay Scape","id":"clay-scape","image":"/images/game_images/resized_appImage_clay-scape.png","visits":3531,"ranking":24,"description":""},{"name":"Axis Football League","id":"Axis-Football-League","image":"/images/game_images/resized_appImage_Axis-Football-League.png","visits":2646,"ranking":31,"description":""},{"name":"HexGL","id":"HexGL-master","image":"/images/game_images/resized_appImage_HexGL-master.jpeg","visits":1735,"ranking":35,"description":""},{"name":"Cursed To Golf","id":"cursed-to-golf","image":"/images/game_images/resized_appImage_cursed-to-golf.jpeg","visits":1684,"ranking":36,"description":""},{"name":"Chess","id":"chess","image":"/images/game_images/resized_appImage_chess.png","visits":1977,"ranking":33,"description":""},{"name":"Drift Hunters","id":"drift-hunters","image":"/images/game_images/resized_appImage_drift-hunters.png","visits":10231,"ranking":10,"description":""},{"name":"Tenjutsu","id":"tenjutsu","image":"/images/game_images/resized_appImage_tenjutsu.png","visits":1922,"ranking":34,"description":""},{"name":"Shell Shockers","id":"Shell-Shockers","image":"/images/game_images/resized_appImage_Shell-Shockers.jpeg","visits":6070,"ranking":18,"description":""},{"name":"Retrobowl","id":"retrobowl","image":"/images/game_images/resized_appImage_retrobowl.jpeg","visits":41199,"ranking":0,"description":""},{"name":"Friday Night Funkin","id":"Friday-Night-Funkin","image":"/images/game_images/resized_appImage_Friday-Night-Funkin.jpg","visits":5380,"ranking":19,"description":""},{"name":"Happy Wheels","id":"3245676432","image":"/images/game_images/happywheels.jpeg","visits":9430,"ranking":11,"description":""},{"name":"Basketball Stars","id":"basketball-stars","image":"/images/game_images/basketball-stars.jpeg","visits":9206,"ranking":13,"description":""},{"name":"Fruit Ninja","id":"fruit-ninja","image":"/images/game_images/fruit-ninja.jpeg","visits":3715,"ranking":23,"description":""},{"name":"VEX 3","id":"vex-3","image":"/images/game_images/vex-3.jpeg","visits":4862,"ranking":21,"description":""},{"name":"Snowball Racing","id":"snowball-racing","image":"/images/game_images/snowball-racing.jpeg","visits":5239,"ranking":20,"description":""},{"name":"Stick Duel: The War","id":"stick-duel-the-war","image":"/images/game_images/stick-duel-the-war.jpeg","visits":6214,"ranking":17,"description":""},{"name":"Moto X3M Bike Race","id":"moto-x3m-bike-race","image":"/images/game_images/moto-x3m-bike-race.jpeg","visits":7778,"ranking":14,"description":""},{"name":"Paper.io 2","id":"paperio-2","image":"/images/game_images/paperio-2.jpeg","visits":23668,"ranking":4,"description":""},{"name":"Color Road 2","id":"color-road-2","image":"/images/game_images/color-road.jpg","visits":2653,"ranking":30,"description":""},{"name":"Nebula","id":"Nebula","image":"/images/game_images/nebula.jpeg","visits":11992,"ranking":8,"description":"Website Unblocker! (Mirror added)"},{"name":"Run 3","id":"run-3","image":"/images/game_images/run-3.png","visits":9266,"ranking":12,"description":""},{"name":"1v1.lol","id":"lol","image":"/images/game_images/lol.png","visits":16122,"ranking":5,"description":"might be blocked"},{"name":"Madalin Multiplayer","id":"madalin","image":"/images/game_images/madalin.jpeg","visits":7699,"ranking":15,"description":""},{"name":"Snowball.io","id":"snowball-io","image":"/images/game_images/snowball-io.png","visits":2735,"ranking":28,"description":""},{"name":"FB and WG","id":"fbwg1","image":"/images/game_images/fbwg1.jpeg","visits":974,"ranking":38,"description":""},{"name":"FB and WG 2","id":"fbwg2","image":"/images/game_images/fbwg2.jpeg","visits":378,"ranking":44,"description":""},{"name":"FB and WG 3","id":"fbwg3","image":"/images/game_images/fbwg3.jpeg","visits":287,"ranking":45,"description":""},{"name":"FB and WG 4","id":"fbwg4","image":"/images/game_images/fbwg4.jpeg","visits":263,"ranking":46,"description":"New!"},{"name":"FB and WG 5","id":"fbwg5","image":"/images/game_images/fbwg5.jpeg","visits":475,"ranking":42,"description":""},{"name":"FB and WG 6","id":"fbwg6","image":"/images/game_images/fbwg6.jpeg","visits":380,"ranking":43,"description":""},{"name":"Minecraft","id":"Minecraft","image":"/images/placeholders/minecraft.jpg","visits":38709,"ranking":1,"description":"Server List : https://eaglercraft.ru/p/servers/"},{"name":"Subway Surfers","id":"subway-surfers","image":"/images/game_images/subway-surfers.png","visits":13106,"ranking":6,"description":"New!"},{"name":"Age of War","id":"age-of-war","image":"/images/game_images/age-of-war.jpeg","visits":555,"ranking":41,"description":"New!"},{"name":"Parkour Block 2","id":"pk-block-2","image":"/fetch-image?url=https://img.gamedistribution.com/cb6ef4e519594dda80934b30f2baaff9-512x340.jpeg","visits":561,"ranking":40,"description":"New!"},{"name":"Impostor","id":"impostor","image":"/fetch-image?url=https://img.gamedistribution.com/9abe6af0fbb440b98a3e24bf7fb0636a-512x384.jpeg","visits":656,"ranking":39,"description":"New!"},{"name":"Traffic Jam 3D","id":"tf-jam-3d","image":"/fetch-image?url=https://img.gamedistribution.com/337302b23b5943d8bcfc501d81d50cdb-512x340.jpeg","visits":1146,"ranking":37,"description":"New!"}]}`);
    //sort games by visits
    games = games.games;
    
    function sortGamesByVisits() {
        games.sort(function(a, b) {
            return b.visits - a.visits;
        });
    }
    sortGamesByVisits();

    


    let searchTerm = "";
    let sortedGames = games;

    function searchGames(){
        if(searchTerm == ""){
            sortedGames = games; // If no search term, show all games
            return;
        }
        sortedGames = games.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }


    function sortGames() {
    if (selectedFilter == "visits") {
        sortedGames = sortedGames.sort((a, b) => b.visits - a.visits);
    } else if (selectedFilter == "alphabetical") {
        sortedGames = sortedGames.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedFilter == "newest") {
        // Assuming you have a 'dateAdded' property in your games data
        // sortedGames.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (selectedFilter == "oldest") {
        // Assuming you have a 'dateAdded' property in your games data
        // sortedGames.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    } else {
        console.error("Invalid filter selected");
    }
}

    $: selectedFilter, sortGames();
    let selectedFilter = "visits"; // default sort by visits
    $: searchTerm, searchGames();





    
</script>

<!-- Title and Search Bar -->
<div class="section">
    <h1 class="catalog-title">Games Catalog</h1>

    <div class="sort">
        <div class="sort-bar">
            <select bind:value={selectedFilter}>
                <option value="visits">Most Popular</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
        </div>
    
        <div class="search-bar">
            <input bind:value={searchTerm} placeholder="Search for a game..." />
        </div>
    </div>


    <div class="games-catalog">
        {#each sortedGames as game}
        <div class="game-card">
            <img src={"https://physics-central.com" + game.image} alt={game.name} class="game-image">
            <h2 class="game-title">{game.name}</h2>
            <a href={`#${game.id}`} class="game-play-button">Play</a>
        </div>
        {/each}
    </div>

</div>

<style>

/* Games Catalog CSS */

/* Games Catalog CSS */

.games-catalog {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 2em;
}

.game-card {
    display: flex;
    border: #5e35b1 0.2rem solid;
    flex-direction: column;
    align-items: center;
    width: 250px;
    @media (max-width: 768px) {
        width: 50px;
        
    }

    margin: 1em;
    padding: 1em;
    border-radius: 20px;
    background: #201f1f; /* Adjusted background color 3a3a3a */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out;
}

.game-card:hover {
    transform: scale(1.05); /* Slight zoom effect on hover */
}

.game-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 15px;
    margin-bottom: 1em;
}

.game-title {
    font-size: 20px;
    color: #f5f5f5;
    margin-bottom: 0em;
    text-align: center;
}

.game-play-button {
    margin-top: 10px;
    padding: 0.5em 1em;
    background: #9f30ee; /* Purple to match the header gradient */
    color: #f5f5f5;
    border-radius: 10px;
    text-decoration: none;
    transition: background 0.3s ease-in-out;
}

.game-play-button:hover {
    background: #7f20ce; /* Darker shade on hover */
}



/* Title and Search Bar Styling */


.catalog-title {
    background-color: #5e35b1;
    text-align: center;
    width: 100%;
    color: #f5f5f5;
    padding: 0.5em 0;
    border-radius: 15px;
    /* make bottom not rounded */
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin: 0 auto;
    margin-top: 40px;
    font-size: 2em;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Adds a subtle shadow for depth */
}

.sort {
    display: flex;
    flex-direction: row;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 60px;


}

.sort-bar {
    display: flex;
    flex-direction: row;
    position: relative;
    
}

.sort-bar select{
    padding: 0.5em 2em 0.5em 0.5em; /* Extra padding on the right for the search icon */
    font-size: 1em;
    border-radius: 15px;
    border: 2px solid #9f30ee;
    width: 250px;
    min-width: none;
    transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    background-color: #3a3a3a;
    color: #f5f5f5;
}

.search-bar {
    display: flex;
    position: relative; /* For the search icon positioning */
    padding-left: 20px;
}

.search-bar input {
    padding: 0.5em 2em 0.5em 0.5em; /* Extra padding on the right for the search icon */
    font-size: 1em;
    border-radius: 15px;
    border: 2px solid #9f30ee;
    width: 300px;
    transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    background-color: #3a3a3a;
}

.search-bar input:focus {
    border-color: #7f20ce; /* Darker shade on focus */
    box-shadow: 0 0 10px rgba(159, 48, 238, 0.5); /* Subtle glow effect */

}

.search-bar::before {
    content: '🔍'; /* Unicode search icon */
    position: absolute;
    top: 50%;
    transform: translate(310px, -50%);
    font-size: 1.2em;
}

.section{
    background: linear-gradient(135deg, #af40ff, #f9f8f9);
    padding-bottom: 20px;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 30px;
    border-radius: 15px;
}

/* Responsive Design for smaller screens */
@media (max-width: 768px) {
    .games-catalog {
        padding: 0 4em;
    }

    .game-card {
        width: 100%;
        margin: 1em 0;
    }

    .sort{
        justify-content: center;
        margin-left: 0;
    }
    .sort-bar select {
        width: 300px;
        margin: 0;
    }

    .search-bar{
        display: none;
    }

}




</style>