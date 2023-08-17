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
tasks.forEach(task =>{
    cy.get(LOCATORS.items)
    .contains(task)
    .parent()
    .find('[type="checkbox"]')
    .click();
})
 

}

export const Filter = (filterName) => {
    cy.contains('.filters li', filterName)
        .click()

}

export const checkTaskexistance = (TaskName, shouldExist = true) => {
    let status = shouldExist ? 'contain' : 'not.contain'
    cy.get('.main ul li')
        .should(status, TaskName)
}

export const ckeckcompleted = (taskText, expectedStatus) => {
    let status = expectedStatus ? true : fales
    if (expectedStatus == true) {
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

// export const locaterLength =(locater) =>{
// let x = 
//     cy.get(locater).its('length')
// }