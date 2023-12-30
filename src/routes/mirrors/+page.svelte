<script>
  import { onMount } from "svelte";
  import Footer from '../components/home/footer.svelte';
  import Title from "../components/title.svelte"


  //get all sites from /api/getMirrors
  let sites = [];
  
  let fetchStatus = "loading..."

  async function getSites() {
    const response = await fetch('/api/getMirrors');
    sites = await response.json();
    console.log(sites);
  }

  onMount(async () => {
    await getSites();
    fetchStatus = "";
  });

  
</script>

  <style>

    .loading {
      text-align: center;
    }

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
    {#if fetchStatus == "loading..."}
      <p class="loading">{fetchStatus}</p>
    {:else if sites.length == 0}
      <p>No sites found.</p>
    {/if}
    <ul>
      {#each sites as site, i}
        <li>
          <a href={site.URL}><span>{site.Name}</span></a>
          <span class="status {site.Status}">{sites[i].Status}</span>
        </li>
      {/each}
    </ul>
  </div>


  
<Footer />
<Title />

