document.addEventListener("DOMContentLoaded", function () {
  
  function updateTimeBlock() {
    var currentTime = dayjs().hour();

    const timeBlocks = document.getElementsByClassName("time-block");
    const displayMessaging = document.getElementById("display-messaging");

    Array.from(timeBlocks).forEach(function (timeBlock) {
      const hour = parseInt(timeBlock.id.split("-")[1]);
      const dataInput = timeBlock.querySelector(".description");

      if (hour < currentTime) {
        timeBlock.classList.add("past");
        timeBlock.classList.remove("present", "future");
      } else if (hour === currentTime) {
        timeBlock.classList.add("present");
        timeBlock.classList.remove("past", "future");
      } else {
        timeBlock.classList.add("future");
        timeBlock.classList.remove("past", "present");
      }

      const savedTask = localStorage.getItem(`${timeBlock.id}-task`);
      if (savedTask) {
        dataInput.value = savedTask;
      }
    });
  }
  const currentDayElement = document.getElementById("currentDay");
  currentDayElement.textContent = dayjs().format("dddd, MMMM D, YYYY");

  updateTimeBlock();

  setInterval(updateTimeBlock, 60000);

  const timeBlocks = document.getElementsByClassName("time-block");

  Array.from(timeBlocks).forEach(function (timeBlock) {
    const dataInput = timeBlock.querySelector(".description");
    const saveBtn = timeBlock.querySelector(".saveBtn");

    saveBtn.addEventListener("click", function () {
      const taskDescription = dataInput.value;

      if (taskDescription.trim() !== "") {
        const key = `${timeBlock.id}-task`;
        localStorage.setItem(key, taskDescription);
        displayMessaging("Appointment added to local storage!", "success");
      } else {
        displayMessaging("Please enter an appointment before saving.", "error");
      }
    });
  });

  function displayMessaging(message, messageType) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.classList.add("message", messageType);

    const displayMessagingContainer = document.getElementById("display-messaging");

    displayMessagingContainer.appendChild(messageElement);

    setTimeout(function () {
      messageElement.style.display = "none";
    }, 3000);
  }
});