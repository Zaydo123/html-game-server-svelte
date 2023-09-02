<svelte:head>
<link rel="stylesheet" href="/css/global.css" />
</svelte:head>

<script>

  import { onMount } from "svelte";

  let username = '';
  let password = '';
  
  //send request to /authorization/compare-authorization to see if already logged in 
    onMount(async () => {
        const response = await fetch('/api/admin/authorization/compare-authorization', {
            method: 'POST'
        });
    
        // Clear the password for security reasons
        password = '';
    
        if (response.status === 200) {
            // Redirect to the hub if credentials are confirmed
            window.location.href = '/admin/hub';
        } 
    });


  async function handleLogin() {
      const response = await fetch('/api/admin/authorization', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      });
  
      // Clear the password for security reasons
      password = '';
  
      if (response.status === 200) {
          // Redirect to the hub if credentials are confirmed
          window.location.href = '/admin/hub';
      } else {
          alert('Invalid credentials');
      }
  }
  </script>
    
  <div class="login-box">
      <form on:submit|preventDefault={handleLogin}>
          <div class="user-box">
              <input bind:value={username} type="text" name="" required="">
              <label for="">Username</label>
          </div>
          <div class="user-box">
              <input bind:value={password} type="password" name="" required="">
              <label for="">Password</label>
          </div>
          <center>
              <button class="login-button" type="submit">
                  SEND
                  <span></span>
              </button>
          </center>
      </form>
  </div>
  
  <style>
  /* ... Your existing styles ... */
  .login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(24, 20, 20, 0.987);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #bdb8b8;
  font-size: 12px;
}

.login-box a span {
  position: absolute;
  display: block;
}

  /* Styles for the button to mimic the <a> element */
  .login-button {
      background: none;
      border: none;
      position: relative;
      display: inline-block;
      padding: 10px 20px;
      color: #ffffff;
      font-size: 16px;
      text-decoration: none;
      text-transform: uppercase;
      overflow: hidden;
      transition: .5s;
      margin-top: 40px;
      letter-spacing: 4px;
      cursor: pointer;
      outline: none;
  }
  
  .login-button:hover {
      background: #03f40f;
      color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 5px #03f40f,
                  0 0 25px #03f40f,
                  0 0 50px #03f40f,
                  0 0 100px #03f40f;
  }
  
  .login-button span {
      position: absolute;
      bottom: 2px;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #03f40f);
      animation: btn-anim1 2s linear infinite;
  }
  
  @keyframes btn-anim1 {
      0% {
          left: -100%;
      }
      50%,100% {
          left: 100%;
      }
  }
  
  /* ... Rest of your styles ... */
  </style>
  