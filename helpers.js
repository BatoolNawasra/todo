export const LOCATORS = {
    itemsList: '.main ul ',
    newTodo: '.new-todo',
    items: '.main .todo-list li',
    filters: '.filters li',
    deletButton: 'button.destroy',
    editAbleItem: '.main ul li input.edit',
    toggleAllButton: '.main [for="toggle-all"]',
    enter: '{enter}',
    checkkBox: '[type="checkbox"]',
    activeCount: '.todo-count',
    clearCompleted: '.clear-completed',
    item:'li',
   length: 'length',
   label:'label',
   text:'text',
   footer:'.footer'
}

export const addNewTask = (tasks) => {
    tasks.forEach(task => {
        cy.get(LOCATORS.newTodo)
            .clear()
            .type(task)
            .type(LOCATORS.enter)
    });
}

export const compeletExistTask = (tasks) => {
    tasks.forEach(task => {
        cy.get(LOCATORS.items)
            .contains(task)
            .parent()
            .find(LOCATORS.checkkBox)
            .click();
    })
}

export const filterTasks = (filterName) => {
    cy.contains(LOCATORS.filters, filterName)
        .click()
}

export const checkTaskexistance = (taskName, shouldExist) => {
    let status = shouldExist ? 'contain' : 'not.contain'



    cy.get(LOCATORS.items)
        .should(status, taskName)
}

export const deleteTask = (taskName) => {
    cy.get(LOCATORS.items)
        .contains(taskName)
        .parent()
        .find(LOCATORS.deletButton)
        .click({ force: true })
}

export const editTaskName = (taskName, newTaskName) => {
    cy.get(LOCATORS.items)
        .contains(taskName)
        .parent()
        .dblclick()
    cy.get(LOCATORS.editAbleItem)
        .clear()
        .type(newTaskName + LOCATORS.enter)
};
//accept object  
export const checkCompleted = (task) => {
    let statusClass = task.clicked ? 'have.class' : 'not.have.class'
    let statusClick = task.clicked ? 'be.checked' : 'not.be.checked'
    cy.get('li').contains(task.name).parent().parent()
        .should(statusClass, 'completed')
        cy.get(LOCATORS.checkkBox)
               .should(statusClick)
}



export const checkButtonAvailabilty = (shouldExist = true) => {
    let status = shouldExist ? 'be.visible' : 'not.be.visible'
    cy.get(LOCATORS.footer).within(() => {
        cy.get(LOCATORS.clearCompleted)
            .should(status);
    })
}

