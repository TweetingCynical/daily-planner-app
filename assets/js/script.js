// Wrap all code in document ready function so that the JS doesn't run until all elements on the page have loaded
$(document).ready(function () {
  const workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const container = $(".container");
  const currentDay = $("#currentDay");
  let displayDate = new Date();
  currentDay.text(displayDate);

  // Create the diary structure on the html page
  function createDiary() {
    for (let i = 0; i < workingHours.length; i++) {
      let inputAdd = $("<section>").addClass("row time-block");
      inputAdd.attr("id", `hour-${workingHours[i]}`);
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
      inputAdd
        .append(hourAdd)
        .append(textAreaAdd)
        .append(selectAdd)
        .append(buttonAdd);
      buttonAdd.append(buttonIconAdd);
    }
  }
  createDiary();
});
