const inquirer = require("inquirer");

const inquirer_prompts = [
    {
        type: "",
        name: "characters",
        message: "Select three characters for your logo. -> ",
        default: (selections) => {
            if (selections.characters == "" ||
                selections.characters == null) { 
                return selections.characters = ""
            };
        }
    },
    {
        type: "list",
        name: "text_color",
        message: "Select a color for your logo text. -> ",
        choices: [
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "indigo",
            "violet"
        ],
        default: "red"
    }
];

inquirer
    .prompt(inquirer_prompts)
    .then((selections) => {
        console.log(selections.characters, selections.text_color);
        console.log("Logo generated");
    });