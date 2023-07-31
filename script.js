"use strict";

const scrollbar = document.querySelector(".scrollbar");
const themeSlider = document.querySelector(".theme-slider");
const darkThemeEnabled = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

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

const display = document.querySelector(".display");

const keypad = document.querySelector(".keypad");

let currString = "";
let totalString = "";

keypad.addEventListener("click", function (e) {
  const btn = e.target;

  if (btn.tagName !== "SPAN") return;

  const addSpaceString = function (string) {
    return string
      .split("")
      .reverse()
      .join("")
      .replace(/\d{3}(?=.)/g, "$& ")
      .split("")
      .reverse()
      .join("");
  };

  switch (btn.classList[0]) {
    case "num":
      if (Number(totalString.at(-1))) totalString = "";
      currString += btn.dataset.num;
      display.textContent = addSpaceString(currString);
    case "decimal":
      break;
    case "operator":
      totalString += currString + btn.dataset.ope;
      currString = "";
      display.textContent = "0";
      break;
    case "del":
      currString = currString.slice(0, -1);
      display.textContent = addSpaceString(currString);
      break;
    case "reset":
      totalString = "";
      currString = "";
      display.textContent = "0";
      break;
    case "equal":
      totalString += currString;
      currString = "";
      totalString = String(eval(totalString));
      display.textContent = addSpaceString(totalString);
      break;
  }

  if (display.textContent === "") display.textContent = "0";
});
