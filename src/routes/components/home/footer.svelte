<footer class="footer">
    <div>
      <ul>
        <li><a href="mailto:support@physics-central.com">Support</a></li>
        <li><a href="/mirrors">Mirror Links&nbsp;</a></li>
        <li><a href="/requestapp">Game Requests</a></li>
        <li><a href="https://github.com/Zaydo123/html-game-server/issues/new" target="_blank">Bug Reports</a></li>
        <li><a href="https://github.com/Zaydo123/html-game-server">Github</a></li>
      </ul>
    </div>
</footer>


<style>

.footer {
  height: 50px;
  background: linear-gradient(144deg, #af40ff, #f9f8f9);
  color: #fff;
  padding: 1em;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 -15px 30px -5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
}
.footer ul {
  display: flex;
  grid-auto-flow: row;
  grid-gap: 24px;
  justify-items: center;
  margin: auto;
    padding: 0;
}

@media (min-width: 500px) {
  ul {
    grid-auto-flow: column;
  }
}

.footer a {
  color: white;
  text-decoration: none;
  box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, 0.4);
}

.footer a:hover {
  box-shadow: inset 0 -1.2em 0 hsla(0, 0%, 100%, 0.4);
}
.footer li {
  list-style: none;
}
.footer li:last-child {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.footer li:hover ~ li p {
  animation: wave-animation 0.3s infinite;
}

.footer div {
  display: flex;
  width: 100%;
  line-height: 1.3;
}

@keyframes wave-animation {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-15deg);
  }
}

@media (max-width: 500px) {
  .footer {
    flex-direction: column;
    height: max-content;
  }
  .footer ul {
    flex-direction: column;
  }



}

</style>