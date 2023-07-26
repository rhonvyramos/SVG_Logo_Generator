const inquirer = require("inquirer");

// array of objects holding required inquirer prompts
const inquirer_prompts = [
    {
        name: "characters",
        message: "Select three characters for your logo. -> ",
        default: ""
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
            "violet",
            "white",
            "black",
            "manual color hex input"
        ],
        default: "black",
    },
    {
        type: "list",
        name: "shape",
        message: "Select a shape for your logo. -> ",
        choices: [
            "circle",
            "triangle",
            "square"
        ],
        default: "circle"
    },
    {
        type: "list",
        name: "shape_color",
        message: "Select a color for your shape. -> ",
        choices: [
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "indigo",
            "violet",
            "white",
            "black",
            "manual color hex input"
        ],
        default: "black"
    },
    {
        name: "text_color_manual_input",
        message: "Enter color HEX value for your text. -> ",
        when: (selections) => {
            return selections.text_color == "manual color hex input"
        }
    },
    {
        name: "shape_color_manual_input",
        message: "Enter color HEX value for your shape. -> ",
        when: (selections) => {
            return selections.text_color == "manual color hex input"
        }
    },
];

// calls prompt logo generator function that houses inquirer object for logo generation prompts
function init() {
    prompt_logo_generator();
};

// function that executes inquirer to prompt user for logo attributes
function prompt_logo_generator() {
    inquirer
    .prompt(inquirer_prompts)
    .then((selections) => {
        console.log("Logo generated.");
    });
};

// init function begins program execution
init();

