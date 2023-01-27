// Initialise variables
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
      $("#" + workingHours[i]).addClass("row time-block present");
    } else if (moment().hour() > workingHours[i]) {
      $("#" + workingHours[i]).addClass("row time-block past");
    } else {
      $("#" + workingHours[i]).addClass("row time-block future");
    }
  }
  return displayDate;
}

// Create the diary structure on the html page
function createDiary() {
  // For loop using the workingHours structure
  for (let i = 0; i < workingHours.length; i++) {
    // Create a row
    const inputAdd = $("<section>").addClass("row time-block");
    inputAdd.attr("id", workingHours[i]);
    container.append(inputAdd);

    // Create hour display
    const hourAdd = $("<section>")
      .addClass("col-lg-1 col-md-2 col-sm-6 col-6 hour")
      .text(`${workingHours[i]}:00`);

    // Create option selection
    const selectAdd = $("<select>")
      .addClass("type col-lg-2 col-md-2 col-sm-6 col-6")
      .attr("id", `select-${workingHours[i]}`);
    const workOpt = $("<option>").attr("name", "work").text("Work");
    const personalOpt = $("<option>").attr("name", "personal").text("Personal");
    const otherOpt = $("<option>").attr("name", "other").text("Other");

    // Create textarea
    const textAreaAdd = $("<textarea>")
      .addClass("col-lg-6 col-md-5 col-sm-7 col-12 task")
      .attr("placeholder", "Task details here...");

    //Create save button
    const buttonAdd = $("<button>").addClass(
      "button saveBtn col-lg-1 col-md-1 col-sm-2 col-6"
    );
    const buttonIconAdd = $("<i>").addClass("fa-regular fa-floppy-disk");

    //Create clear button
    const clearAdd = $("<button>").addClass(
      "button clearBtn col-lg-1 col-md-1 col-sm-2 col-6"
    );
    const clearIconAdd = $("<i>").addClass("fa-regular fa-trash-can");

    // Append newly created elements for this row
    selectAdd.append(workOpt).append(personalOpt).append(otherOpt);
    inputAdd.append(hourAdd, selectAdd, textAreaAdd, buttonAdd, clearAdd);
    buttonAdd.append(buttonIconAdd);
    clearAdd.append(clearIconAdd);

    // Fill the content from localStorage IF the saved date is for today
    const saveDate = plannerObject[i + 8].saved;
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
  const plannerObject = JSON.parse(localStorage.getItem("plannerObject"));
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
  const timeKey = $(this).parent().attr("id");
  const text = $(this).siblings(".task").val();
  const type = $(this).siblings(".type").val();
  const saved = moment();
  toStorage(timeKey, text, type, saved);

  // Display message to notify user for 2 seconds that task details were saved
  $("#notify").addClass("show");
  setTimeout(function () {
    $("#notify").removeClass("show");
  }, 2000);
});

// Add event listener for clearBtn
$(document).on("click", ".clearBtn", function () {
  const timeKey = $(this).parent().attr("id");
  $(this).siblings(".task").val("");
  $(this).siblings(".type").val("Work");
  const text = "";
  const type = "";
  const saved = "";
  toStorage(timeKey, text, type, saved);
});

// Call function to get localStorage
const plannerObject = fromStorage();

// Update the time every second so that row blocks change styling on the hour
setInterval(updateTime, 60000);

// This is where the code starts:
createDiary();
updateTime();
