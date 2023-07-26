const inquirer = require("inquirer");
const fs = require("fs");

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
    prompt_logo_inputs();
};

// function that executes inquirer to prompt user for logo attributes
function prompt_logo_inputs() {
    inquirer
    .prompt(inquirer_prompts)
    .then((selections) => {
        let text, shape, text_color, shape_color;

        if(selections.text_color_manual_input) { selections.text_color = selections.text_color_manual_input };
        if(selections.shape_color_manual_input) { selections.shape_color = selections.shape_color_manual_input };

        [text, shape, text_color, shape_color] = [selections.characters,  selections.shape, selections.text_color, selections.shape_color];

        // generates the logo using selections attributes
        logo_generator(text, shape, text_color, shape_color);
    });
};

// function that generates the SVG logo
function logo_generator(text, shape, text_color, shape_color) {
    console.log(text, shape, text_color, shape_color);

    const svg_logo = 
`<svg height="100" width="100">
    <circle cx="50" cy="50" r="33" stroke="black" stroke-width="3" fill="violet" />
    Sorry, your browser does not support inline SVG.  
</svg>`

    fs.writeFile("svg_logo.svg", svg_logo_syntax, (err) => {
        if(err) {
            console.log("ya dingus");
        } else {
            console.log("Logo generated.");
        }
    });
};

// init function begins program execution
init();

