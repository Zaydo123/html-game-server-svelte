
<script>
    import Title from "../components/title.svelte"
    let title = "";

    // function that submits the form and after a successful submission, refreshes the page
    async function submit() {
        const res = await fetch("/api/settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title })
        });

        if (res.ok) {
            window.location.reload();
        }
    }


</script>

<Title />

<div class="form-group">
    <!-- form that has input for tab title and a submit button -->
    <form on:submit|preventDefault={submit}>
        <label for="title">Custom Tab Title</label>
        <input type="text" id="title" bind:value={title} />
        <button type="submit">Submit</button>
    </form>
</div>

<style>
    .form-group {
        margin: 0 auto;
        margin-top: 20%;
        width: 50%;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: white;
    }

    input {
        display: block;
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        margin-bottom: 1rem;
    }

    button {
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        background-color: #af40ff;
        cursor: pointer;
        border: none;
        color:white;
        transition: background-color 0.2s ease-in-out;
        
    }

    button:hover {
        background-color: #9939dd;
    }

</style>