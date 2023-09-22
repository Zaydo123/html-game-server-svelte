<script>
	import Catalog from "./components/home/catalog.svelte";
	import Carousel from "./components/home/carousel.svelte";
	import Footer from "./components/home/footer.svelte";
	import Title from "./components/title.svelte";
	import Verify from "./verify.svelte";
</script>
<svelte:head>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3855909962178868" crossorigin="anonymous"></script>
</svelte:head>

<Verify />
<Title />
<Carousel />
<Catalog />
<Footer />
