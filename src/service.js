document.addEventListener("DOMContentLoaded", () => {
  // Tu función para mostrar películas:
  printBooks();
});
const URL_API = "http://localhost:3000/books";

// READ MÉTODO GET
async function getAllBooks() {
  const response = await fetch(URL_API);
  const bookData = await response.json();
  console.log(bookData);
  return bookData;
}
getAllBooks();

// PRINT BOOKS
let booksContainer = document.querySelector("section");
async function printBooks(params) {
  let books = await getAllBooks();
  booksContainer.innerHTML = "";
  const bookList = books.map((book) => {
    return (booksContainer.innerHTML += `<h1> ${book.title}</h1>
            <p>${book.writer}</p>
            <p>${book.book_description}</p>
            <button onclick="deleteBook('${book.id}')"> Eliminar </button>`);
  });
  return bookList;
}

// DELETE BOOKS

async function deleteBook(id) {
  const response = await fetch(`${URL_API}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    await printBooks();
  } else {
    console.log(`Error al eliminar el libro`);
  }
}

// POST BOOKS
async function newBook(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const writer = document.getElementById("writer").value;
  const book_description = document.getElementById("book_description").value;

  const newBook = {
    title,
    writer,
    book_description,
  };
  const response = await fetch(URL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  });

  if (response.ok) {
    await printBooks();
  } else {
    console.log(`Error al Cargar el Libro`);
  }
}

// Escuchar el envío del formulario
const form = document.getElementById("bookForm");
form.addEventListener("submit", newBook);

// getBooks()
// // UPDATE MÉTODO PUT
// function updateBook(id, editedBook){

// }
