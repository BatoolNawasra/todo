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

export const checkTaskexistance = (TaskName, shouldExist = true) => {
    let status = shouldExist ? 'contain' : 'not.contain'
    cy.get('.main ul li')
        .should(status, TaskName)
}

export const clearAllCompletedButtonVisibillity = (shouldVisabil = true) => {
    let status = shouldVisabil ? 'be.visible' : 'not.be.visible'
    // Verify that "Clear All Completed" button becomes visible within '.footer'
    cy.get('.footer').within(() => {
        cy.get('.clear-completed')
          .should(status);
    }
    )}


//accept object  
// export const checkCompleted = (task) => {
//     let statusclass = task.clicked ? 'have.class' : 'not.have.class'
//     let statusclick = task.clicked ? 'be.checked' : 'not.be.checked'
//     //  checkTaskexistance(task.name,true)
//     cy.get('.todo-list li')
//         .contains( task.name)
//     cy.get('.todo-list li')
//         .should(statusclass, 'completed')
//         .parent()
//         .within(() => {
//             cy.get('[type="checkbox"]')
//                 .should(statusclick);
//         })
// };

export const checkCompleted = (task) => {
    // Determine the class and checkbox status based on the 'clicked' property
    const statusclass = task.clicked ? 'have.class' : 'not.have.class';
    const statusclick = task.clicked ? 'be.checked' : 'not.be.checked';

    // Find the task in the todo list and perform checks
    cy.contains('.todo-list li', task.name)
        .parent()
        .should(statusclass, 'completed') // Check the class based on 'clicked'

        .within(() => {
            cy.get('[type="checkbox"]')
                .should(statusclick); // Check the checkbox status based on 'clicked'
        });
};

export const editTaskName = (taskName, newTaskName) => {
    cy.get('.main ul li')
        .contains(taskName)
        .parent()
        .dblclick()
    cy.get('.main ul li input.edit')
        .clear()
        .type(newTaskName + '{enter}')


}
export const deleteTask = (task) => {
    cy.get('section.main ul.todo-list li')
        .contains(task)
        .parent()
        .find('button.destroy')
        .click({ force: true })
}



// export const verifyDeleted= (task)=> {
//      // Verify that the deleted task is not present in the list
//     cy.get('.main ul li')
//     .should('not.contain', task);
// }duplicated to checkTask existance function