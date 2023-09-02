<script>
//get /api/title and set it to title
import { onMount } from "svelte";

let title = "Physics Central - Where Physics Meets Fun";

onMount(() => {
    console.log("title", title);
    fetch("/api/title")
        .then((res) => res.json())
        .then((data) => (title = data.title));

    //then post to /api/visit to count the visit
    fetch("/api/visit", {
        method: "POST",
    });

    



});


</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>
