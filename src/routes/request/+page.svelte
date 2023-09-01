<link rel="stylesheet" href="/css/global.css" />

<script>
    import Title from "../components/Title.svelte"
    let requestType = "";
    let requestDetails = "";
  
    async function handleSubmit() {
      // Handle the form submission logic here
      const formData = new FormData();
        formData.append("requestType", requestType);
        formData.append("requestDetails", requestDetails);

        await fetch("/api/requests", {
            method: "POST",
            body: formData
        })

    }
  </script>
  
  <style>

    h1, h2 {
      color: #007bff
    }
  
    /* Container */
    .container {
      max-width: 800px;
      margin: auto;
      padding: 20px;
    }
  
    /* Section Styles */
    section {
      margin-bottom: 20px;
      padding: 20px;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
  
    /* Form Styles */
    form {
      display: flex;
      flex-direction: column;
    }
  
    label {
      font-weight: bold;
      margin-bottom: 8px;
    }
  
    select, textarea, button {
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    button {
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  </style>
  
  <div class="container">
    <h1>Requests and Reports</h1>
  
    <section>
      <h2>FAQ</h2>
        <p><b>Q: Why are there so many ads?</b></p>
        <p>A: We are trying to make money to pay for the server costs, sorry!</p>
        <p><b>Q: The site is blocked at my school, what do I do?</b></p>
        <p>A: Try using going <a href="/mirrors">here</a> and choose a mirror link.</p>
    </section>
  
    <section>
      <h2>Requests</h2>
      <form on:submit|preventDefault={handleSubmit}>
        <label for="requestType">Request Type:</label>
        <select id="requestType" bind:value={requestType} required>
          <option value="">--Select--</option>
          <option value="Game Requests">Game Requests</option>
          <option value="Feature">Feature</option>
          <option value="Mirror Links">Mirror Links</option>
          <option value="Bug Reports">Bug Reports</option>
          <option value="Support">Support</option>
        <option value="Other">Other</option>
        </select>
  
        <label for="requestDetails">Request Details:</label>
        <textarea id="requestDetails" bind:value={requestDetails}></textarea>
  
        <button type="submit">Submit</button>
      </form>
    </section>
  
    <section>
      <h2>Bug Reports</h2>
      <p>If you encounter any bugs, please report them here!</p>
    </section>
  
    <section>
      <h2>Contact</h2>
      <p>For any queries, please contact us at: <a href="mailto:admin@physics-central.com">admin@physics-central.com</a></p>
    </section>
  
    <section>
      <h2>Disclaimer</h2>
      <p>We will try our best to accommodate your request where possible. However, we cannot guarantee that your request will be fulfilled. Please understand that there are limitations for what we can put on a website.</p>
    </section>
  </div>
  
  <Title/>