"use strict";

const scrollbar = document.querySelector(".scrollbar");
const themeSlider = document.querySelector(".theme-slider");
const darkThemeEnabled = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

const display = document.querySelector(".display");
const keypad = document.querySelector(".keypad");

themeSlider.addEventListener("click", function () {
  if (Number.parseInt(scrollbar.style.marginLeft) === 76) {
    scrollbar.style.marginLeft = "0";
  } else scrollbar.style.marginLeft = String(Number.parseInt(scrollbar.style.marginLeft) + 38) + "%";

  document.documentElement.dataset.theme = `theme${
    Number.parseInt(scrollbar.style.marginLeft) / 38 + 1
  }`;
});

if (darkThemeEnabled) {
  document.documentElement.dataset.theme = `theme3`;
  scrollbar.style.marginLeft = "76%";
}

/* VARIABLES FOR THE CALCULATOR */
let currString = "";
let totalString = "";

keypad.addEventListener("click", function (e) {
  const btn = e.target;

  if (btn.tagName !== "SPAN") return;

  const addCommaString = function (string) {
    // this way the commas get added at the start of the string as it shoud
    if (string.includes(".")) {
      return addCommaString(string.split(".")[0]) + "." + string.split(".")[1];
    }

    return string
      .split("")
      .reverse()
      .join("")
      .replace(/\d{3}(?=.)/g, "$&,")
      .split("")
      .reverse()
      .join("");
  };

  const addToDisplay = function (string) {
    if (string.length > 14) display.style.fontSize = "1.8rem";
    else display.style.fontSize = "3.2rem"; //resize to normal

    if (string === "") display.textContent = "0";
    else display.textContent = addCommaString(string);
  };

  switch (btn.classList[0]) {
    case "num":
      if (Number(totalString.at(-1))) totalString = "";
      if (currString === "0") currString = "";
      if (currString.length > 23) return;
      currString += btn.dataset.num;
      addToDisplay(currString);
      break;
    case "decimal":
      if (currString.length >= 23) return;
      if (currString.includes(".")) return;
      currString += ".";
      addToDisplay(currString);
      break;
    case "operator":
      if (currString === "0") return;
      /* ONLY ONE OPERATOR AT THE TIME */
      if (totalString !== "" && !Number(totalString.at(-1))) return;
      totalString += currString + btn.dataset.ope;
      currString = "";
      addToDisplay(currString);
      break;
    case "del":
      currString = currString.slice(0, -1);
      addToDisplay(currString);
      break;
    case "reset":
      totalString = "";
      currString = "";
      addToDisplay(currString);
      break;
    case "equal":
      totalString += currString;
      currString = "";
      if (!Number(totalString.at(-1))) totalString = totalString.slice(0, -1);
      totalString = String(eval(totalString));
      addToDisplay(totalString);
      break;
  }
});
