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

      let saveDate = plannerObject[i + 8].saved;

      if (moment().isSame(saveDate, "day")) {
        selectAdd.val(plannerObject[i + 8].type);
        textAreaAdd.val(plannerObject[i + 8].text);
      }
    }
    $("#8").children().eq(0).text("Morning");
    $("#18").children().eq(0).text("Evening");
  }

  function fromStorage() {
    let plannerObject = JSON.parse(localStorage.getItem("plannerObject"));

    if (plannerObject !== null) {
      plannerStorage = plannerObject;
    }
    return plannerStorage;
  }

  function toStorage(timeKey, textSave, typeSave, savedSave) {
    plannerStorage[timeKey].text = textSave;
    plannerStorage[timeKey].type = typeSave;
    plannerStorage[timeKey].saved = savedSave;
    localStorage.setItem("plannerObject", JSON.stringify(plannerStorage));
  }

  $(document).on("click", ".saveBtn", function () {
    let timeKey = $(this).parent().attr("id");
    let text = $(this).siblings(".task").val();
    let type = $(this).siblings(".type").val();
    let saved = moment();
    toStorage(timeKey, text, type, saved);
  });

  let plannerObject = fromStorage();
  setInterval(updateTime, 1000);
  createDiary();
});
