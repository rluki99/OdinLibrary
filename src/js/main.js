let myLibrary = []

function Book(title, author, pages, read) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
	this.info = function () {
		return `${title} by ${author}, ${pages} pages, ${read}`
	}
}

const addBookToLibrary = () => {
	myLibrary.push(theHobbit)
	myLibrary.push(theTester)
}

const theHobbit = new Book('The Hobbit', 'Tolkien', '295', 'read')
const theTester = new Book('The Tester', 'Test', '2137', 'read')
console.log(theHobbit.info())

addBookToLibrary()
console.log(myLibrary)


//MODAL

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

const clickOutsideModal = (e) => {
	if (e.target == modal) {
		closeModal()
	}
}

addBookBtn.addEventListener('click', openModal)
closeModalBtn.addEventListener('click', closeModal)
window.addEventListener('click', clickOutsideModal)
