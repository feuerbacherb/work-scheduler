var today = document.querySelector("#currentDay");
var momentEl = moment().hours(Number);
var blkTime = $(".container");
var lstTime = [];
var idTime = [];

today.innerHTML = momentEl.format("dddd") + ", " + momentEl.format("MMMM Do YYYY");


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

      blkTime.append(theRow);

      lftDiv.text(lstTime[i]);
      theRow.append(lftDiv);

      midDiv.text();
      theRow.append(midDiv);

      rgtDiv.text();
      theRow.append(rgtDiv);
      
      //console.log(theRow);
   }
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

createTime();
createTimeBlocks();
hrUpdater();


var updTime = setInterval(hrUpdater, 900000);