#!/usr/bin/env node
"use-strict";

var inquirer = require("inquirer");
var chalk = require("chalk");

var response = chalk.bold.green;

var resume = require("./resume.json");

var resumePrompts = {
  type: "list",
  name: "resumeOptions",
  message: "What do you want to know about me?",
  choices: [...Object.keys(resume), "Exit"]
};

function main() {
  console.log("Hello, my name is CA.");
  resumeHandler();
}

function resumeHandler() {
  inquirer.prompt(resumePrompts).then(answer => {
    if (answer.resumeOptions == "Exit") {
      return;
    }
    var option = answer.resumeOptions;
    console.log(response("--------------------------------------"));
    resume[`${option}`].forEach(info => {
        if(option == "Tech Stack" || option == "Contact"){
            console.log(response("|   => " + info));
        }else{
            // TODO: render all information
            var select = info[Object.keys(info)[0]]
            console.log(response("|   => " + select));
        }
    });
    console.log(response("--------------------------------------"));
    // console.log(resume[`${option}`]);
    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Back", "Exit"]
      })
      .then(choice => {
        if (choice.exitBack == "Back") {
          resumeHandler();
        } else {
          return;
        }
      });
  });
}

main();
