/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;

   const studentUL = document.querySelector('.student-list');
   studentUL.innerHTML = '';

   for ( let i = 0; i < list.length; i++ ) {
      if ( i >= startIndex && i < endIndex ) {
         const studentLI = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${list[i]['picture']['thumbnail']} alt"Profile Picture">
                  <h3>${list[i]['name']['first']} ${list[i]['name']['last']}</h3>
                  <span class="email">${list[i]['email']}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i]['registered']['date']}</span>
               </div>
            </li>`;

         studentUL.insertAdjacentHTML('beforeend', studentLI);
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const requiredPages = Math.ceil(list.length / 9);
   
   const linkUL = document.querySelector('.link-list');
   linkUL.innerHTML = '';

   for ( let i = 1; i < requiredPages + 1; i++ ) {
      const pageLI = `
         <li>
            <button type="button">${i}</button>
         </li>`;
      
      linkUL.insertAdjacentHTML('beforeend', pageLI);
   };

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

function search(input, list) {
   let newList = [];

   for ( let i = 0; i < list.length ; i++) {
      const name = list[i]['name']['first'] + list[i]['name']['last'];
      if (input.value.length !== 0 && name.toLowerCase().includes(input.value.toLowerCase())) {
         newList.push(list[i]);
      }
   }

   if (newList.length > 0) {
      showPage(newList, Math.ceil(newList.length / 9))
      addPagination(newList);
   } else if (newList.length == 0 && input.value.length !== 0) {
      const ul = document.querySelector('.student-list');
      ul.innerHTML = `<h1>No results found...</h1>`
   } else {
      startApp();
   }
   
}

const header = document.querySelector('.header');
function addSearch() {

   const label = document.createElement('label');
   label.className = 'student-search';
   label.htmlFor = 'search';
   label.innerHTML = `
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>`;

   header.insertAdjacentElement('beforeend', label);
}

function startApp() {
   showPage(data, 1)
   addPagination(data);
}

// Call functions

addSearch();
startApp();

const searchInput = document.querySelector('#search');
const submit = header.querySelector('button')

submit.addEventListener('click', (event) => {
   event.preventDefault();
   search(searchInput, data);
});

searchInput.addEventListener('keyup', () => {
   // Invoke your search function here - Arguments: search, tableCells
   search(searchInput, data);
 });