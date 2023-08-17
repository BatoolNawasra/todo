export const LOCATORS = {
    newTodo: '.new-todo',
    items: '.main ul li'
}

export const addNewTask = (task) => {
    cy.get(LOCATORS.newTodo)
        .clear()
        .type(task)
        .type('{enter}')
}

export const compeletExistTask = (task) => {
    cy.get('.main ul li')
        .contains(task)
        .parent()
        .find('[type="checkbox"]')
        .click();

}

export const Filter = (filterName) => {
    cy.contains('.filters li', filterName)
        .click()

}
export const containTask = (TaskName) => {
    cy.get('.main ul li')
        .should('contain', TaskName)
}

export const ckeckcompleted = (taskText, x) => {

    if (x == 'true') {
        cy.contains('.todo-list li', taskText)
            //.should('contain', taskText)
            .should('have.class', 'completed')
        cy.contains('.todo-list li', taskText)
            .parent()
            .within(() => {
                cy.get('[type="checkbox"]')
                    .should('be.checked');

            })
    }
    else {
        cy.contains('.todo-list li', taskText)
           // .should('contain', taskText)
            .should('not.have.class', 'completed')
        cy.contains('.todo-list li', taskText)
            .parent()
            .within(() => {
                cy.get('[type="checkbox"]')
                    .should('not.be.checked');

            })

    }

}

export const locaterLength =(locater) =>{

    cy.get(locater).its('length')
}