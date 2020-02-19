const fs = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

inquirer
    .prompt([{
        message: 'Enter your Github username',
        name: 'username'
    },
    {
        message: 'What is your favorite color?',
        name: 'favoriteColor'
    },
    ])
    .then(({ username, favoriteColor }) => {
        const url = `https://api.github.com/users/${username}`;
        console.log(favoriteColor);
        axios.get(url)
            .then((res) => {
                // const answers = [res.data.name, res.data.bio, res.data.blog, res.data.public_repos]
                console.log(res.data);
                function generateHTML() {
                    return `
                  <!DOCTYPE html>
                  <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
                    <title>Document</title>
                  </head>
                  <body style="background-color: ${favoriteColor};">
                    <div class="jumbotron jumbotron-fluid" style="background-color: ${favoriteColor};">
                    <div class="container" size: 90% style="background-color: white;">
                        <img src="${res.data.avatar_url}">
                      <h1 class="display-4">Hi! My name is ${res.data.name}</h1>
                      <p class="lead">I am from ${res.data.location}.</p>
                      <h3>${res.data.bio}<span class="badge badge-secondary">Contact Me</span></h3>
                      <ul class="list-group">
                        <li class="list-group-item">My GitHub username is </li>
                        <li class="list-group-item">LinkedIn: </li>
                      </ul>
                    </div>

                  </div>
                  </body>
                  </html>`;
                  }
                    const html = generateHTML(res.data);
                     return writeFileAsync("index.html", html);
                  })
                  .then(function() {
                    console.log("Successfully wrote to index.html");
                  })
                  .catch(function(err) {
                    console.log(err);
                  });
            })