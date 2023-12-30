<script>
//get /api/title and set it to title
import { onMount } from "svelte";

let title = "Physics Central - Where Physics Meets Fun";
let adsenseClientID = "";

onMount(() => {
    console.log("title", title);
    fetch("/api/title")
        .then((res) => res.json())
        .then((data) => {
            title = data.title;
            adsenseClientID = data.adsenseClientID;

            //then post to /api/visit to count the visit
            fetch("/api/visit", {
                method: "POST",
            });
        });
});
</script>

<svelte:head>
    <title>{title}</title>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={adsenseClientID}"
     crossorigin="anonymous"></script>
</svelte:head>
