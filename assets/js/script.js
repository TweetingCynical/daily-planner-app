// Wrap all code in document ready function so that the JS doesn't run until all elements on the page have loaded
$(document).ready(function () {
  const workingHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const container = $(".container");
  const currentDay = $("#currentDay");
  let displayDate = moment().format("dddd, Do of MMMM YYYY");
  currentDay.text(displayDate);

  // Store default fresh page options for hour, task, type and saved
  let plannerStorage = {
    8: {
      text: "",
      type: "Work",
      saved: "",
    },
    9: {
      text: "",
      type: "Work",
      saved: "",
    },
    10: {
      text: "",
      type: "Work",
      saved: "",
    },
    11: {
      text: "",
      type: "Work",
      saved: "",
    },
    12: {
      text: "",
      type: "Work",
      saved: "",
    },
    13: {
      text: "",
      type: "Work",
      saved: "",
    },
    14: {
      text: "",
      type: "Work",
      saved: "",
    },
    15: {
      text: "",
      type: "Work",
      saved: "",
    },
    16: {
      text: "",
      type: "Work",
      saved: "",
    },
    17: {
      text: "",
      type: "Work",
      saved: "",
    },
    18: {
      text: "",
      type: "Work",
      saved: "",
    },
  };

  // Updates the current time. Note: Run setInterval to handle updating the page every second
  function updateTime() {
    displayDate = moment().format("dddd, Do of MMMM YYYY");
    currentDay.text(displayDate);

    // For loop to continually check time for restyling rows, and add correct classes
    for (let i = 0; i < workingHours.length; i++) {
      if (moment().hour() === workingHours[i]) {
        $("#" + workingHours[i]).attr("class", "row time-block present");
      } else if (moment().hour() > workingHours[i]) {
        $("#" + workingHours[i]).attr("class", "row time-block past");
      } else {
        $("#" + workingHours[i]).attr("class", "row time-block future");
      }
    }
    return displayDate;
  }

  // Create the diary structure on the html page
  function createDiary() {
    // For loop using the workingHours structure
    for (let i = 0; i < workingHours.length; i++) {
      // Create a row
      let inputAdd = $("<section>").addClass("row time-block");
      inputAdd.attr("id", workingHours[i]);
      container.append(inputAdd);

      // Create hour display
      let hourAdd = $("<section>")
        .addClass("col-lg-1 col-md-2 col-sm-6 col-6 hour")
        .text(`${workingHours[i]}:00`);

      // Create option selection
      let selectAdd = $("<select>")
        .addClass("type col-lg-2 col-md-2 col-sm-6 col-6")
        .attr("id", `select-${workingHours[i]}`);
      let workOpt = $("<option>").attr("name", "work").text("Work");
      let personalOpt = $("<option>").attr("name", "personal").text("Personal");
      let otherOpt = $("<option>").attr("name", "other").text("Other");

      // Create textarea
      let textAreaAdd = $("<textarea>").addClass(
        "col-lg-7 col-md-6 col-sm-8 col-12 task"
      );
      //Create save button
      let buttonAdd = $("<button>").addClass(
        "button saveBtn col-lg-1 col-md-1 col-sm-2 col-6"
      );
      let buttonIconAdd = $("<i>").addClass("fa-regular fa-floppy-disk");

      //Create clear button
      let clearAdd = $("<button>").addClass(
        "button clearBtn col-lg-1 col-md-1 col-sm-2 col-6"
      );
      let clearIconAdd = $("<i>").addClass("fa-regular fa-trash-can");

      // Append newly created elements for this row
      selectAdd.append(workOpt).append(personalOpt).append(otherOpt);
      inputAdd.append(hourAdd, selectAdd, textAreaAdd, buttonAdd, clearAdd);
      buttonAdd.append(buttonIconAdd);
      clearAdd.append(clearIconAdd);

      // Fill the content from localStorage IF the saved date is for today
      let saveDate = plannerObject[i + 8].saved;
      if (moment().isSame(saveDate, "day")) {
        selectAdd.val(plannerObject[i + 8].type);
        textAreaAdd.val(plannerObject[i + 8].text);
      }
    }

    // Text for the first and last hour options to read differently so it can be used for all hours before and after
    $("#8").children().eq(0).text("Morning");
    $("#18").children().eq(0).text("Evening");
  }

  // Get the localStorage from user's browser
  function fromStorage() {
    let plannerObject = JSON.parse(localStorage.getItem("plannerObject"));
    if (plannerObject !== null) {
      plannerStorage = plannerObject;
    }
    // Either return the localStorage version of plannerStorage, or the JS saved version of the same object
    return plannerStorage;
  }

  // Save only the correct row options for the button that was clicked, and update these values into the object in localStorage
  function toStorage(timeKey, textSave, typeSave, savedSave) {
    plannerStorage[timeKey].text = textSave;
    plannerStorage[timeKey].type = typeSave;
    plannerStorage[timeKey].saved = savedSave;
    localStorage.setItem("plannerObject", JSON.stringify(plannerStorage));
  }

  // Add event listener for all saveBtn
  $(document).on("click", ".saveBtn", function () {
    let timeKey = $(this).parent().attr("id");
    let text = $(this).siblings(".task").val();
    let type = $(this).siblings(".type").val();
    let saved = moment();
    toStorage(timeKey, text, type, saved);
  });

  // Add event listener for clearBtn
  $(document).on("click", ".clearBtn", function () {
    let timeKey = $(this).parent().attr("id");
    $(this).siblings(".task").val("");
    $(this).siblings(".type").val("");
    let text = "";
    let type = "";
    let saved = "";
    toStorage(timeKey, text, type, saved);
  });

  // Call function to get localStorage
  let plannerObject = fromStorage();

  // Update the time every second so that row blocks change styling on the hour
  setInterval(updateTime, 1000);

  // This is where the code starts:
  createDiary();
});
