export const LOCATORS = {
    newTodo: '.new-todo',
    items: '.main ul li',
    filters:'.filters li',
    deletButton:'button.destroy',
    editAbleItem:'.main ul li input.edit',
    toggleAllButton:'.main [for="toggle-all"]'
}

export const addNewTask = (tasks) => {
    tasks.forEach(task => {
        cy.get(LOCATORS.newTodo)
            .clear()
            .type(task)
            .type('{enter}')
    });
}

export const compeletExistTask = (tasks) => {
    tasks.forEach(task => {
        cy.get(LOCATORS.items)
            .contains(task)
            .parent()
            .find('[type="checkbox"]')
            .click();
    })
}

export const filterTasks = (filterName) => {
    cy.contains(LOCATORS.filters, filterName)
        .click()
}

export const checkTaskexistance = (taskName, shouldExist = true) => {
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
        .type(newTaskName + '{enter}')
};
//accept object  
export const checkCompleted = (task) => {
    let statusclass = task.clicked ? 'have.class' : 'not.have.class'
    let statusclick = task.clicked ? 'be.checked' : 'not.be.checked'
    cy.get(LOCATORS.items)
        // .contains(task.name)
       
        .parent()
        .should(statusclass, 'completed')
        .within(() => {
            cy.get('[type="checkbox"]')
                .should(statusclick);
        })
};

export const checkButtonAvailabilty = (shouldExist = true) => {
    let status = shouldExist ? 'be.visible' : 'not.be.visible'
    cy.get('.footer').within(() => {
        cy.get('.clear-completed')
            .should(status);
    })
}


