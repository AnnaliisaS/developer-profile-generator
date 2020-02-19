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
                  <body>
                  <div class="row">
                  <div class="col-sm-2">
                  </div>
                  <div class="col-sm-8">
                  <div class="card text-center">
                        <div class="card-body" style="background-color: ${favoriteColor};">
                        <p style="text-align:center;"><img class="card-img-top" style="max-width: 18rem" src="${res.data.avatar_url}" alt="Card profile image cap"></p>
                            <h3 class="card-title" style="color: white">Hi! <br> My name is ${res.data.name}</h3>
                            <a href="https://www.google.com/maps/place/${res.data.location}" class="card-link">Shoreline, WA</a>
                            <a href="${res.data.html_url}" class="card-link">GitHub Profile</a>
                            <a href="${res.data.blog}" class="card-link">Blog</a>
                        </div>
                    </div>
                    <h5 style="text-align:center;">${res.data.bio}</h5>
                    <div class="row" style="margin-bottom:20px;">
                    <div class="col-sm-1">
                    </div>
                        <div class="col-sm-5">
                            <div class="card text-center">
                                <div class="card-body" style="background-color: ${favoriteColor};">
                                    <h5 class="card-title" style="color: white">Public Repositories</h3>
                                    <p class="card-text" style="color: white">${res.data.public_repos}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="card text-center">
                                <div class="card-body" style="background-color: ${favoriteColor};">
                                    <h5 class="card-title" style="color: white">Following</h3>
                                    <p class="card-text" style="color: white">${res.data.followers}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                    <div class="col-sm-1">
                    </div>
                        <div class="col-sm-5">
                            <div class="card text-center">
                                <div class="card-body" style="background-color: ${favoriteColor};">
                                    <h5 class="card-title" style="color: white">GitHub Stars</h3>
                                    <p class="card-text" style="color: white">${res.data.starred}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="card text-center">
                                <div class="card-body" style="background-color: ${favoriteColor};">
                                    <h5 class="card-title" style="color: white">Following</h3>
                                    <p class="card-text" style="color: white">${res.data.following}</p>
                                </div>
                            </div>
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
