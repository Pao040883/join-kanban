const BASE_URL =
  "https://join-249-default-rtdb.europe-west1.firebasedatabase.app";

let contacts = [];
let tasks = [];
let puffer;
let newChar;
let letterBlock = ``;
let contactsString = "";
let contactList = document.querySelector(".contactList");
let contactsIndex = 0;
let showContacts = document.querySelector("#showContact");
let toggleEditContact = true;
let toggleAddContact = true;
let toggleInfoContact = false;
let contactKeys = [];
let sureLastName;
let nameSuffix = false;
let newContact;
let q = 0;
let presentlyIndexContacts;
let information = document.querySelector(".informationPopUp");
let color;

/**
 * 
 * @function init calls the three functions @function includeHTML and @function getContacts and the @function checkForEmptyLetterBoxes
 * as soon as the page is loaded.
 */
function init() {
  includeHTML();
  getContacts();
  checkForEmptyLetterBoxes();
}

/**
<<<<<<< HEAD
 * 
 * @function getContacts for getting the list of already existing contacts
 */
async function getContacts() {
  contacts = await fetch(BASE_URL + "/contacts.json");
  contacts = await contacts.json();
  getTasks();
  setContactsAsArray();
  sorter();
}

/**
 * 
 * @param {event} event is keypress event.
 * When the key is "Escape", all overlays are being closed.
 */
function closeOverlaysWithEscape(event) {
  if(event.key === "Escape") {
    toggleAddContact = false;
    toggleEditContact = false;
    addContactToggle();
    editContactToggle();
  }
}

/**
 * 
 * @function getTasks loads all the existings tasks from the FTP-Client.
 * The tasks are needed, because when a contact is deleted, it also must
 * be removed from all the tasks which it participates.
 */
async function getTasks() {
  let response = await fetch(BASE_URL + "/tasks.json");
  response = await response.json();
  if(response) {
    for (let [key, value] of Object.entries(response)) {
      tasks.push(value);
    }
  }
}

/**
 * 
 * @function setContactsAsArray loads all the contacts into an array.
 */
function setContactsAsArray() {
  let contacsKeysArray = [];
  for (let [key, value] of Object.entries(contacts)) {
    contacsKeysArray.push([key, value]);
  }
  contacts = contacsKeysArray;
}

/**
 * 
 * @function sorter sorts the contacts alphabetically.
 */
function sorter() {
  contacts.sort((a, b) => {
    if (a[1].lastName > b[1].lastName) {
      return 1;
    } else if (a[1].lastName < b[1].lastName) {
      return -1;
    } else {
      return a[1].sureName > b[1].sureName
        ? 1
        : a[1].sureName < b[1].sureName
        ? -1
        : 0;
    }
  });
  renderIntoLetterBox();
}

/**
 * 
 * @returns an HTML string with with the letterbox for all the contacts whos lastnames
 * begin with the letter in the Headline of that box.
 */
function renderIntoLetterBox() {
  if (contacts.length === 0) {
    showContacts.innerHTML = "";
  }
  newChar = contacts[contactsIndex][1]["lastName"][0];
  getContactsHtml();
  if (contactsIndex < contacts.length) {
    letterBlock += `<h3 class="sort">${newChar}</h3>${contactsString}`;
    contactsString = "";
  }
  if (contactsIndex === contacts.length) {
    showContacts.innerHTML = structuredClone(letterBlock);
    checkForEmptyLetterBoxes();
    return;
  }
  renderIntoLetterBox();
}

/**
 * This function iterates through the list of contacts and adds the HTML of the contacts 
 * that have the same starting letter in their last name to the contactsString variable.
 */
function getContactsHtml() {
  for (contactsIndex = q; q < contacts.length; q++) {
    if (contactsIndex == contacts.length) {
      return;
    }
    contactsIndex = q;
    if (newChar != contacts[q][1].lastName[0]) {
      return;
    }

    contactsString += contactHTML(contactsIndex, q);
  }
}

/**
 * 
 * @function checkForEmptyColumns checks whether a contact is the user and if it is the only contact with a last name that begins with its last name.
 * If so, the contact and the headline of the letterblock the contact is in, are hidden.
 */
function checkForEmptyLetterBoxes() {
  document.querySelectorAll('h3.sort').forEach((elem)=>{
    if(document.querySelectorAll(`#showContact .contact[contact-firstletter="${elem.innerHTML}"].d-none`).length === document.querySelectorAll(`#showContact .contact[contact-firstletter="${elem.innerHTML}"]`).length) {
      elem.classList.add('d-none');
    }
  })
}

/**
<<<<<<< HEAD
 * 
 * @function checkForEmptyColumns checks whether a contact is the user and if it is the only contact with a last name that begins with its last name.
 * If so, the contact and the headline of the letterbox the contact is in, are hidden.
 */
function checkForEmptyLetterBoxes() {
  document.querySelectorAll('h3.sort').forEach((elem)=>{
    if(document.querySelectorAll(`#showContact .contact[contact-firstletter="${elem.innerHTML}"].d-none`).length === document.querySelectorAll(`#showContact .contact[contact-firstletter="${elem.innerHTML}"]`).length) {
      elem.classList.add('d-none');
    }
  })
}

/**
 * This funktion just contains the contactHtml template
 * @param {int} contactsIndex 
 * @param {int} q 
 * @returns 
 */
function contactHTML(contactsIndex, q) {
  getRandomColor();
  return `<div class="flex contact c-${contactsIndex} ${contacts[contactsIndex][1].contactId == localStorage.UserId ? 'd-none' : ''}" onclick="clickContact(event)" data-contactIndex="${contactsIndex}" contact-firstletter="${newChar}">
      <div class="flex-center profileImage" style="background-color: ${
        contacts[contactsIndex][1].color
      };" >
       ${profileName(q)}
      </div>
      <div class="gap"> 
        <li>${contacts[q][1].sureName} ${contacts[q][1].lastName}</li>
        <span>${contacts[q][1].email}</span>
      </div>
    </div>`;
}

/**
 * This funktion create the profileimage with the fist letter of the first- and lastname 
 * @param {int} q 
 * @returns 
 */
function profileName(q) {
  if (contacts[q][1].sureName == "") {
    return `${contacts[q][1].lastName[0]}`;
  } else {
    return `${contacts[q][1].sureName[0]}${contacts[q][1].lastName[0]}`;
  }
}

/**
 * 
 * @returns This function creates the colour of the profileimage
 */
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  color = "#0";
  for (let i = 0; i < 5; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * This function shows the contactnformations
 * @param {String} event 
 */
function clickContact(event) {
  toggleInfoContact = true;
  if (window.innerWidth < 1100) {
    showHideContactNames();
  }
  event.stopPropagation();
  presentlyIndexContacts = +event.target
    .closest(".contact")
    .getAttribute("data-contactIndex");

  focusContact();
  information.innerHTML = clickContactHTML(presentlyIndexContacts);
}

/**
 * This function coloured the background of the clicked contact
 */
function focusContact() {
  let contact = document.querySelector(`.c-${presentlyIndexContacts}`);

  for (let i = 0; contacts.length > i; i++) {
    let contact = document.querySelector(`.c-${i}`);
    contact.classList.remove("contactFocus");
  }
  contact.classList.add("contactFocus");
}

 /**
  * This function makes the side responsive
  */
function showHideContactNames() {
  if (window.innerWidth <= 950 && toggleInfoContact) {
    contactList.classList.add("d-none");
    information.classList.remove("d-none");
  } else if (window.innerWidth > 950 && toggleInfoContact) {
    contactList.classList.remove("d-none");
  }else{
    contactList.classList.remove("d-none");
  }
}

/**
 * 
 * window.onresize calles the @function showHideContactNames when
 * the window is being resized.
 */
window.onresize = function () {
  showHideContactNames();
};

 /**
  * This function makes the side responsive
  */
function hideContact() {
  if (window.innerWidth < 950) {
    contactList.classList.remove("d-none");
    information.classList.add("d-none");
  }
}

/**
 * This function contains the HTML template of contactinformation
 * @param {int} index 
 * @returns 
 */
function clickContactHTML(index) {
  return ` 
  <div class="flex showContactName">
    
      <div class="flex-center bigSize profileImage"  style="background-color: ${contacts[index][1]["color"]};">
        ${profileName(index)}
      </div>
      <div>
        <span>
          ${contacts[index][1]["sureName"]}
          ${contacts[index][1]["lastName"]}
        </span>
        <div>
          <img src="./assets/img/editContacts.png" alt="" onclick="startingValueEditContact(${index})"/>
          <img src="./assets/img/DeleteContact.png" alt="" onclick="deleteContact(${presentlyIndexContacts})"
          />
        </div>
      </div>
      <img class="backArrow" onclick="hideContact()" src="./assets/img/backArrow.png" alt="">
    </div>
     
    <div class="contactInformations">
      <p>Contact Information</p>
      <div>
        <h5>Email</h5>
        <span> ${contacts[index][1]["email"]}</span>
        <h5>Phone</h5>
        <a  href="tel:${contacts[index][1]["number"]}"> ${
    contacts[index][1]["number"]
  }</a>
      </div>
      </div>
       <img class="meunContactOptions" src="./assets/img/menuContactOptions.png" alt="">
      `;
}

/**
 * 
 * @param {number} index is the index of the contact.
 * @function startingValueEditContact collects the data of the contact with
 * the index @var index and writes them into the input-fields of the
 * editing-overlay.
 */
function startingValueEditContact(index) {
  let name = document.querySelector(".inputEditName");
  let email = document.querySelector(".inputEditEmail");
  let number = document.querySelector(".inputEditNumber");
  let letters = document.querySelector(".editContactImg");
  if(document.querySelector('.flex-center.bigSize.editContactImg.profileImage.merge')) {
    document.querySelector('.flex-center.bigSize.editContactImg.profileImage.merge').style.background = `${contacts[presentlyIndexContacts][1].color}`;
  }
  name.value = contacts[index][1]["sureName"] + " " + contacts[index][1]["lastName"];
  email.value = contacts[index][1]["email"];
  number.value = contacts[index][1]["number"];
  letters.innerHTML = profileName(index);
  editContactToggle();
}

/**
 * 
 * @function editContact sets the input-fields of the editing-overlay into variables
 * and sets also the splitted contact name into @var sureLastName
 */
function editContact() {
  let name = document.querySelector(".inputEditName");
  let email = document.querySelector(".inputEditEmail");
  let number = document.querySelector(".inputEditNumber");
  sureLastName = document.querySelector(".inputEditName").value.trimStart().split(" ");
  editContactToggle();
  deleteContact(presentlyIndexContacts);
  createContact(email, number, name, sureLastName);
}

/**
 * 
 * @param {number} index is the index of the contact.
 * @function deleteContact deletes the contact at index @param index
 */
function deleteContact(index) {
  deleteContactFromAllTasks(contacts[index][1].contactId);
  deleteData("/contacts/" + `${contacts[index][0]}`);
  contacts.splice(index, 1);
  letterBlock = "";
  contactsIndex = 0;
  q = 0;
  // if()
  information.innerHTML = "";
  // showContacts.innerHTML = "";
  toggleInfoContact = false;
  // getContacts()
  repostTasks();
  renderIntoLetterBox();
  showHideContactNames()
}

/**
 * 
 * @param {number} id is the id of the contact that is deleted.
 * The function iterates through all tasks and checks if the contact
 * with the @param id is in the tasks to get removed from it.
 */
function deleteContactFromAllTasks(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].participants) {
      for (let j = 0; j < tasks[i].participants.length; j++) {
        if (tasks[i].participants[j].contactId === id) {
          tasks[i].participants.splice(j, 1);
        }
      }
    }
  }
}