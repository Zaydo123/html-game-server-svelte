<script>
//get /api/title and set it to title
import { onMount } from "svelte";

let title = "Physics Central - Where Physics Meets Fun";

onMount(() => {
    console.log("title", title);
    fetch("/api/title")
        .then((res) => res.json())
        .then((data) => (title = data.title));
});


</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>
