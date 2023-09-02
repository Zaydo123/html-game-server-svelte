
<!-- link stylesheet global -->
<svelte:head>
    <link rel='stylesheet' href='/css/global.css' />
</svelte:head>
<script>
    import { browser } from '$app/environment';
    import GameEditor from './components/gameEditor.svelte';
    import CreateGame from './components/createGame.svelte';
	import { onMount } from 'svelte';
    
    export let data = [];
    let { games } = data;

    if(browser){
        if(games[0] == "Not Authenticated") {
            window.location.href = './';
            console.log('redirecting');
        } else {
            console.log('logged in');
        }
    }

    if(games == undefined) {
        games = [];
    }

    async function toggleGameEnabled(game) {
        try {
            const res = await fetch(`/api/admin/enable?id=${game.ID}`, {
                method: 'POST'
            });
    
            if (res.status === 200) {
                const newGames = games.map(g => {
                    if (g.ID === game.ID) {
                        return {
                            ...g,
                            Enabled: game.Enabled === 1 ? 0 : 1
                        };
                    }
                    return g;
                });
                data = {
                    ...data,
                    games: newGames
                };
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function searchGame(query) {
        // send request to /api/games but add query of ?showDisabled as well
        try {
            const res = await fetch(`/api/games?search=${query}&showDisabled=true`);
            const fetchedGames = await res.json();
            games = fetchedGames;
        } catch (e) {
            console.log(e);
        }

    }

    async function filterGames(method) {
        // Implement the sorting/filtering mechanism and update the games variable here
        // send request to /api/games with query of ?sort=method and ?showDisabled=true
        try{
            const res = await fetch(`/api/games?sort=${method}&showDisabled=true`);
            const fetchedGames = await res.json();
            games = fetchedGames;
        } catch (e) {
            console.log(e);
        }

    }

    let requests = [];
    async function fetchRequests() {
        try {
            const res = await fetch(`/api/admin/fetchRequests`);
            console.log(res);
            const fetchedRequests = await res.json();
            requests = fetchedRequests;

            console.log(requests);

        } catch (e) {
            console.log(e);
        }
    }

    onMount(() => {
        fetchRequests();
    });




</script>

<h1 class="admin-hub-title">Admin Hub</h1>

<div class="control-header">
    <button class="new-game-button" on:click={ () => {
        new CreateGame({
            target: document.body,
        })
    }
}>+</button>
<select name="sort" id="sort" on:change={(e) => filterGames(e.target.value)}>
    <option value="ID">ID</option>
    <option value="alphabetical">Title</option>
    <option value="visits">Visits</option>
    <option value="dateAdded">Date Added</option>
</select>
<p>OR</p>
<input type="text" name="search" id="search" placeholder="Search...">
<button id="search-button" on:click={() => searchGame(document.getElementById('search').value)}>Search</button>
</div>

<div class="game-list-header">
    <div class="game-list-header__id">
        <h4>ID</h4>
    </div>
    <div class="game-list-header__title">
        <h4>Title</h4>
    </div>
    <div class="game-list-header__visits">
        <h4>Visits</h4>
    </div>
</div>

<div class="games">
{#each games as game}
    <div class="game-card">
        <div class="game__id">
            <p>{game.ID}</p>
        </div>

        <div class="game__title">
            <h4>{game.Name}</h4>
        </div>
        <div class="game__visits">
            <p>{game.Visits}</p>
        </div>

        <div class="edit-button">
            <button on:click={() => {
                const editor = new GameEditor({
                    target: document.body,
                    props: {
                        game
                    }
                });
                editor.$on('close', () => {
                    editor.$destroy();
                });
                window.scrollTo(0, 0);
            }}>Edit</button>
        </div>

        <div class="checkbox-con">
            {#if game.Enabled == 1}
                <input id="checkbox-{game.ID}" type="checkbox" checked on:click={() => toggleGameEnabled(game)} />
            {:else}
                <input id="checkbox-{game.ID}" type="checkbox" on:click={() => toggleGameEnabled(game)} />
            {/if}
        </div>
    </div>
{/each}
</div>

<h1 class="admin-hub-title">Requests</h1>
<!-- table of requests from /api/admin/requests -->
<table class="requests-table">
    <tr>
        <th>Type</th>
        <th>Details</th>
        <th>Date</th>
        <th>IP</th>
    </tr>

    {#if requests.length == 0}
        <tr>
            <td colspan="6">No requests</td>
        </tr>
    {:else}
        {#each requests as request}
            <tr>
                <td>{request.Type}</td>
                <td>{request.Details}</td>
                <td>{new Date(request.Date).toLocaleString().split(',')[0]}</td>

                <td>{request.IP}</td>
            </tr>
        {/each}
    {/if}



</table>




<style>

    /* table */
    .requests-table {
        width: 90%;
        margin: auto;
        margin-top: 20px;
        border-collapse: collapse;
    }

    .requests-table td, .requests-table th {
        border: 1px solid #ddd;
        padding: 8px;
        max-width: 500px;
        color: white;
        overflow : hidden;
    }

    .requests-table tr:hover {background-color: #ea0707;}

    .requests-table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #af40ff;
        color: white;
    }
    

    

    .admin-hub-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 90%;
        height: 60px;
        border-radius: 20px;
        background: linear-gradient(135deg, #af40ff, #dbc0ee);
        margin: auto;
        margin-top: 20px;
        color: white;
    }

    .game-list-header {
        display: flex;
        flex-direction: row;
        align-items: left;
        width: 75%;
        height: 60px;
        border-radius: 10px;
        padding: 8px;
        background-color: #00000040;
        margin: auto;
        margin-top: 20px;
        color: white;
    }

    .game-list-header__id{
        padding-left: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 10%;
        height: 60px;
    }

    .game-list-header__title {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 80%;
        height: 100%;
        margin-left: 2%;
    }

    .game-list-header__visits {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 15%;
        height: 100%;
        margin-right: 10%;
    }


    .games {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .game-card {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 75%;
        height: 60px;
        border-radius: 10px;
        /* shadow */
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
        background-color: #9e818115;
        padding: 5px;
        color: white;
        margin: 10px;
    }

    .game__id {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 10%;
        height: 100%;
        padding: 5px;
        margin-left: -5px;
        border-radius: 10px 0px 0px 10px;
        background: #5e35b1;
    }

    .game__title {
        display: flex;
        flex-direction: row;
        width: 80%;
        height: 100%;
        margin-left: 2%;
    }

    .game__visits {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 15%;
        height: 100%;
    }

    /* checkbox */

    .checkbox-con {
        margin: 10px;
        display: flex;
        align-items: center;
        color: white;
       }
       
       .checkbox-con input[type="checkbox"] {
        appearance: none;
        width: 48px;
        height: 27px;
        border: 2px solid #ff0000;
        border-radius: 20px;
        background: #f1e1e1;
        position: relative;
        box-sizing: border-box;
       }
       
       .checkbox-con input[type="checkbox"]::before {
        content: "";
        width: 14px;
        height: 14px;
        background: rgba(234, 7, 7, 0.5);
        border: 2px solid #ea0707;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(13%, 15%);
        transition: all 0.3s ease-in-out;
       }
       
       .checkbox-con input[type="checkbox"]::after {
        content: url("data:image/svg+xml,%3Csvg xmlns='://www.w3.org/2000/svg' width='23' height='23' viewBox='0 0 23 23' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.55021 5.84315L17.1568 16.4498L16.4497 17.1569L5.84311 6.55026L6.55021 5.84315Z' fill='%23EA0707' fill-opacity='0.89'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.1567 6.55021L6.55012 17.1568L5.84302 16.4497L16.4496 5.84311L17.1567 6.55021Z' fill='%23EA0707' fill-opacity='0.89'/%3E%3C/svg%3E");
        position: absolute;
        top: 0;
        left: 20px;
       }
       
       .checkbox-con input[type="checkbox"]:checked {
        border: 2px solid #02c202;
        background: #e2f1e1;
       }
       
       .checkbox-con input[type="checkbox"]:checked::before {
        background: rgba(2, 194, 2, 0.5);
        border: 2px solid #02c202;
        transform: translate(133%, 13%);
        transition: all 0.3s ease-in-out;
       }
       
       .checkbox-con input[type="checkbox"]:checked::after {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='13' viewBox='0 0 15 13' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.8185 0.114533C15.0314 0.290403 15.0614 0.605559 14.8855 0.818454L5.00187 12.5L0.113036 6.81663C-0.0618274 6.60291 -0.0303263 6.2879 0.183396 6.11304C0.397119 5.93817 0.71213 5.96967 0.886994 6.18339L5.00187 11L14.1145 0.181573C14.2904 -0.0313222 14.6056 -0.0613371 14.8185 0.114533Z' fill='%2302C202' fill-opacity='0.9'/%3E%3C/svg%3E");
        position: absolute;
        top: 5px;
        left: 5px;
       }

    /* edit button */
       
    .edit-button button{
         background-color: #5e35b1;
         border: none;
         color: white;
         padding: 8px 15px;
         text-align: center;
         text-decoration: none;
    }

    .control-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        width: 45%;
        height: 60px;
        border-radius: 10px;
        background-color: #9e818115;
        color: white;
        margin-top: 20px;
        margin-left: 5%;
    }

    .control-header input {
        width: 20%;
        height: 40%;
        border-radius: 20px;
        border: none;
        margin: 10px;
    }

    .control-header button {
        background-color: #5e35b1;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        margin: 10px;
        border-radius: 0px;
    }

    .control-header select {
        width: 20%;
        height: 40%;
        border-radius: 20px;
        border: none;
        margin: 10px;
    }

    #search {
        padding-left: 8px;
    }
    #sort {
        padding-left: 8px;
    }



</style>


