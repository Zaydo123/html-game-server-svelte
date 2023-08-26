<script>
    import { onMount } from "svelte";

    export let game;
    let isVisible = true; // By default, the game editor card is visible

    function closeEditor() {
        isVisible = false; // Hide the game editor card
    }

    async function updateGame() {
        const formData = new FormData();
        formData.append('id', game.ID);
        formData.append('name', game.Name);
        formData.append("dateAdded", game['Date Added']);
        formData.append('visits', game.Visits);
        formData.append('gamedistribution', game.gamedistribution);
        formData.append('extra', game.Extra);
        formData.append('enabled', game.Enabled);
        
        const imageInput = document.getElementById('image');
        if (imageInput.files.length > 0) {
            formData.append('image', imageInput.files[0]);
        }

        const response = await fetch('/api/admin/updateGame', {
            method: 'POST',
            body: formData
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const result = await response;
    }

    async function deleteGame() {
        const response = await fetch('/api/admin/deleteGame', {
            method: 'POST',
            body: JSON.stringify({ id: game.ID }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response;
    }
</script>

{#if isVisible}
<div class="game-editor">
    <div class="game-editor__cancel" on:click={closeEditor} on:keydown={closeEditor} role="button" tabindex="0">X</div>

    <div class="game-editor__image">
        <img src={game.Image} alt={game.Name}>
        <input type="file" name="image" id="image" accept="image/*">
    </div>

    <div class="game-editor__title">
        <h1>{game.Name}</h1>
        <input type="text" name="title" id="title" bind:value={game.Name}>
    </div>

    <div class="game-editor__date-added">
        <!-- shorten the date -->
        <p>Date Added ({ game['Date Added'].toString().substring(0, 15) } )</p>
        <input type="date" name="date-added" id="date-added" bind:value={game['Date Added']}>
    </div>

    <div class="game-editor__visits">
        <p>Visits</p>
        <input type="number" name="visits" id="visits" bind:value="{game.Visits}">
    </div>

    <div class="game-editor__gamedistribution">
        <p>Game Distribution Code</p>
        <input type="text" name="gamedistribution" id="gamedistribution" bind:value="{game.gamedistribution}">
    </div>

    <div class="game-editor__extra">
        <p>Extra</p>
        <textarea name="extra" id="extra" cols="30" rows="10" bind:value="{game.Extra}"></textarea>
    </div>

    <div class="game-editor__enabled">
        <p>Enabled: {game.Enabled}</p>
    </div>

    <div class="game-editor__buttons">
        <button class="game-editor__button game-editor__button--delete" on:click={deleteGame}>Delete</button>
        <button class="game-editor__button game-editor__button--save" on:click={updateGame}>Save</button>
    </div>
</div>
{/if}

<style>


.game-editor {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #5e35b1;
    width: 60%;
    max-width: 500px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    padding: 20px;
    z-index: 1;
}

.game-editor__cancel {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    cursor: pointer;
    border: none;
    color: #5e35b1;
}

.game-editor__cancel:hover {
    background-color: #ddd;
}

.game-editor__image, .game-editor__title, .game-editor__date-added, .game-editor__visits, .game-editor__gamedistribution, .game-editor__extra, .game-editor__enabled {
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.game-editor__image img {
    width: 80%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
}

input, textarea {
    width: 80%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 1em;
}

textarea {
    resize: vertical;
}

.game-editor__buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.game-editor__button {
    width: 45%;
    padding: 10px 0;
    border-radius: 10px;
    background-color: #3a3838;
    color: white;
    font-size: 1.2em;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
}

.game-editor__button:hover {
    background-color: #504e4e;
}

p {
    color: white;
    font-size: 1.2em;
    margin-bottom: 10px;
}

h1 {
    color: white;
    font-size: 2.5em;
    margin-bottom: 10px;
}




</style>