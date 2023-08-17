export const LOCATORS = {
    newTodo: '.new-todo'
}

export const addNewTask = (task) => {
    cy.get(LOCATORS.newTodo)
    .clear()
    .type(task)
    .type('{enter}')
}

export const completExistTask= (task) => {
    cy.get('.main ul li')
    .contains(task)
    .parent()
    .find('[type="checkbox"]')
    .click();

}