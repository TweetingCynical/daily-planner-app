# Daily Planner App

## A simple daily planner app which allows users to save task details on an hourly basis, using JavaScript and CSS to interact with the html elements on the page

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
        <li><a href="#about-the-project">About The Project</a></li>
        <li><a href="#deployment">Deployment / Code Repository</a></li>
        <li><a href="#screenshot">Screenshot</a></li>
        <li><a href="#scope-and-purpose">Scope and Purpose</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#pseudocode">Pseudocode</a></li>
        <li><a href="#overview-of-build">Overview of Build</a></li>
        <li><a href="#suggested-future-changes">Suggested Future Changes</a></li>
        <li><a href="#license">License</a></li>
      </ol>
</details>

<!-- About the Project -->

## About the Project

### Deployment / Code Repository

[Live deployment](https://tweetingcynical.github.io/daily-planner-app/)

[Repository](https://github.com/TweetingCynical/daily-planner-app)

### Screenshot

Working version of the site should look like this at standard screen size:
![Site Screenshot](./assets/screenshot.png)

After saving data, the site should look like this at standard screen size:
![Site Screenshot](./assets/screenshot-postsave.png)

### Scope and Purpose

Build an interactive daily planner app with functionality that ensures tasks are restored to the page if a user saves and leaves. Further, the tasks should not show if they were not saved on the same date as today, to ensure that each page loads fresh each day. Finally, the hourly rows should be colour coded to see which are past, present or future.

### Usage

This site and its codeset are for educational purposes only.

### Installation

N/A

## Pseudocode

Steps to achieving the working Daily Planner App:

- On page load, display current date and time on header;
- Update time every second so that it changes on the change of each minute;
- Create the diary structure on page:
  - Hour time;
  - Task text area;
  - Type select options;
  - Save button
- Load saved row data from localStorage, checking that the saved date of any options are on today's date:
  - Object with key/value pairs:
    {
    timestamp: date,
    9: [text, type, saved]
    10: [text, type, saved]
    ... etc
    }
- Style each diary row based on the current time:
  - Rows that fall BEFORE the current hour (faded purple);
  - Row this is current hour (orange);
  - Rows that fall AFTER current hour (faded orange);
- Create the styling such that it changes on the hour change
- Save row data to localStorage using correct format

## Overview of Build

Some of the key JavaScript skills being utilised:

- Use of moment.js to format and display the correct date:

  ```javascript
  const currentDay = $("#currentDay");
  let displayDate = moment().format("dddd, Do of MMMM YYYY");
  currentDay.text(displayDate);
  ```

- Use of a for loop to check the current hour, and match correct styling to the relevant rows:

  ```javascript
  for (let i = 0; i < workingHours.length; i++) {
    if (moment().hour() === workingHours[i]) {
      $("#" + workingHours[i]).attr("class", "row time-block present");
    } else if (moment().hour() > workingHours[i]) {
      $("#" + workingHours[i]).attr("class", "row time-block past");
    } else {
      $("#" + workingHours[i]).attr("class", "row time-block future");
    }
  }
  ```

- Use of jQuery to add all row elements to the page with correct css styling and text value content:

  ```javascript
  function createDiary() {
    for (let i = 0; i < workingHours.length; i++) {
      let inputAdd = $("<section>").addClass("row time-block");
      inputAdd.attr("id", workingHours[i]);
      container.append(inputAdd);
      let hourAdd = $("<section>")
        .addClass("col-lg-1 col-md-2 col-sm-6 col-6 hour")
        .text(`${workingHours[i]}:00`);
      let selectAdd = $("<select>")
        .addClass("type col-lg-2 col-md-2 col-sm-6 col-6")
        .attr("id", `select-${workingHours[i]}`);
      let workOpt = $("<option>").attr("name", "work").text("Work");
      let personalOpt = $("<option>").attr("name", "personal").text("Personal");
      let otherOpt = $("<option>").attr("name", "other").text("Other");
      let textAreaAdd = $("<textarea>").addClass(
        "col-lg-8 col-md-7 col-sm-10 col-10 task"
      );
      let buttonAdd = $("<button>").addClass(
        "button saveBtn col-lg-1 col-md-1 col-sm-2 col-2"
      );
      let buttonIconAdd = $("<i>").addClass("fa-regular fa-floppy-disk");

      selectAdd.append(workOpt).append(personalOpt).append(otherOpt);
      inputAdd.append(hourAdd, selectAdd, textAreaAdd, buttonAdd);
      buttonAdd.append(buttonIconAdd);
    }
  }
  ```

- Use of localStorage to get previously saved items from the user's browser:

  ```javascript
  function fromStorage() {
    let plannerObject = JSON.parse(localStorage.getItem("plannerObject"));

    if (plannerObject !== null) {
      plannerStorage = plannerObject;
    }
    return plannerStorage;
  }
  ```

- Function to save the correct row's data into the localStorage:

  ```javascript
  $(document).on("click", ".saveBtn", function () {
    let timeKey = $(this).parent().attr("id");
    let text = $(this).siblings(".task").val();
    let type = $(this).siblings(".type").val();
    let saved = moment();
    toStorage(timeKey, text, type, saved);
  });
  ```

- Use of the stored objects to save changes to the user's localStorage:

  ```javascript
  function toStorage(timeKey, textSave, typeSave, savedSave) {
    plannerStorage[timeKey].text = textSave;
    plannerStorage[timeKey].type = typeSave;
    plannerStorage[timeKey].saved = savedSave;
    localStorage.setItem("plannerObject", JSON.stringify(plannerStorage));
  }
  ```

### Suggested future changes

- Add a delete button to remove options from the row and then overwrite saved data;
- Implement an .ics file that can be downloaded to add each event to someone's calendar

## License

MIT License

Copyright (c) 2022 TweetingCynical

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
