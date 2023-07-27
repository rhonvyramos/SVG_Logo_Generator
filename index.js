const inquirer = require("inquirer");
const fs = require("fs");

// array of objects holding required inquirer prompts
const inquirer_prompts = [
    {
        name: "characters",
        message: "Select three characters for your logo. -> ",
        default: "SVG",
        validate: (input, selections) => {
            return input.length <= 3 ? true: selections.message = "Only up to three characters allowed";
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
            "violet",
            "white",
            "black",
            "manual color hex input"
        ],
        default: "black",
    },
    // this prompt should only appear when the user selects manual color hex input for text
    {
        name: "text_color_manual_input",
        message: "Enter color HEX value for your text. -> ",
        default: "",
        when: (selections) => {
            return selections.text_color == "manual color hex input"
        }
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
    // this prompt should only appear when the user selects manual color hex input for text
    {
        name: "shape_color_manual_input",
        message: "Enter color HEX value for your shape. -> ",
        default: "",
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
        console.log(selections)

        let text, shape, text_color, shape_color;

        // assigns text_color attribute to text_color_manual_input attribute
        // if manual input prompts where answered
        if(selections.text_color_manual_input) { selections.text_color = selections.text_color_manual_input };
        if(selections.shape_color_manual_input) { selections.shape_color = selections.shape_color_manual_input };

        [text, shape, text_color, shape_color] = [selections.characters,  selections.shape, selections.text_color, selections.shape_color];

        // generates the logo using selections attributes
        logo_generator(text, shape, text_color, shape_color);
    });
};

// function that generates the SVG logo
function logo_generator(text, shape, text_color, shape_color) {
    if(text.length > 3) { 
        console.log("Your input text is too long.") 
        return 
    }

    console.log("Text: ", text);
    console.log("Shape: ", shape);
    console.log("Text Color: ", text_color);
    console.log("Shape Color: ", shape_color);

    // svg syntax for either circle, rectangle, or triangle
    // written syntax based from https://www.w3schools.com/graphics/svg_examples.asp
    let shape_syntax;

    // shape is used to determine the SVG shape syntax
    if(shape == "circle") {
        shape_syntax = `<circle cx="400" cy="400" r="160" fill="${shape_color}"/>`
    }

    if(shape == "square") {
        shape_syntax = `<rect y="202" x="202" width="400" height="400" fill="${shape_color}" />`
    }

    if(shape == "triangle") {
        shape_syntax = `<polygon points="400,100 700,650 100,650" fill="${shape_color}"/>`
    }

    // final svg syntax to place within appropriate html files
    const svg_logo = 
`<!DOCTYPE html>
<html>
<body>
<svg height="800" width="800">
    ${shape_syntax}
    <text x="400" y="400" font-size="72" text-anchor="middle" dominant-baseline="middle" fill="${text_color}">
    ${text}
    </text>
</svg>
</body>
</html>
`

    // writes to svg_logo.svg file
    fs.writeFile("svg_logo.svg", svg_logo, (err) => {
        if(err) {
            console.log("Something wrong happened. Probably your fault, to be honest.");
        } else {
            console.log("svg_logo.svg generated.");
        }
    });
};

// init function begins program execution
init();

module.exports = ({
    inquirer = require('inquirer'),
  } = {}) => (questions) => {
    return inquirer.prompt(questions).then()
}