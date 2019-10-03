const fetch = require("node-fetch");

document
  .getElementById('form')
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    fetch(`http://127.0.0.1:5000/${name}/`)
      .then(resp => resp.json())
      .then(({message}) => {
        document.getElementById('result').innerText = message;
      });
  });
