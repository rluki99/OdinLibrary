let titleInput
let authorInput
let pagesInput
let readInput
let submitBookBtn
let booksCardsDiv
let addBookBtn
let closeModalBtn
let modal
let modalOverlay
let formInfo

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	titleInput = document.querySelector('#input-title')
	authorInput = document.querySelector('#input-author')
	pagesInput = document.querySelector('#input-pages')
	readInput = document.querySelector('#input-read')
	submitBookBtn = document.querySelector('.books__modal-form-submit')
	booksCardsDiv = document.querySelector('.books__cards')
	addBookBtn = document.querySelector('#add-book')
	closeModalBtn = document.querySelector('.books__modal-close')
	modal = document.querySelector('.books__modal')
	modalOverlay = document.querySelector('.books__modal-overlay')
	formInfo = document.querySelector('.books__modal-form-info')
}

const prepareDOMEvents = () => {
	submitBookBtn.addEventListener('click', e => {
		e.preventDefault()
		if(!checkInputs()) return
		getInputsFromForm()
		clearInputs()
	})

	addBookBtn.addEventListener('click', openModal)
	closeModalBtn.addEventListener('click', closeModal)
	window.addEventListener('click', clickOutsideModal)
}

let myLibrary = []

function Book(title, author, pages, read) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
}

const addBookToLibrary = (title, author, pages, read) => {
	const newBook = new Book(title, author, pages, read)
	myLibrary.push(newBook)

	refreshLibraryDisplay()
}

const getInputsFromForm = () => {
	const title = titleInput.value
	const author = authorInput.value
	const pages = pagesInput.value
	const read = readInput.checked ? 'read' : 'not read'

	addBookToLibrary(title, author, pages, read)
}

const renderBookCard = book => {
	const newCard = document.createElement('div')
	newCard.classList.add('books__card')
	newCard.innerHTML = `
	<p class="books__card-title">${book.title}</p>
	<p class="books__card-author">${book.author}</p>
	<p class="books__card-pages">${book.pages} pages</p>
	`
	const readCardBtn = document.createElement('button')
	readCardBtn.classList.add('books__card-read')
	readCardBtn.textContent = book.read
	book.read === 'read' ? readCardBtn.classList.add('books__card-read--active') : null;
	readCardBtn.addEventListener('click', () => toggleReadStatus(book, readCardBtn))

	const deleteCardBtn = document.createElement('button')
	deleteCardBtn.classList.add('books__card-delete')
	deleteCardBtn.textContent = 'DELETE'
	deleteCardBtn.addEventListener('click', () => removeBookFromLibrary(myLibrary.indexOf(book)))

	booksCardsDiv.appendChild(newCard)
	newCard.appendChild(readCardBtn)
	newCard.appendChild(deleteCardBtn)
}

const refreshLibraryDisplay = () => {
	booksCardsDiv.innerHTML = ''

	myLibrary.forEach(book => renderBookCard(book))
}

const clearInputs = () => {
	titleInput.value = ''
	authorInput.value = ''
	pagesInput.value = ''
	readInput.checked = false
	formInfo.style.display = 'none'
	closeModal()
}

const checkInputs = () => {
	if(!titleInput.value || !authorInput.value || !pagesInput.value) {
		formInfo.style.display = 'block'
		return false
	} return true
}

const toggleReadStatus = (book, btn) => {
	book.read = book.read === 'read' ? 'not read' : 'read';
	btn.classList.toggle('books__card-read--active')
	btn.textContent = book.read;
}

const removeBookFromLibrary = indexOfBook => {
	myLibrary.splice(indexOfBook, 1)

	refreshLibraryDisplay()
}

//MODAL DISPLAY

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

document.addEventListener('DOMContentLoaded', main)
