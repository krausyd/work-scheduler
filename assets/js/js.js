let timeTableEl;
function showTodayDate() {
    let todayDateEl = $("#currentDay");
    todayDateEl.text(moment().format("MMM DD, YYYY HH:mm:ss"));
}

function createTimeTable() {
    for(let i=7; i<20; i++) {
        let timeSlotEl = $("<div>", { class: "row time-block "  + getTimeColor(i) });

        let hourEl = $("<div>", { class: "col-md-1 hour" });
        hourEl.append(i + ":00");
        timeSlotEl.append(hourEl);

        let taskEl = $("<div>", {
            class: "col-md-10 description",
            id: "data_" + i
        });
        timeSlotEl.append(taskEl);

        let saveButtonEl = $("<button>", {
            type: "button",
            class: "btn saveBtn col-md-1",
            id: "save_" + i
        });
        let saveButtonTextEl = $("<i>", {
            class: "fas fa-save"
        });
        saveButtonEl.append(saveButtonTextEl);
        timeSlotEl.append(saveButtonEl);

        timeTableEl.append(timeSlotEl);
    }
}

function getTimeColor(hour) {
    const todayHour = moment().hours();
    if (hour < todayHour) {
        return "past"
    } else if (hour == todayHour) {
        return "present"
    } else {
        return "future";
    }
}

$(document).ready(function() {
    timeTableEl = $("#time_table");

    window.setInterval(function() {
        showTodayDate();
    }, 1000);

    createTimeTable()
});