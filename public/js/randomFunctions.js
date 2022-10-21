//create task element
const undrList = document.querySelector('.todo__itemList')

const createElement = element => {
    let div = document.createElement('div')

    div.innerHTML = `<li class="todo__itemList--color">${element}<button class="todo__itemList--button fas fa-check doneBTN"></button
    ><button class="todo__itemList--button fas fa-trash trashBTN"></button></li>`

    undrList.appendChild(div)

    div.setAttribute('class', '')
}

//check if input's empty function
const todo_container = document.querySelector('.todo__container')
const form = document.querySelector('.todo__form')

const checkInputValue = () => {
    let alert_box = document.createElement('div')
    let alert_text = document.createElement('h4')
    alert_box.classList.add('alertStyle')
    alert_text.textContent = 'Empty task is not permitted'
    alert_box.appendChild(alert_text)
    todo_container.insertBefore(alert_box, form)

    setTimeout(
        () => todo_container.removeChild(todo_container.childNodes[1]),
        1500
    )
}

export { createElement, checkInputValue }
