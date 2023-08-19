
<!-- link stylesheet global -->
<link rel='stylesheet' href='/css/global.css' />
<script>

    import { browser } from '$app/environment';
    import GameEditor from './components/gameEditor.svelte';
    
    export let data = [];
    let { games } = data;

    if(browser){
        if( games[0] == "Not Authenticated") {
            window.location.href = './';
            console.log('redirecting');
        } else {
            console.log('logged in');
        }
    }

    if( games == undefined ) {
        games = [];
    }


    async function toggleGameEnabled(game) {
        try {
            // make a request to the api to toggle the game's status
            const res = await fetch(`api/enable?id=${game.ID}`, {
                method: 'POST'
            });
    
            // if successful, update the games list
            if (res.status === 200) {
                const newGames = games.map(g => {
                    // if the game is the one we're updating, toggle its status
                    if (g.ID === game.ID) {
                        return {
                            ...g,
                            Enabled: game.Enabled === 1 ? 0 : 1
                        };
                    }

                    // otherwise, return the original game
                    return g;
                });

                // set the new games list
                data = {
                    ...data,
                    games: newGames
                };
            }
        } catch (e) {
            console.log(e);
        }
    }
    

</script>


<h1 class="admin-hub-title">Admin Hub</h1>


<div class="game-list-header">
    <!-- id name and visits header -->
    <div class="game-list-header__id">
        <h4>ID</h4>
    </div>

    <div class="group-title">

        <div class="game-list-header__title">
            <h4>Title</h4>
        </div>
        <div class="game-list-header__visits">
            <h4>Visits</h4>
        </div>

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
           <!--popup gameeditor when button is clicked  -->
            <button on:click={() => {
                const editor = new GameEditor({
                    target: document.body,
                    props: {
                        game
                    }
                });
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



<style>

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
    }

    .game-list-header {
        display: flex;
        flex-direction: row;
        align-items: left;
        width: 75%;
        height: 60px;
        border-radius: 20px;
        background-color: #3a3838;
        margin: auto;
        margin-top: 20px;

    }

    .group-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        border-radius: 0px 20px 20px 0px;
        border: #af40ff 2px solid;
    }

    .game-list-header__id{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 5%;
        height: 60px;
        border-radius: 20px 0px 0px 20px;
        background: #504e4e;
    }

    .game-list-header__title {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 80%;
        height: 100%;
        margin-left: 2%;
        border-radius: 0px 20px 20px 0px;
    }

    .game-list-header__visits {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 15%;
        height: 100%;
        border-radius: 0px 20px 20px 0px;
        margin-right: 7%;
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
        border-radius: 20px;
        /* shadow */
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
        background-color: #3a3838;
        margin: 10px;
    }

    .game__id {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 5%;
        height: 100%;
        border-radius: 20px 0px 0px 20px;
        background: #504e4e;
    }

    .game__title {
        display: flex;
        flex-direction: row;
        width: 80%;
        height: 100%;
        margin-left: 2%;
        border-radius: 0px 20px 20px 0px;
    }

    .game__visits {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 15%;
        height: 100%;
        border-radius: 0px 20px 20px 0px;
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


</style>


