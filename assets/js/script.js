// Wrap all code in document ready function so that the JS doesn't run until all elements on the page have loaded
$(document).ready(function () {
  const workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const container = $(".container");

  function createDiary() {
    for (let i = 0; i < workingHours.length; i++) {
      let inputAdd = $("<section>").addClass("row time-block");
      inputAdd.attr("id", "hour-" + workingHours[i]);
      container.append(inputAdd);
      let hourAdd = $("<section>")
        .addClass("col-md-1 hour")
        .text(workingHours[i] + ":00");
      let textAreaAdd = $("<textarea>").addClass("col-md-10 description");
      let buttonAdd = $("<button>").addClass("button save-button col-md-1");
      let buttonIconAdd = $("<i>").addClass("fa-regular fa-floppy-disk");
      inputAdd.append(hourAdd);
      inputAdd.append(textAreaAdd);
      inputAdd.append(buttonAdd);
      buttonAdd.append(buttonIconAdd);
    }
  }
  createDiary();
});
