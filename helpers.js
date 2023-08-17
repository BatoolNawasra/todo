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

export const completExistTask = (task) => {
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
            .should('contain', taskText)
            .should('have.class', 'completed');
    }
    else {
        cy.contains('.todo-list li', taskText)
            .should('contain', taskText)
            .should('not.have.class', 'completed');
    }

}

