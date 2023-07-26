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
            return selections.shape_color == "manual color hex input"
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

    // svg syntax for either circle, rectangle, or triangle
    // written syntax based from https://www.w3schools.com/graphics/svg_examples.asp
    let shape_syntax;

    // shape is used to determine the SVG shape syntax
    if(shape == "circle") {
        shape_syntax = `<circle cx="400" cy="400" r="160" fill="${shape_color}"/>`
    }

    if(shape == "square") {
        shape_syntax = `<rect y="250" x="250" width="400" height="400" fill="${shape_color}" />`
    }

    if(shape == "triangle") {
        shape_syntax = `<polygon points="400,100 700,650 100,650" fill="${shape_color}"/>`
    }

    // final svg syntax to place within appropriate html files
    const svg_logo = 
`<svg height="800" width="800">
    ${shape_syntax}
    <text x="400" y="400" font-size="72" text-anchor="middle" dominant-baseline="middle" fill="${text_color}">
    ${text}
    </text>
</svg>
`

    // writes to svg_logo.svg file
    fs.writeFile("svg_logo.svg", svg_logo, (err) => {
        if(err) {
            console.log("ya dingus");
        } else {
            console.log("Logo generated.");
        }
    });
};

// init function begins program execution
init();

