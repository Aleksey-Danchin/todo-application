const actionPanel1Element = document.getElementById('actionPanel1')
const actionPanel2Element = document.getElementById('actionPanel2')
const inputElement = document.getElementById('input')
const listElement = document.getElementById('list')
let todoList = []

inputElement.addEventListener('keydown', event => {
	const isEnter = event.code === 'Enter' || event.keyCode === 13
	const value = inputElement.value

	if (!isEnter || value === '') {
		return
	}

	todoList.unshift({
		content: value,
		selected: false,
		done: false
	})

	inputElement.value = ''
	updateView()
})

function updateView () {
	const selectedModeFlag = getSelectedModeFlag()
	
	listElement.innerHTML = ''
	
	for (let index = 0; index < todoList.length; index++) {
		const todoItem = todoList[index]

		const liElement = document.createElement('li')
		liElement.className = 'list-group-item'
		listElement.append(liElement)

		const divElement = document.createElement('div')
		divElement.className = 'form-group form-check'
		liElement.append(divElement)

		const input = document.createElement('input')
		input.type = 'checkbox'
		input.className = 'form-check-input'
		input.checked = todoItem.selected
		input.id = `todoItem${index}`

		divElement.append(input)

		const label = document.createElement('label')
		label.innerText = todoItem.content
		label.className = 'form-check-label'
		label.setAttribute('for', `todoItem${index}`)
		divElement.append(label)

		if (!selectedModeFlag) {
			const buttonElement = document.createElement('button')
			buttonElement.style = 'float: right'
			divElement.append(buttonElement)
		
			if (todoItem.done) {
				buttonElement.className = "btn btn-outline-danger"
				buttonElement.innerText = 'restore'
				label.className += ' todoDone'
			} else {
				buttonElement.className = "btn btn-outline-success"
				buttonElement.innerText = 'done'
			}

			buttonElement.addEventListener('click', () => {
				todoItem.done = !todoItem.done 
				updateView()
			})
		}

		input.addEventListener('change', () => {
			todoItem.selected = input.checked
			updateView()
		})
	}

	actionPanel1Element.style.display = selectedModeFlag ? 'none' : 'flex'
	actionPanel2Element.style.display = selectedModeFlag ? 'block' : 'none'
}

function getSelectedModeFlag () {
	for (const todoItem of todoList) {
		if (todoItem.selected) {
			return true
		}
	}

	return false
}

document.getElementById('doneAction').addEventListener('click', () => {
	for (const todoItem of todoList) {
		if (todoItem.selected) {
			todoItem.done = true
		}

		todoItem.selected = false
	}

	updateView()
})

document.getElementById('restoreAction').addEventListener('click', () => {
	for (const todoItem of todoList) {
		if (todoItem.selected) {
			todoItem.done = false
		}

		todoItem.selected = false
	}

	updateView()
})

document.getElementById('removeAction').addEventListener('click', () => {
	todoList = todoList.filter(todoItem => !todoItem.selected)
	updateView()
})

document.getElementById('selectAllAction').addEventListener('click', () => {
	for (const todoItem of todoList) {
		todoItem.selected = true
	}

	updateView()
})

updateView()
