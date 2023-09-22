<script>

    import { onMount } from 'svelte';

    onMount(async () => {

        //send request to /api/getUA
        await fetch('/api/getUA', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(data.allowed) {
                //do nothing
            } else {
                window.location.href = '/error/ua.html';
            }
        });
        

    });
    

</script>
