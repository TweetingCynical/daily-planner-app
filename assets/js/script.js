// Wrap all code in document ready function so that the JS doesn't run until all elements on the page have loaded
$(document).ready(function () {
  const workingHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const container = $(".container");
  const currentDay = $("#currentDay");
  let displayDate = moment().format("dddd, Do of MMMM YYYY");
  currentDay.text(displayDate);

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

    // For loop to continually check time for restyling rows
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
    for (let i = 0; i < workingHours.length; i++) {
      let inputAdd = $("<section>").addClass("row time-block");
      inputAdd.attr("id", workingHours[i]);
      container.append(inputAdd);
      let hourAdd = $("<section>")
        .addClass("col-md-1 hour")
        .text(`${workingHours[i]}:00`);
      let selectAdd = $("<select>").addClass("category col-md-2");
      let workOpt = $("<option>").attr("name", "work").text("Work");
      let personalOpt = $("<option>").attr("name", "personal").text("Personal");
      let otherOpt = $("<option>").attr("name", "other").text("Other");
      let textAreaAdd = $("<textarea>").addClass("col-md-8 description");
      let buttonAdd = $("<button>").addClass("button saveBtn col-md-1");
      let buttonIconAdd = $("<i>").addClass("fa-regular fa-floppy-disk");
      selectAdd.append(workOpt).append(personalOpt).append(otherOpt);
      inputAdd.append(hourAdd, textAreaAdd, selectAdd, buttonAdd);
      buttonAdd.append(buttonIconAdd);
    }
    $("#8").children().eq(0).text("Morning");
    $("#18").children().eq(0).text("Evening");
  }

  function fromStorage() {
    let plannerObject = JSON.parse(localStorage.getItem("plannerObject"));

    if (plannerObject === null) {
      plannerObject = plannerStorage;
    }
    return plannerObject;
  }

  function toStorage() {
    localStorage.setItem("plannerObject", JSON.stringify(plannerStorage));
  }

  $(document).on("click", ".saveBtn", function (event) {
    let parentID = $(event.target).parent().attr("id");
    toStorage();
  });

  let plannerObject = fromStorage();
  setInterval(updateTime, 1000);
  createDiary();
});
