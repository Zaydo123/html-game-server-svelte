<link rel="stylesheet" href="/css/global.css" />

<div class="message">
    <h1>Hey!</h1>
    <h2>Sure you should be here?</h2>
    <button on:click={() => window.location.href = '/'}>Go back</button>
</div>

<style>

.message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
}

.message h1 {
    color: #fff;
    font-size: 5rem;
    margin-bottom: 0;
}

.message h2 {
    font-size: 2rem;
    margin-top: 0;
    color: #fff;
}

.message button {
    background: #fff;
    border: none;
    border-radius: 5px;
    padding: 1rem 2rem;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}





</style>