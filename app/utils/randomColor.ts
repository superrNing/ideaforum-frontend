import * as colors from "@mui/material/colors";
const colorsArray = [
  "amber",
  "blue",
  "blueGrey",
  "brown",
  "common",
  "cyan",
  "deepOrange",
  "deepPurple",
  "green",
  "grey",
  "indigo",
  "lightBlue",
  "lightGreen",
  "lime",
  "orange",
  "pink",
  "purple",
  "red",
  "teal",
  "yellow",
];

const shadesArray = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export function getRandomColorByLetter(letter: string = "a") {
  const charCode = letter.charCodeAt(0);

  const colorIndex = charCode % colorsArray.length;
  const shadeIndex = charCode % shadesArray.length;

  const color = colorsArray[colorIndex];
  const shade = shadesArray[shadeIndex];

  return colors[color][shade];
}

export function getRandomColor() {
  const randomColorIndex = Math.floor(Math.random() * colorsArray.length);
  const randomIndex = Math.floor(Math.random() * shadesArray.length);

  console.log(colorsArray[randomColorIndex]);

  let color = colorsArray[randomColorIndex];
  let shade = shadesArray[randomIndex];

  return colors[color][shade];
}
