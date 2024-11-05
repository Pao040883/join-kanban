/**
 * 
 * searchTasks takes the value of the search-input-field and goes threw every task
 *      checking if the value in the
 *          task title
 *          task description
 *          name or surename of the participant
 * It first checks for the value being in the task title - if not it checks the value
 *      being in the task descrption.
 *      If that is also not the case it checks weather the names/surenames of the participants
 *      contain the input value.
 *      And if none of the names containing the value, the card gets blanked out
 * The function actually checks the objects containing the task infos and then, when nothing is found,
 *      blanks out the task-card with the data-taskIndex of the index @param i
 */
/* function searchTasks() {
    for(let i=0; i<allTaskObjects.length; i++) {
        if(allTaskObjects[i].taskTitle.toUpperCase().indexOf(searchBar.value.toUpperCase()) === -1) { //check if task title includes input value
            if(allTaskObjects[i].taskDescrip.toUpperCase().indexOf(searchBar.value.toUpperCase()) === -1) { //check if task description includes input value
                document.querySelector(`.board .task[data-taskindex="${i}"]`).classList.add('disNone');
            }else {document.querySelector(`.board .task[data-taskindex="${i}"]`).classList.remove('disNone');}
        }else {document.querySelector(`.board .task[data-taskindex="${i}"]`).classList.remove('disNone');}
    }
} */

/**
 * 
 * @param {event} event is the event fired to the add-new-task-button
 * @function addNewTask takes all the values set by the add-task-overlay and puts them into
 * the @var newTask which is then pushed to @var allTaskObjects
 */
/* function addNewTask(event) {
    event.preventDefault();
    let newTask = {
        taskId: Math.random(),
        category: document.querySelector('.add-task-overlay-box input.category-name').value,
        date: document.querySelector('#date-input-add').value,
        deleted: 0,
        subTasks: newSubtasksArrayAdd,
        participants: participantsArrayAdd,
        taskDescrip: document.querySelector('#task-descrip-add').value,
        taskTitle: document.querySelector('#title-input-add').value,
        taskType: 'toDo',
        urgency: selectedPrio,
        amountOfEditing: 0
    };
    allTaskObjects.push(newTask);
    renderNewTask(allTaskObjects.length-1);
    closeOverlayAdd();
    fadeInTaskAdded();
} */

/**
 * 
 * @param {number} index is the index of the newly created task.
 * @function renderNewTask renderes the new task into the board.
 */
/* function renderNewTask(index) {
    let elem = allTaskObjects[index];
    let card = `<div class="task flex-column" draggable="true" data-taskType="${elem.taskType}" data-taskIndex="${index}" onclick="renderTaskIntoOverlay(${index})">
        <div class="task-category flex-center" style="background-color: ${allTaskObjects[index].category === 'User Story' ? '#00338f' : '#1fd7c1'};"><p>${elem.category}</p></div>
        <div class="headlineDescription flex-column">
            <h2>${elem.taskTitle}</h2>
            <div class="task-description"><p>${elem.taskDescrip}</p></div>
        </div>
        <div class="subtasks flex-center ${elem.subTasks.length === 0 ? 'disNone' : ''}" style="flex-direction: row-reverse;">
            <p class="subtasks-count ${elem.subTasks ? "" : "disNone"}"><span class="count">${elem.subTasks ? countDoneSubtasks(index) : 0}</span>/<span class="total">${elem.subTasks.length}</span> Subtasks</p>
            <div class="subtasks-bar"><div class="inner" style="width: ${100*doneCount/elem.subTasks.length}%;"></div></div>
        </div>
        <div class="participants-and-urgency flex">
        <div class="participants flex">${getParticipantsHtml(index)}</div>
            <div class="menu flex">${getUrgencyHtml(elem.urgency)}</div>
        </div>
    </div>`;
    document.querySelector(`#${elem.taskType}`).innerHTML += card;
    showHideGreyTaskCards();
    setDragDrop();
    collectNotDeletedTasks();
} */

/**
 * 
 * @function collectNotDeletedTasks collects all tasks which deleted-state is 0.
 */
/* function collectNotDeletedTasks() {
    notDeletedTasks = [];
    for(let i=0; i<allTaskObjects.length; i++) {
        if(!allTaskObjects[i].deleted) {
            notDeletedTasks.push(allTaskObjects[i]);
        }
    }
    getActualTaskStateOfRemote();
} */

/**
 * 
 * @function getActualTaskStateOfRemote gets the tasks of the FTP for having their actual state.
 * It is necessary for not reuploading a task that has been possibly deleted by another user or to see
 * if a certain task has been edited by someone else.
 */
/* async function getActualTaskStateOfRemote() {
    let response = await fetch(tasksURL+'.json');
    response = await response.json();
    actualTasksOnRemote = [];
    if(allTaskObjects.length > 1) {
        for(let [key, value] of Object.entries(response)) {
            actualTasksOnRemote.push(value);
        }
        actualizeNotDeletedTasks();
    }else {
        notDeletedTasks = allTaskObjects;
        repostTasks();
    }
} */

/**
 * 
 * @function actualizeNotDeletedTasks checks wether a task has been recently removed or edited by another member.
 */
/* function actualizeNotDeletedTasks() {
    for(let i=0; i<actualTasksOnRemote.length; i++) {
        for(let j=0; j<notDeletedTasks.length; j++) {
            if(actualTasksOnRemote[i].taskId === notDeletedTasks[j].taskId) {
                if(actualTasksOnRemote[i].amountOfEditing > notDeletedTasks[j].amountOfEditing) {
                    notDeletedTasks[j] = actualTasksOnRemote[i];
                }
            }
        }
    }
    repostTasks();
} */

/**
 * 
 * @function repostTasks then reposts the not deleted tasks.
 */
/* async function repostTasks() {
    let response = await fetch(tasksURL+'.json', {
        method: 'PUT',
        headers: {
            'Category-Type': 'application/json'
        },
        body: JSON.stringify(notDeletedTasks)
    });
} */

/**
 * 
 *  @function fadeInTaskAdded adds the class 'added' to @var taskAddedElem to fade it in via CSS.
 */
/* function fadeInTaskAdded() {
    taskAddedElem.classList.remove('disNone');
    taskAddedElem.classList.remove('not-added');
    taskAddedElem.classList.add('added');
    setTimeout(fadeOutTaskAdded, 1000);
} */

/**
 * 
 *  @function fadeOutTaskAdded removes the class 'added' and adds the class 'not-added' to @var taskAddedElem to fade it out via CSS.
 */
/* function fadeOutTaskAdded() {
    taskAddedElem.classList.remove('added');
    taskAddedElem.classList.add('not-added');
    setTimeout(()=>{
        taskAddedElem.classList.add('disNone');
    }, 700);
} */

/**
 * 
 * The keyup-event is added to the body of the page so that one can close the ovelays also by pressing the escape-key.
 */
/* document.querySelector('body').addEventListener('keyup', (event)=>{
    if(event.key === "Escape") {
        closeOverlay(+document.querySelector('.overlay-card').getAttribute('data-taskindex'));
        closeOverlayAdd();
    }
}) */

/**
 * 
 * @function setFocusOutFunctionsInputAdd sets the functions for the @event focusout of the input-fields of the add-task-overlay.
 * It is for hiding each box that opens, when an input-field is focused. And it also rotates back their triangles.
 */
/* function setFocusOutFunctionsInputAdd() {
    document.querySelector('.add-task-overlay-box .search-contacts').addEventListener('focusout', ()=>{
        document.querySelector('.add-task-overlay-box .contact-list').classList.add('disNone');
        document.querySelector('.add-task-overlay-box .search-contacts').parentNode.querySelector('.triangle').classList.remove('rotated');
    })
    document.querySelector('#choose-subtasks-add').addEventListener('focusout', ()=>{
        if(document.querySelector('#choose-subtasks-add').value === "") {
            hideCrossTicAdd();
        }
    })
} */

/**
 * 
 * @function setFocusOutFunctionSubtaskInputOverlay sets the functions for the @event focusout of the input-fields of the edit-task-overlay.
 */
/* function setFocusOutFunctionSubtaskInputOverlay() {
    document.querySelector('#choose-subtasks-overlay').addEventListener('focusout', ()=>{
        if(document.querySelector('#choose-subtasks-overlay').value === "") {
            hideCrossTicOverlay();
        }else {
            document.querySelector('.overlay-card .subtask-input').style.border = '1px solid #d1d1d1';
        }
    })
} */

/**
 * 
 * Here the body gets an event handler that starts the function which hides all
 * Lists on the overlay for adding a task.
 */
/* document.querySelector('body').addEventListener('click', (event)=>{
    hideAllListsAdd(event);
}) */

/**
 * 
 * @param {event} event the click-event fired to the body.
 * @returns 
 */
/* function hideAllListsAdd(event) {
    let target = event.target;
    if(target.classList.contains('category') || target.classList.contains('category-name') || target.classList.contains('categories') || target.classList.contains('contacts') || target.classList.contains('contacts-inner') || target.classList.contains('search-contacts')) {
        return;
    }else {
        document.querySelector('.contact-list').classList.add('disNone');
        document.querySelector('.categories-list').classList.add('disNone');
    }
} */