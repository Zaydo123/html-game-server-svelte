<svelte:head>
	<link rel="stylesheet" href="/css/global.css" />
</svelte:head>
<script>

  import Footer from '../components/home/footer.svelte';

  export let data;
  const { sites } = data;
  console.log(sites);
</script>

  <style>

    .container {
      max-width: 800px;
      margin: 50px auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 21%;
    }
  
    h1 {
      text-align: center;
      color: #333;
    }
  
    ul {
      list-style-type: none;
      padding: 0;
    }
    a {
      text-decoration: none;
      color: #333;

      
    }
    a:hover {
      text-decoration: underline;
    }
  
    li {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
  
    li:last-child {
      border-bottom: none;
    }
  
    .status {
      color: green;
      font-weight: bold;
    }

    .Online::after {
      content: " ✔";
    }

    .Offline::after {
      content: " ✖";
    }

    .Offline {
      color: red;
      background-color: #fdd;

    }




  </style>


  <div class="container">
    <h1>Physics Central Mirrors</h1>
    <ul>
      {#each sites as site, i}
        <li>
          <a href={site.url}><span>{site.name}</span></a>
          <span class="status {site.status}">{sites[i].status}</span>
        </li>
      {/each}
    </ul>
  </div>


  
<Footer />
