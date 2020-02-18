const fs = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');

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
    .then(({username, favoriteColor}) => {
        const url = `https://api.github.com/users/${username}`;
        console.log(favoriteColor);
        axios.get(url)
            .then((res) => {
               console.log(res.data);
            })
    })