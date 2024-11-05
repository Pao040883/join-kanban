let actualDate;

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        let file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
            loadUserInitials();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    if (typeof callback === 'function') {
        callback();
    }
    getActualDate();
}


/**
 *
 * Toggle Usermenu 
 * 
 */
function showUserMenu (){
    let userMenu = document.getElementById('user-menu');
    userMenu.classList.toggle('d-none');
    if(!userMenu.classList.contains('shift-in')) {
        userMenu.classList.add('shift-in');
    }else {
        userMenu.classList.remove('shift-in');
    }
}

/**
 * 
 * Put the initails into the button
 * 
 */
function loadUserInitials() {
    let user = localStorage.getItem('User');
    let initials = document.getElementById('user-button-initials');
    if(initials) {
        initials.innerHTML = getInitials(user);
    }
}


/**
 * 
 * Get the initails from the current user for header
 * 
 * @param {*} name - User-name
 * @returns - returns the initails from the user
 */
function getInitials(name) {
    let parts = name.split(' ')
    let initials = ''
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
            initials += parts[i][0]
        }
    }
    return initials;
}

/**
 * 
 * Log the user out
 * 
 */
function logout() {
    localStorage.setItem('User', '');
    localStorage.setItem('Email', '');
    localStorage.setItem('Remember', '');
    localStorage.setItem('UserColor', '');
    localStorage.setItem('UserId', '');
}


/**
 * 
 * Check if user is loged in
 * 
 */
function checkLogin(){
    let user = localStorage.getItem('User');
    if(!user){
        window.location.href = 'login.html';
    }
}

function extractFilename(url) {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filenameWithExtension = pathname.substring(pathname.lastIndexOf('/') + 1);
    const filename = filenameWithExtension.split('.').slice(0, -1).join('.');
    return filename;
  }

  /**
   * 
   * Check the active Link to hover it
   * 
   */
  function activeLink() {
      setTimeout(() => {
        const url = window.location.href;
        const filename = extractFilename(url);
        if(document.querySelector(`#${filename}`)) {
            document.querySelector(`#${filename}`).classList.add('active');
        }
    }, 150);
 
}

checkLogin();
activeLink();

/**
 * 
 * @returns a string with the actual date in the form of yyyy-mm-dd
 */
function getActualDate() {
    let date = new Date();
    if((date.getDate()).toString().length === 1) {
        actualDate = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;    
    }else if((date.getMonth()+1).toString().length === 1) {
        actualDate = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
    }else if(date.getDate().toString().length === 1 && (date.getMonth()+1).toString().length === 1) {
        actualDate = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
    }else {
        actualDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }
    if(document.querySelectorAll('#date-input-add[type="date"]')) {setMinToDateInputs();}
}

/**
 * 
 * @function setMinToDateInputs set the attribute min to ach input-field of type "date" when such input exist on the page.
 */
function setMinToDateInputs() {
    document.querySelectorAll('input[type="date"]').forEach((elem)=>{
        elem.setAttribute('min', actualDate);
    })
}