const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");
const generateHTML = require("./generateHTML");
const writeFileAsync = util.promisify(fs.writeFile);

//user prompts
const questions = [
  {
    type: "input",
    name: "username",
    message: "What is your GitHub username?"
  },
  {
    type: "list",
    name: "color",
    message: "What is your favorite color?",
    choices: ["green", "blue", "pink", "red"]
  }
];

// use the info provided by user to retrieve info from GitHub and set color for cards
function getUserInfo() {
  return new Promise(function(resolve, reject) {
    inquirer.prompt(questions).then(async function(answers) {
      const { username, color } = answers;
      const queryUrl = `https://api.github.com/users/${username}`;
      try {
        const response = await axios.get(queryUrl);
        const stars = await getStars(username);
        resolve({
          ...response.data,
          color,
          stars
        });
      } catch (error) {
        reject(error);
      }
    });
  });
}
//this second call is necessary, otherwise the data retrieved from first call returns the url only for 'starred'
function getStars(username) {
  const queryUrl2 = `https://api.github.com/users/${username}/starred`;
  return axios.get(queryUrl2).then(function(res) {
    const repos = res.data.length;
    return repos;
  });
}

// html file generated from user input, then html file gets converted to pdf
async function init() {
  try {
    const data = await getUserInfo();
    const html = generateHTML(data);
    await writeFileAsync("./profile.html", html);
    pdf.create(html).toFile("./Profile Generator.pdf", function(err, res) {
      if (err) throw err;
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
