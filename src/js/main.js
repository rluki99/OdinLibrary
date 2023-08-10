// BOOKS

const titleInput = document.querySelector('#input-title')
const authorInput = document.querySelector('#input-author')
const pagesInput = document.querySelector('#input-pages')
const readInput = document.querySelector('#input-read')
const submitBookBtn = document.querySelector('.books__modal-form-submit')
const booksCardsDiv = document.querySelector('.books__cards')

let myLibrary = []

function Book(title, author, pages, read) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
}

const addBookToLibrary = () => {
	const title = titleInput.value
	const author = authorInput.value
	const pages = pagesInput.value
	const read = readInput.checked ? 'read' : 'not read'

	const newBook = new Book(title, author, pages, read)
	myLibrary.push(newBook)
	// console.log(myLibrary)

	addBookToDOM(title, author, pages, read)

	clearInputs()
}

const clearInputs = () => {
	titleInput.value = ''
	authorInput.value = ''
	pagesInput.value = ''
	readInput.checked = false
}

const addBookToDOM = (title, author, pages, read) => {
	const newCard = document.createElement('div')
	newCard.classList.add('books__card')
	newCard.innerHTML = `
	<p class="books__card-title">${title}</p>
	<p class="books__card-author">${author}</p>
	<p class="books__card-pages">${pages} pages</p>
	<p class="books__card-read">${read}</p>
	<button class="books__card-delete">DELETE</button>
	`
	booksCardsDiv.appendChild(newCard)
}

submitBookBtn.addEventListener('click', e => {
	e.preventDefault()
	addBookToLibrary()
})

//MODAL DISPLAY

const addBookBtn = document.querySelector('#add-book')
const closeModalBtn = document.querySelector('.books__modal-close')
const modal = document.querySelector('.books__modal')
const modalOverlay = document.querySelector('.books__modal-overlay')

const openModal = () => {
	modal.classList.add('books__modal--active')
	modalOverlay.classList.add('books__modal-overlay--active')
}

const closeModal = () => {
	modal.classList.remove('books__modal--active')
	modalOverlay.classList.remove('books__modal-overlay--active')
}

const clickOutsideModal = e => {
	if (e.target == modal) {
		closeModal()
	}
}

addBookBtn.addEventListener('click', openModal)
closeModalBtn.addEventListener('click', closeModal)
window.addEventListener('click', clickOutsideModal)
