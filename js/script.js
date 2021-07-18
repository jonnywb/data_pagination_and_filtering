/**********************************************
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
***********************************************/


/**
 * addSearch() function adds the HTML for the searchbar.
 */

 function addSearch() {
   const header = document.querySelector('.header');
   const searchBar = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>`;
   header.innerHTML += searchBar;
}

/**
 * The showPage() function creates the HTML elements
 * that are displayed and dynamically inserts
 * the values for the required objects.
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

   if (linkUL.firstElementChild) {
      const firstButton = linkUL.firstElementChild.querySelector('button');
      firstButton.className = 'active';
   }
   linkUL.addEventListener('click', (event) => {
      const pageButtons = linkUL.querySelectorAll('button');
      
      if (event.target.tagName === 'BUTTON') {
         for ( let i = 0; i < pageButtons.length; i++ ) {
            pageButtons[i].className = '';
         }
   
         event.target.className = 'active';
         const pageNum = event.target.textContent;
         showPage(list, pageNum);
      } 
   });
}


/**
 * Search function searches for names that contain string, 
 * and calls showPage/addPag' functions with those results.
 */

function search(input, list) {
   let newList = [];

   for ( let i = 0; i < list.length ; i++) {
      const name = `${list[i].name.first} ${list[i].name.last}`;
      if (input.value.length !== 0 &&
          name.toLowerCase().includes(input.value.toLowerCase())
          && input.value !== ' ') {
         newList.push(list[i]);
      }
   }

   if (input.value.length === 0) {
      startApp(list, 1);
   } else {
      startApp(newList, 1)
   }
}

/**
 * Event listener function:
 */

function listenForInput() {
   const header = document.querySelector('.header');
   const searchInput = document.querySelector('#search');

   searchInput.addEventListener('input', () => {
      search(searchInput, data);
   });
}

/**
 * startApp() function calls showPage & addPagination,
 * with default arguments of data and page 1:
 */
function startApp(list, pageNum) {
   showPage(list, pageNum);
   addPagination(list);
}

// Call functions:
addSearch();
startApp(data, 1);
listenForInput();