export const LOCATORS = {
    newTodo: '.new-todo',
    items: '.main ul li'
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
    cy.contains('.filters li', filterName)
        .click()

}

export const checkTaskexistance = (taskName, shouldExist = true) => {
    let status = shouldExist ?'contain':'not.contain'
    cy.get('.main ul li')
        .should(status, taskName)
}

export const deleteTask = (taskName) => {
    cy.get('section.main ul.todo-list li')
        .contains(taskName)
        .parent()
        .find('button.destroy')
        .click({ force: true })
}

export const editTaskName = (taskName, newTaskName) => {
    cy.get('.main ul li')
        .contains(taskName)
        .parent()
        .dblclick()
    cy.get('.main ul li input.edit')
        .clear()
        .type(newTaskName + '{enter}')


};
//accept object  
export const checkCompleted = (task) => {
    let statusclass = task.clicked ? 'have.class' : 'not.have.class'
    let statusclick = task.clicked ? 'be.checked' : 'not.be.checked'

    cy.contains('.todo-list li', task.name)
        .should(statusclass, 'completed')
        .parent()
        .within(() => {
            cy.get('[type="checkbox"]')
                .should(statusclick);
        });
};

export const checkButtonAvailabilty = (shouldExist = true) => {
    let status = shouldExist ? 'be.visible' : 'not.be.visible'
    cy.get('.footer').within(() => {
        cy.get('.clear-completed')
            .should(status);
    })
}


