import { format, parseISO } from "date-fns";

// queries for project popup
const showProjectPopup = document.querySelector(".sidebar-plus");
const addProjectPopup = document.querySelector(".add-project-popup");
const closeButtonProjectPopup = document.querySelector(".close-project-popup");
// queries for mainTask popup
const addMainTaskPopup = document.querySelector(".add-task-popup");
const submitMainTask = document.querySelector(".submit-main-task");
const addMainProjectTaskPopup = document.querySelector(
  ".add-project-task-popup"
);
const submitMainProjectTask = document.querySelector(
  ".submit-main-project-task"
);

const addProject = document.querySelector(".add-project");
const projects = document.querySelector(".projects");
const project = document.querySelector(".project");
const switchToDailyAgenda = document.querySelector(".daily-agenda-sidebar");
const dailyAgenda = document.querySelector(".daily-agenda");
const addMainTask = document.querySelector(".daily-agenda-plus");

const switchToProjectsLink = document.querySelector(".projects-link");
const closeButton = document.querySelectorAll(".close");
const popups = document.querySelector(".popups");

let taskDiv;

function createProject() {
  const projectNameInput = document.querySelector("#projectName");
  const nameValue = projectNameInput.value;
  const className = nameValue.replace(/ /g, "-");

  const plusClasses = "project-plus plus";
  // make project view
  const projectDiv = document.createElement("div");
  projectDiv.classList.add(className);
  projectDiv.classList.add("project");
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title");
  const tasksDiv = document.createElement("div");
  tasksDiv.classList.add("tasks");

  const title = document.createElement("h1");
  const divForPlusAndDelete = document.createElement("div");
  const titlePlus = document.createElement("span");
  const deleteProject = document.createElement("button");
  divForPlusAndDelete.classList.add("div-for-plus");
  title.innerText = nameValue;
  titlePlus.innerText = "+";
  titlePlus.className = plusClasses;
  deleteProject.innerText = "Delete";
  deleteProject.classList.add("delete-project");
  divForPlusAndDelete.appendChild(deleteProject);
  divForPlusAndDelete.appendChild(titlePlus);

  // append to projectDiv
  titleDiv.appendChild(title);
  titleDiv.appendChild(divForPlusAndDelete);
  projectDiv.appendChild(titleDiv);
  projectDiv.appendChild(tasksDiv);

  // append to parents
  projects.appendChild(projectDiv);

  addProjectPopup.style.display = "none";
  dailyAgenda.style.display = "none";
  projects.style.display = "flex";

  titlePlus.addEventListener("click", function () {
    addMainProjectTaskPopup.style.display = "flex";
    submitMainProjectTask.addEventListener(
      "click",
      function () {
        const name = className;
        makeTaskProject(name);
        addMainProjectTaskPopup.style.display = "none";
      },
      { once: true }
    );
  });

  let remove = document.getElementsByClassName("delete-project");
  let i;
  for (i = 0; i < remove.length; i++) {
    remove[i].onclick = function () {
      const div = this.parentElement;
      const div2 = div.parentElement;
      const div3 = div2.parentElement;
      div3.style.display = "none";
    };
  }
}

function makeTaskProject(name) {
  const dateInput = document.querySelector("#date");
  const taskTitleInput = document.querySelector("#project-task-title");
  const descriptionInput = document.querySelector(".description-project");
  const priorityInput = document.querySelector("#project-priority");
  const taskDiv = document.createElement("div");
  const tasks = document.querySelector("." + name);
  const taskContentDiv = document.createElement("div");
  const taskContainerDiv = document.createElement("div");
  const taskEndTaskDiv = document.createElement("div");

  taskDiv.classList.add("project-task");
  taskContentDiv.classList.add("project-task-content");
  taskContainerDiv.classList.add("project-task-container");
  taskEndTaskDiv.classList.add("end-task");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "status");
  checkbox.setAttribute("id", "status");

  const taskTextDiv = document.createElement("div");
  taskTextDiv.classList.add("project-task-text");
  taskTextDiv.innerText = taskTitleInput.value;

  const endTaskDiv = document.createElement("div");
  endTaskDiv.classList.add("end-task");
  const priorityDiv = document.createElement("div");
  priorityDiv.classList.add("priority");
  priorityDiv.classList.add(priorityInput.value);
  priorityDiv.innerText = priorityInput.value;

  taskContainerDiv.appendChild(checkbox);
  taskContainerDiv.appendChild(taskTextDiv);
  endTaskDiv.appendChild(priorityDiv);
  taskContentDiv.appendChild(taskContainerDiv);
  taskContentDiv.appendChild(endTaskDiv);

  taskDiv.appendChild(taskContentDiv);
  tasks.appendChild(taskDiv);

  let dateInfo;

  if (dateInput.value === "") {
    dateInfo = "None";
  } else {
    const parseDate = parseISO(dateInput.value);
    const formattedDate = format(parseDate, "iiii," + " MMMM" + " do" + " y");
    dateInfo = formattedDate;
  }

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("main-task-info");

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("task-details");
  const taskTitleDiv = document.createElement("div");
  const taskDescriptionDiv = document.createElement("div");
  const taskPriorityDiv = document.createElement("div");
  const taskDateDiv = document.createElement("div");
  const CloseInfoButtonDiv = document.createElement("div");
  const infoPriorityDiv = document.createElement("div");

  const titleLabelSpan = document.createElement("span");
  const titleSpan = document.createElement("span");
  const descriptionLabelSpan = document.createElement("span");
  const descriptionSpan = document.createElement("span");
  const priorityLabelSpan = document.createElement("span");
  const dateLabelSpan = document.createElement("span");
  const dateSpan = document.createElement("span");

  const closeButtonInfo = document.createElement("button");

  taskTitleDiv.classList.add("task-title");
  taskDescriptionDiv.classList.add("task-description");
  taskPriorityDiv.classList.add("task-priority");
  taskDateDiv.classList.add("task-date");
  CloseInfoButtonDiv.classList.add("close-info-button");
  infoPriorityDiv.classList.add("priority");
  infoPriorityDiv.classList.add(priorityInput.value);
  closeButtonInfo.classList.add("close-info");
  closeButtonInfo.classList.add("close");

  titleLabelSpan.innerText = "Title:";
  descriptionLabelSpan.innerText = "Description:";
  priorityLabelSpan.innerText = "Priority:";
  dateLabelSpan.innerText = "Due date:";

  titleSpan.classList.add("task-title-show");
  descriptionSpan.classList.add("task-description-show");
  dateSpan.classList.add("task-date-show");

  titleSpan.innerText = taskTitleInput.value;

  let desc;
  if (descriptionInput.value === "") {
    desc = "None";
  } else {
    desc = descriptionInput.value;
  }

  descriptionSpan.innerText = desc;
  dateSpan.innerText = dateInfo;
  infoPriorityDiv.innerText = priorityInput.value;
  closeButtonInfo.innerText = "Close";

  taskTitleDiv.appendChild(titleLabelSpan);
  taskTitleDiv.appendChild(titleSpan);
  taskDescriptionDiv.appendChild(descriptionLabelSpan);
  taskDescriptionDiv.appendChild(descriptionSpan);
  taskPriorityDiv.appendChild(priorityLabelSpan);
  taskPriorityDiv.appendChild(infoPriorityDiv);
  taskDateDiv.appendChild(dateLabelSpan);
  taskDateDiv.appendChild(dateSpan);

  CloseInfoButtonDiv.appendChild(closeButtonInfo);

  detailsDiv.appendChild(taskTitleDiv);

  detailsDiv.appendChild(taskDescriptionDiv);
  detailsDiv.appendChild(taskPriorityDiv);
  detailsDiv.appendChild(taskDateDiv);

  infoDiv.appendChild(detailsDiv);
  infoDiv.appendChild(CloseInfoButtonDiv);

  popups.appendChild(infoDiv);
  infoDiv.style.display = "none";

  taskTextDiv.addEventListener("click", function () {
    infoDiv.style.display = "flex";
  });

  closeButtonInfo.addEventListener("click", function () {
    infoDiv.style.display = "none";
  });

  let remove = document.getElementsByName("status");
  let i;
  for (i = 0; i < remove.length; i++) {
    remove[i].onclick = function () {
      const div = this.parentElement;
      const div2 = div.parentElement;
      const div3 = div2.parentElement;
      infoDiv.style.display = "none";
      div3.style.display = "none";
    };
  }
}

function makeTaskDailyAgenda() {
  const dateInput = document.querySelector("#date");
  const taskTitleInput = document.querySelector("#title");
  const descriptionInput = document.querySelector("#description");
  const priorityInput = document.querySelector("#priority");
  taskDiv = document.createElement("div");
  const tasks = document.querySelector(".daily-tasks");
  const taskContentDiv = document.createElement("div");
  const taskContainerDiv = document.createElement("div");
  const taskEndTaskDiv = document.createElement("div");
  const titleValue = taskTitleInput.value;
  const title = titleValue.replace(/ /g, "-");

  taskDiv.classList.add("task");
  taskDiv.classList.add(title);
  taskContentDiv.classList.add("task-content");
  taskContainerDiv.classList.add("task-container");
  taskEndTaskDiv.classList.add("end-task");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "status");
  checkbox.setAttribute("id", "status");

  const taskTextDiv = document.createElement("div");
  taskTextDiv.classList.add("task-text");
  taskTextDiv.innerText = taskTitleInput.value;

  const endTaskDiv = document.createElement("div");
  endTaskDiv.classList.add("end-task");
  const priorityDiv = document.createElement("div");
  priorityDiv.classList.add("priority");
  priorityDiv.classList.add(priorityInput.value);
  priorityDiv.innerText = priorityInput.value;

  taskContainerDiv.appendChild(checkbox);
  taskContainerDiv.appendChild(taskTextDiv);
  endTaskDiv.appendChild(priorityDiv);
  taskContentDiv.appendChild(taskContainerDiv);
  taskContentDiv.appendChild(endTaskDiv);

  taskDiv.appendChild(taskContentDiv);
  tasks.appendChild(taskDiv);

  let dateInfo;

  if (dateInput.value === "") {
    dateInfo = "None";
  } else {
    const parseDate = parseISO(dateInput.value);
    const formattedDate = format(parseDate, "iiii," + " MMMM" + " do" + " y");
    dateInfo = formattedDate;
  }

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("main-task-info");

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("task-details");
  const taskTitleDiv = document.createElement("div");
  const taskDescriptionDiv = document.createElement("div");
  const taskPriorityDiv = document.createElement("div");
  const taskDateDiv = document.createElement("div");
  const CloseInfoButtonDiv = document.createElement("div");
  const infoPriorityDiv = document.createElement("div");

  const titleLabelSpan = document.createElement("span");
  const titleSpan = document.createElement("span");
  const descriptionLabelSpan = document.createElement("span");
  const descriptionSpan = document.createElement("span");
  const priorityLabelSpan = document.createElement("span");
  const dateLabelSpan = document.createElement("span");
  const dateSpan = document.createElement("span");

  const closeButtonInfo = document.createElement("button");

  taskTitleDiv.classList.add("task-title");
  taskDescriptionDiv.classList.add("task-description");
  taskPriorityDiv.classList.add("task-priority");
  taskDateDiv.classList.add("task-date");
  CloseInfoButtonDiv.classList.add("close-info-button");
  infoPriorityDiv.classList.add("priority");
  infoPriorityDiv.classList.add(priorityInput.value);
  closeButtonInfo.classList.add("close-info");
  closeButtonInfo.classList.add("close");

  titleLabelSpan.innerText = "Title:";
  descriptionLabelSpan.innerText = "Description:";
  priorityLabelSpan.innerText = "Priority:";
  dateLabelSpan.innerText = "Due date:";

  titleSpan.classList.add("task-title-show");
  descriptionSpan.classList.add("task-description-show");
  dateSpan.classList.add("task-date-show");

  titleSpan.innerText = taskTitleInput.value;

  let desc;
  if (descriptionInput.value === "") {
    desc = "None";
  } else {
    desc = descriptionInput.value;
  }

  descriptionSpan.innerText = desc;
  dateSpan.innerText = dateInfo;
  infoPriorityDiv.innerText = priorityInput.value;
  closeButtonInfo.innerText = "Close";

  taskTitleDiv.appendChild(titleLabelSpan);
  taskTitleDiv.appendChild(titleSpan);
  taskDescriptionDiv.appendChild(descriptionLabelSpan);
  taskDescriptionDiv.appendChild(descriptionSpan);
  taskPriorityDiv.appendChild(priorityLabelSpan);
  taskPriorityDiv.appendChild(infoPriorityDiv);
  taskDateDiv.appendChild(dateLabelSpan);
  taskDateDiv.appendChild(dateSpan);

  CloseInfoButtonDiv.appendChild(closeButtonInfo);

  detailsDiv.appendChild(taskTitleDiv);

  detailsDiv.appendChild(taskDescriptionDiv);
  detailsDiv.appendChild(taskPriorityDiv);
  detailsDiv.appendChild(taskDateDiv);

  infoDiv.appendChild(detailsDiv);
  infoDiv.appendChild(CloseInfoButtonDiv);

  popups.appendChild(infoDiv);
  infoDiv.style.display = "none";

  taskTextDiv.addEventListener("click", function () {
    infoDiv.style.display = "flex";
  });

  closeButtonInfo.addEventListener("click", function () {
    infoDiv.style.display = "none";
  });

  let remove = document.getElementsByName("status");
  let i;
  for (i = 0; i < remove.length; i++) {
    remove[i].onclick = function () {
      const div = this.parentElement;
      const div2 = div.parentElement;
      const div3 = div2.parentElement;
      infoDiv.style.display = "none";
      div3.style.display = "none";
    };
  }
}

showProjectPopup.addEventListener("click", function () {
  addProjectPopup.style.display = "flex";
});

addProject.addEventListener("click", createProject);

switchToDailyAgenda.addEventListener("click", function () {
  dailyAgenda.style.display = "flex";
  projects.style.display = "none";
});

switchToProjectsLink.addEventListener("click", function () {
  dailyAgenda.style.display = "none";
  projects.style.display = "flex";
});

addMainTask.addEventListener("click", function () {
  addMainTaskPopup.style.display = "flex";
});

submitMainTask.addEventListener("click", function () {
  makeTaskDailyAgenda();
  addMainTaskPopup.style.display = "none";
});

closeButton.forEach((button) =>
  button.addEventListener("click", function () {
    addProjectPopup.style.display = "none";
    addMainTaskPopup.style.display = "none";
    addMainProjectTaskPopup.style.display = "none";
  })
);
