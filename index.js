const inquirer = require("inquirer");

const inquirer_prompts = [
    {
        type: "",
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
        default: "black"
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
];

// calls prompt logo generator function that houses inquirer object for logo generation prompts
function init() {
    prompt_logo_generator();
};

function prompt_logo_generator() {
    inquirer
    .prompt(inquirer_prompts)
    .then((selections) => {
        console.log("Logo generated.");
    });
};


function manual_text_color_input() {
    let hex_input;
    inquirer
        .prompt([
            {
                name: "manual_color_hex_input",
                message: "Enter the color HEX value. -> "
            }
        ])
        .then((hex) => {
            console.log(hex.manual_color_hex_input);   
            hex_input = hex.manual_color_hex_input
        });

    return hex_input;
};

// init function begins program execution
init();

