// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// global variables
const nine = 9;
const twelve = 12;
const eighteen = 18;
const div = "<div>";

$(function () {

  // display current day and time
  $("#currentDay").text(dayjs().format('MMMM D, YYYY h:mm A'));

  // call functions
  renderScheduler();
  checkTime();
  renderStorage();

});

  function renderScheduler() {
    // loop during working hours
    for (hour = nine; hour < eighteen; hour++) {
      var timeBlockContainer = $(div);
      timeBlockContainer.attr('id', 'hour-' + `${hour}`);
      timeBlockContainer.addClass("row");
  
      // child elements of time block container
      var hourContainer = $(div);
      hourContainer.addClass("col-1 hour");
      hourContainer.text(checkAmPm(hour));
  
      var textareaEl = $("<textarea>");
      textareaEl.addClass("col-10 plan");
  
      var buttonEl = $("<button>");
      buttonEl.attr("id", "save");
      buttonEl.addClass("col-1");
      buttonEl.text("Save");
  
      var iconEl = $("<i>");
      iconEl.addClass("fa fa-save");
      buttonEl.prepend(iconEl);
  
      // appends the child elements to time block containers
      timeBlockContainer.append(hourContainer);
      timeBlockContainer.append(textareaEl);
      timeBlockContainer.append(buttonEl);
  
      // append time block container to scheduler container
      $("#scheduler").append(timeBlockContainer);
    }

    $(".row").click(function (event) {
      var target = $(event.target); // locates where user clicks
      if (target.is("button")) {  // only execute if the button is clicked
        var hourId = $(this).attr("id");
        var plan = $(this).find(".plan").val();
        if (plan !== "") { // only be store if there is information in the text field
          // save to local storage using the hour block id so it displays in the right place
          localStorage.setItem(hourId, plan);
        }
      }
    }
    )
  }
  
  // display events in local storage
  function renderStorage() {
    $(".row").each(function () {
      var hourId = $(this).attr("id");
      var plan = localStorage.getItem(hourId);
      if (plan !== null) {
        $(this).children(".plan").val(plan);
      }
    }
    )
  }

    // color-code past, present, or future.
    function checkTime() {
      var currentHour = dayjs().hour();
      $(".row").each(function () {
        var hourId = $(this).attr("id");
        // slice to get the hour block
        var timeBlockHour = parseInt(hourId.slice(5));
        if (currentHour > timeBlockHour) {
          $(this).addClass('past')
        }
        else if (currentHour == timeBlockHour) {
          $(this).addClass('present')
        }
        else if (currentHour < timeBlockHour) {
          $(this).addClass('future')
        }
      });
    }

  // make the time use 12 hr
  function checkAmPm(hour) {
    if (hour > twelve) {
      hour -= twelve;
      hour += " pm"
    }
    else if (hour === twelve) {
      hour += " pm"
    }
    else {
      hour += " am"
    }
    return hour;
  }
