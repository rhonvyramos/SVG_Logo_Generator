const inquirer = require("inquirer");

let selected_text_color_hex = false;
let selected_shape_color_hex = false;

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

inquirer
.prompt(inquirer_prompts)
.then((selections) => {

    // flips booleans to true if choice is manual hex input
    if(selections.text_color == "manual color hex input") { manual_text_color_input() }
    if(selections.shape_color == "manual color hex input") { selected_shape_color_hex = true }
});

function manual_text_color_input() {
    inquirer
        .prompt([
            {
                name: "manual_color_hex_input",
                message: "Enter the color HEX value for your text. -> "
            }
        ])
        .then((hex) => {
            console.log(hex.manual_color_hex_input);
        });
}
