
<script>

    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    //get games from /api/games
    let games = [];
        


    onMount(async () => {

        const res = await fetch("/api/games?sort=visits");
        const fetchedGames = await res.json();
        games = fetchedGames;
        sortedGames = games;
    });

    let searchTerm = "";
    let sortedGames = [];
    $: sortedGames = games

    function searchGames(){
        if(searchTerm == ""){
            sortedGames = games; // If no search term, show all games
            return;
        }
        sortedGames = games.filter(game => game.Name.toLowerCase().includes(searchTerm.toLowerCase()));
    }


    async function sortGames() {
    if (selectedFilter == "visits") {
        if(browser){
            const res = await fetch("/api/games?sort=visits");
            const fetchedGames = await res.json();
            sortedGames = fetchedGames;
            console.log(sortedGames);
        }
    } else if (selectedFilter == "alphabetical") {
        if(browser){
            const res = await fetch("/api/games?sort=alphabetical");
            const fetchedGames = await res.json();
            sortedGames = fetchedGames;
            console.log(sortedGames);
        }
    } else if (selectedFilter == "date") {
        if(browser){
            const res = await fetch("/api/games?sort=dateAdded");
            const fetchedGames = await res.json();
            sortedGames = fetchedGames;
            console.log(sortedGames);
        }
    }
     else {
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
                <option value="date">Date Added</option>

            </select>
        </div>
    
        <div class="search-bar">
            <input bind:value={searchTerm} placeholder="Search for a game..." />
        </div>
    </div>


    <div class="games-catalog">
        {#each sortedGames as game}
        <div class="game-card">
            <img src={game.Image} alt={game.Name} class="game-image">
            <h2 class="game-title">{game.Name}</h2>
            <a href={`#${game.ID}`} class="game-play-button">Play</a>
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
    background: linear-gradient(135deg, #af40ff, #dbc0ee);
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