var today = document.querySelector("#currentDay");
var momentEl = moment().hours(Number);
var blkTime = $(".container");
var lstTime = [];
var idTime = [];
var txtAreas = [];
var schedule = [];


// set the current date at the top of the page
today.innerHTML = momentEl.format("dddd") + ", " + momentEl.format("MMMM Do YYYY");

// check to see if a localStorage of schedule exists and either create new or populate the rows
var loadInfo = function() {
   txtAreas = JSON.parse(localStorage.getItem("schedule"));

   if (!txtAreas) {
      txtAreas = [];
   };

   console.log(txtAreas.length);

   for (var i = 0; i < 10; i++) {
      //console.log(txtAreas[i]);
      $("textarea")[i].value = txtAreas[i];
   }
}

// use a for loop to add text to the hours and get ready to set IDs
var createTime = function() {
   var numCount = 0;
   for (var i = 0; i < 10; i++) {
      numCount = i + 8;
      if (numCount < 12) {
         lstTime[i] = numCount.toString() + " AM";
         idTime[i] = numCount;
      }
      else if (numCount > 12) {
         lstTime[i] = (numCount - 12).toString() + " PM";
         idTime[i] = (numCount);
      } 
      else {
         lstTime[i] = numCount.toString() + " PM";
         idTime[i] = numCount;
      }
   }
   //console.log(lstTime);
   //console.log(idTime);
}

// create rows, textareas, and buttons using for loop
var createTimeBlocks = function() {
   for (var i = 0; i < lstTime.length; i++) {
      var theRow = $("<div>")
         .attr("id", idTime[i])
         .addClass("row")
         .addClass("time-block");
      var lftDiv = $("<div>")
         .addClass("hour")
         .addClass("col-sm-1");
      var midDiv = $("<textarea>")
         .addClass("col-sm-10");
      var rgtDiv = $("<button>")
         .attr("type", "button")
         .addClass("saveBtn")
         .addClass("col-1")
         .addClass("far")
         .addClass("fa-save");

      // add the row to the container
      blkTime.append(theRow);

      // add the hour to the front of the row
      lftDiv.text(lstTime[i]);
      theRow.append(lftDiv);

      // add the textarea
      midDiv.text();
      theRow.append(midDiv);

      // add buttons to the rows
      rgtDiv.text();
      theRow.append(rgtDiv);
      
      //console.log(theRow);
   }
}

// loop through all of the textareas and save the information to an array in localStorage
var saveInfo = function() {
   console.log("saveInfo started");
   console.log($(this));
   var counter = 0;
   for (var i = 0; i < 10; i++) {
      txtAreas[i] = $("textarea")[i].value;
   }
   console.log(txtAreas);
   localStorage.setItem("schedule", JSON.stringify(txtAreas));
}

var hrUpdater = function () {
   var currHour = moment().hours();
   $(".time-block").each(function() {
      var blkHour = parseInt($(this).attr("id").split(" ")[0]);

      if (blkHour < currHour) {
         $(this).addClass("past");
      } else if (blkHour === currHour) {
         $(this).removeClass("past");
         $(this).addClass("present");
      } else {
         $(this).removeClass("past");
         $(this).addClass("present");
         $(this).addClass("future");
      }
   });
}

// these functions need to be in this order or it will break
createTime();
createTimeBlocks();
loadInfo();
hrUpdater();

// button event handler to save the information
$("button").on("click", function(event) {
   //console.log("click event started");
   //console.log(event.target);
   saveInfo();
});

var updTime = setInterval(hrUpdater, 900000);