<script>
	import Catalog from "./components/home/catalog.svelte";
	import Carousel from "./components/home/carousel.svelte";
	import Footer from "./components/home/footer.svelte";
	import Title from "./components/title.svelte";
</script>
<svelte:head>
	<link rel="stylesheet" href="/css/global.css" />
</svelte:head>

<Title />
<Carousel />
<Catalog />
<Footer />
