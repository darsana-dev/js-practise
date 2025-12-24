const myLibrary = [ ];

function Book(title, author, pages,url, isRead) 
{
    this.id=crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.url = url;
    this.isRead = isRead;
 
}

function addBookToLibrary(title, author, pages,url, isRead) {
    const newBook = new Book(title, author, pages,url, isRead);
    myLibrary.push(newBook);
  
}
function displayBooks() {
    const librarydiv=document.getElementById('library');
    librarydiv.innerHTML="";
    for (const book of myLibrary) {
        const bookDiv=document.createElement('div');
        bookDiv.classList.add('book_card');

        const title=document.createElement('p');
        title.textContent=`Title: ${book.title}`;
        
        const author=document.createElement('p');
        author.textContent=`Author: ${book.author}`;

        const pages=document.createElement('p');
        pages.textContent=`Pages: ${book.pages}`;

        const url=document.createElement('a');
        url.textContent=`More Info`;
        url.href=book.url;
        url.target="_blank";
        
        const isRead=document.createElement('p');
        isRead.textContent=`Read: ${book.isRead ? "Yes" : "No"}`;

         const rmbtn=document.createElement('button');
        rmbtn.textContent="Remove Book";
        rmbtn.dataset.id=book.id;
        rmbtn.addEventListener('click',()=>{
            removebook(book.id);
        });
        
          const toggleReadBtn=document.createElement('button');
          toggleReadBtn.textContent= book.isRead ? "Mark as Unread" : "Mark as Read";
          toggleReadBtn.addEventListener('click',()=>{
              book.toggleRead();
              displayBooks();
          });


        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(url);
        bookDiv.appendChild(isRead);
        bookDiv.appendChild(rmbtn);
          bookDiv.appendChild(toggleReadBtn);
        
        librarydiv.appendChild(bookDiv);
      
    }

      
}
    function removebook(id){
            const index=myLibrary.findIndex(book=>book.id===id);
            if(index!==-1){
                myLibrary.splice(index,1);
                displayBooks();
            }
        }

        Book.prototype.toggleRead = function() {
  this.isRead = !this.isRead;
}
const form = document.querySelector("form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const urlInput = document.getElementById("url");
const isReadInput = document.getElementById("readstatus");

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180,"https://en.wikipedia.org/wiki/The_Great_Gatsby", true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281,"https://en.wikipedia.org/wiki/To_Kill_a_Mockingbird", false);
addBookToLibrary("1984", "George Orwell", 328,"https://en.wikipedia.org/wiki/Nineteen_Eighty-Four", true);

displayBooks();  

titleInput.addEventListener('input', () => {
    titleInput.setCustomValidity("");
});

authorInput.addEventListener('input', () => {
    authorInput.setCustomValidity("");
});
pagesInput.addEventListener('input', () => {
    pagesInput.setCustomValidity("");
});

function validFn(event){
    event.preventDefault();
    titleInput.setCustomValidity("");
     authorInput.setCustomValidity("");
     pagesInput.setCustomValidity("");
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = parseInt(pagesInput.value);
    const url = urlInput? urlInput.value.trim() : "";
    if(!title){
        titleInput.setCustomValidity("Title cannot be empty.");
        titleInput.reportValidity();
        return;

    }
    else if(!author){
        authorInput.setCustomValidity("Author cannot be empty.");
        authorInput.reportValidity();
        return;

    }
    else if(isNaN(pages) || pages <= 0){
        pagesInput.setCustomValidity("Pages must be a positive number.");
        pagesInput.reportValidity();
        return;
    }

    else{
        addBookToLibrary(titleInput.value, authorInput.value, parseInt(pagesInput.value), urlInput.value, isReadInput.checked);
form.reset();
displayBooks();
    
    }
}
      
form.addEventListener('submit', validFn);
