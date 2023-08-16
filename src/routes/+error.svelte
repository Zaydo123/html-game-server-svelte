

<script>
	import { page } from '$app/stores';
</script>

<link rel="stylesheet" href="/css/global.css" />

<div class="container">
	<div class="top-row">
		<h1>{$page.status}</h1>
	</div>
	<div class="bottom-row">
		<h1 id="message">{$page.error.message}</h1>
	</div>
</div>

	




<style>


	h1 { 
		color : #333;
		background-image:  linear-gradient(144deg, #af40ff, #f9f8f9);
    	background-size: 100%;
		background-color: #f3ec78;
    	-webkit-background-clip: text;
    	-moz-background-clip: text;
    	-webkit-text-fill-color: transparent; 
    	-moz-text-fill-color: transparent;
		text-align: center;
		margin-top: 0px;
		margin-bottom: 0px;
	}
	
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 90vh;
		
	}


	.top-row {
	    font-size: 4em;
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
	    align-items: center;
	}


	.bottom-row {

	    font-size: 1.5em;
		margin-top: 0;
		padding-top: 0;
		transform: translate(0, -60%);
	}

</style>

