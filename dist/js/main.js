import '../sass/style.scss'
import { checkInputValue, createElement } from './randomFunctions'

const submitBTN = document.querySelector('.todo__submit')
const todoInput = document.querySelector('#todo__input')
const undrList = document.querySelector('.todo__itemList')
const filters = document.querySelector('.todo__filter')

//Add Task
submitBTN.addEventListener('click', e => {
    e.preventDefault()

    if (todoInput.value == '') checkInputValue()
    else {
        let allTasks = undrList.childNodes
        let filterOPT = filters.options[filters.selectedIndex].value
        createElement(todoInput.value)
        saveTaskOnLocal(todoInput.value)

        todoInput.value = ''

        allTasks.forEach(item => {
            if (filterOPT == 'done' && !item.classList.contains('done'))
                item.style.display = 'none'
        })
    }
})

//done action
document.addEventListener('click', e => {
    const event = e.target
    const item = event.parentElement
    let allTasks = undrList.childNodes
    let filterOPT = filters.options[filters.selectedIndex].value

    if (event.classList.contains('doneBTN')) {
        item.classList.toggle('todo__itemList--scratch')
        item.parentElement.classList.toggle('done')

        item.parentElement.classList.contains('done')
            ? eraseStorageTask(item.textContent)
            : saveTaskOnLocal(item.textContent)

        allTasks.forEach(task => {
            switch (filterOPT) {
                case 'done':
                    if (!task.classList.contains('done'))
                        task.style.display = 'none'
                    break
                case 'pending':
                    if (task.classList.contains('done'))
                        task.style.display = 'none'
                    break
            }
        })
    }
})

//erase action
document.addEventListener('click', e => {
    let event = e.target

    if (event.classList.contains('trashBTN')) {
        event.parentElement.parentElement.remove()
        eraseStorageTask(event.previousSibling.previousSibling.textContent)
    }
})

//filter tasks

filters.addEventListener('change', e => {
    let select = e.target.value
    let allTasks = undrList.childNodes
    let filter_option

    allTasks.forEach(item => {
        filter_option = {
            all: () => (item.style.display = ''),
            done: () => {
                if (item.classList.contains('done')) item.style.display = ''
                else item.style.display = 'none'
            },
            pending: () => {
                if (!item.classList.contains('done')) item.style.display = ''
                else item.style.display = 'none'
            },
        }
        filter_option[select]()
    })
})

//save tasks

const saveTaskOnLocal = task => {
    let taskItem

    localStorage.getItem('tasks') === null
        ? (taskItem = [])
        : (taskItem = JSON.parse(localStorage.getItem('tasks')))

    taskItem.push(task)
    localStorage.setItem('tasks', JSON.stringify(taskItem))
}

//get task from local

document.addEventListener('DOMContentLoaded', () => {
    let taskItem
    localStorage.getItem('tasks') === null
        ? (taskItem = [])
        : (taskItem = JSON.parse(localStorage.getItem('tasks')))

    taskItem.forEach(task => createElement(task))
})

// erase localStorage

const eraseStorageTask = task => {
    let taskItem

    taskItem = JSON.parse(localStorage.getItem('tasks'))

    taskItem.forEach((item, index) => {
        if (task == item) taskItem.splice(index, 1)
        localStorage.setItem('tasks', JSON.stringify(taskItem))
    })
}
