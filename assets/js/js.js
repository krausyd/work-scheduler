let timeTableEl;
let tasks = {};
function showTodayDate() {
    let todayDateEl = $("#currentDay");
    todayDateEl.text(moment().format("MMM DD, YYYY HH:mm:ss"));
}

function editTask() {
    const taskHour = this.id.replace("data_", "");
    let text = $(this).text().trim();
    let textInput = $("<textarea>", {
        class: "col-md-10 description",
        id: "editing_" + taskHour
    }).val(text);
    $(this).replaceWith(textInput);
}

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

function saveTask() {
    const taskHour = this.id.replace("save_", "");
    const textInput = $("#editing_" + taskHour);
    if (textInput.length) {
        tasks[taskHour] = textInput.val().trim();
        // Show notification that item was saved to localStorage by adding class 'show'
        $('.notification').addClass('show');

        // Timeout to remove 'show' class after 5 seconds
        setTimeout(function() {
            $('.notification').removeClass('show');
        }, 5000);

        textInput.replaceWith(createReadOnlyTask(taskHour));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function createReadOnlyTask(index) {
    let taskEl = $("<div>", {
        class: "col-md-10 description",
        id: "data_" + index
    });
    if (tasks[index]) {
        taskEl.append(tasks[index]);
    }
    taskEl.on("click", editTask);

    return taskEl
}

function createTimeTable() {
    loadTasks();
    for(let i=7; i<=20; i++) {
        let timeSlotEl = $("<div>", { class: "row time-block "  + getTimeColor(i) });

        let hourEl = $("<div>", { class: "col-md-1 hour" });
        hourEl.append(i + ":00");
        timeSlotEl.append(hourEl);

        timeSlotEl.append(createReadOnlyTask(i));

        let saveButtonEl = $("<button>", {
            type: "button",
            class: "btn saveBtn col-md-1",
            id: "save_" + i
        });
        let saveButtonTextEl = $("<i>", {
            class: "fas fa-save"
        });
        saveButtonEl.on("click", saveTask);
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