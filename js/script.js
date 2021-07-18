/**********************************************
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
***********************************************/

/**
 * addSearch() function adds the HTML for the searchbar.
 */

 function addSearch() {
   const header = document.querySelector('.header');
   const label = document.createElement('label');
   label.className = 'student-search';
   label.htmlFor = 'search';
   label.innerHTML = `
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" 
         alt="Search icon"></button>`;

   header.insertAdjacentElement('beforeend', label);
}

/**
 * The showPage() function creates the HTML elements
 * that are displayed and dynamically inserts
 * the values for the required objects.
 * @param {array} list - An Array of student objects.
 * @param {number} page - The current page number.
 */

function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentUL = document.querySelector('.student-list');
   studentUL.innerHTML = '';

   if (list.length < 1) {
      const ul = document.querySelector('.student-list');
      ul.innerHTML = `<h1>No results found...</h1>`;
   } else {
      for ( let i = 0; i < list.length; i++ ) {
         if ( i >= startIndex && i < endIndex ) {
            const studentLI = `
               <li class="student-item cf">
                  <div class="student-details">
                     <img class="avatar" src=${list[i].picture.thumbnail}
                        alt="Profile Picture">
                     <h3>${list[i].name.first} ${list[i].name.last}</h3>
                     <span class="email">${list[i].email}</span>
                  </div>
                  <div class="joined-details">
                     <span class="date">Joined 
                        ${list[i].registered.date}</span>
                  </div>
               </li>`;

            studentUL.insertAdjacentHTML('beforeend', studentLI);
         }
      }
   }
}


/**
 * addPaginaation() Decides how many pages will be needed
 * based on the number of objects in the array,
 * and inserts buttons for switching between pages.
 * @param {array} list - An array of Student objects.
 */

function addPagination(list) {
   const listLen = list.length;
   const requiredPages = Math.ceil(listLen / 9);
   const linkUL = document.querySelector('.link-list');
   linkUL.innerHTML = '';

   for ( let i = 1; i < requiredPages + 1; i++ ) {
      const pageLI = `
         <li>
            <button type="button">${i}</button>
         </li>`;
      linkUL.insertAdjacentHTML('beforeend', pageLI);
   }

   page1 = linkUL.firstElementChild.querySelector('button');
   page1.className = 'active';
   linkUL.addEventListener('click', (event) => {
      const pageButtons = linkUL.querySelectorAll('button');
      
      if (event.target.tagName === 'BUTTON') {
         for ( let i = 0; i < pageButtons.length; i++ ) {
            pageButtons[i].className = '';
         }
   
         event.target.className = 'active';
         const pageNum = event.target.textContent;
         showPage(data, pageNum);
      } 
   });
}


/**
 * Search function searches for names that contain string, 
 * and calls showPage/addPag' functions with those results.
 * @param {element} input - HTML element
 * @param {array} list - An array containing student objects.
 */

function search(input, list) {
   let newList = [];

   for ( let i = 0; i < list.length ; i++) {
      const name = list[i].name.first + list[i].name.last;
      if (input.value.length !== 0 &&
          name.toLowerCase().includes(input.value.toLowerCase())) {
         newList.push(list[i]);
      }
   }

   if (input.value.length === 0) {
      startApp();
   } else {
      showPage(newList, 1);
      addPagination(newList);
   }
}

/**
 * startApp() function calls showPage & addPagination,
 * with default arguments of data and page 1:
 */
function startApp() {
   showPage(data, 1);
   addPagination(data);
}

// Call functions:
addSearch();
startApp();

// Consts require addSearch():
const header = document.querySelector('.header');
const searchInput = document.querySelector('#search');
const submit = header.querySelector('button');

/***** Event Listeners for searchbar: ****/  

submit.addEventListener('click', (event) => {
  event.preventDefault();
  search(searchInput, data);
});

searchInput.addEventListener('keyup', () => {
   search(searchInput, data);
 });