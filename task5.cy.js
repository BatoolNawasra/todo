import * as helpers from '../todo/helpers'



describe('example to-do app', () => {

  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo')
  })

  it('Adding a new task and verify its added in task list', () => {
    helpers.addNewTask(['First Task'])
    helpers.checkTaskexistance('First Task')
    helpers.checkCompleted({ name: 'First Task', clicked: false })
  })//done


  it('Mark New Added Task as Completed Verify it added to the completed list', () => {
    helpers.addNewTask(['Second Task'])
    helpers.compeletExistTask(['Second Task'])
    helpers.filterTasks('Completed')
    helpers.checkCompleted('Second Task', true)
  });//done


  it('add task and Edit its text ', () => {
    helpers.addNewTask(['Third Task'])
    helpers.editTaskName('Third Task', 'Edited Successfully')
    helpers.checkTaskexistance('Edited Successfully')
  })//done


  it('Editing an existing task with empty text.', () => {
    helpers.editTaskName('Pay electric bill', '')
    // helpers.verifyDeleted('Pay electric bill')
    helpers.checkTaskexistance('Pay electric bill', false)
  })//done


  it('Deleting a task.', () => {
    helpers.addNewTask(['Fifth Task'])
    helpers.deleteTask('Fifth Task')
    helpers.checkTaskexistance('Fifth Task', false)
  })//done




  it('verify number of items in the active todo list correct ', () => {
    helpers.addNewTask(['Sixth Task'])
    // Get the number of active items from the todo count
    cy.get('.todo-count')
      .invoke('text')
      .then(countText => {
        const num = parseInt(countText);
        cy.log(num);
        helpers.filterTasks('Active')
        // Verify the number of items in the active todo list
        cy.get('.main ul li')
          .should('have.length', num);
      });
  });


  it('Check "Click All as Completed" button functionality one click.', () => {
    // Click the "Click All as Completed" button
    cy.get('.main [for="toggle-all"]')
      .click();

    // Verify that all task items are marked as completed within the context of '.todo-list'
    cy.get('.todo-list').within(() => {
      // Check that each individual task list item has the class 'completed'
      cy.get('li').each((item) => {
        cy.wrap(item).should('have.class', 'completed');
        // helpers.checkCompleted({ name: item.textContent, clicked: true })
      });
    });
  });




  it('"Clear All Completed" button Check visibility when changing from hidden to visible', () => {

    // Verify that "Clear All Completed" button is initially hidden
    helpers.clearAllCompletedButtonVisibillity(false)
    helpers.compeletExistTask(['Pay electric bill'])
    // Verify that "Clear All Completed" button becomes visible within '.footer'
    helpers.clearAllCompletedButtonVisibillity(true)
  });
});//done

it('"Clear All Completed" button Check visibility when changing from visible to hidden', () => {
  // Mark all tasks as completed using "Click All as Completed" button
  cy.get('.main [for="toggle-all"]')
    .click();

  // Verify that "Clear All Completed" button is visible within '.footer'
 helpers.clearAllCompletedButtonVisibillity(true)
  // Uncheck tasks to make them incomplete
  cy.get('.toggle')
    .uncheck();

  // Verify that "Clear All Completed" button is hidden again within '.footer'
 helpers.clearAllCompletedButtonVisibillity(false)
});





it('Check Filter "Active"', () => {
  helpers.compeletExistTask(['Pay electric bill'])
  helpers.filterTasks('Active')
  // Verify that only active tasks are displayed using within() and each()
  cy.get('.todo-list').within(() => {
    cy.get('li').each(task => {
      //helpers.ckeckcompleted(task,'fales')
      cy.wrap(task).should('not.have.class', 'completed');
    });
  });
});//done



it('Verify active items count matches the number at the bottom', () => {
  // Mark some tasks as completed
  helpers.compeletExistTask(['Pay electric bill'])

  // Click on the "Active" filter
  helpers.filterTasks('Active')
  // Count the number of active tasks in the list
  cy.get('.todo-list li')
    .its('length')
    .then(activeItemCount => {
      // Extract the number from the text at the bottom
      cy.get('.todo-count')
        .invoke('text')
        .then(bottomText => {
          const num = parseInt(bottomText.match(/\d+/)[0]);

          // Compare the numbers
          expect(activeItemCount).to.equal(num);
        });
    });
});//done


it('Check Fillter "Completed"', () => {
  helpers.addNewTask(['Task 1', 'Task 2', 'Task 3'])
  helpers.compeletExistTask(['Task 1', 'Task 2', 'Task 3'])
  helpers.filterTasks('Completed')
  // Verify that only completed tasks are displayed
  cy.get('.todo-list ').within(() => {
    cy.get('li').each((item) => {
      cy.wrap(item).should('have.class', 'completed');
    });

  })
})//done 


it('Check "Click All as Completed" button functionality double click.', () => {


  helpers.addNewTask(['New Task'])
  // Count the number of active tasks initially
  cy.get('.todo-list li')
    .should('not.have.class', 'completed')
    .its('length').then(initialActiveCount => {
      // Click the "Click All as Completed" button
      cy.get('.main [for="toggle-all"]').click();

      // Verify that tasks change state based on the behavior expected
      cy.get('.todo-list').within(() => {
        cy.get('li').each(task => {

          if (initialActiveCount > 0) {
            cy.wrap(task).should('have.class', 'completed');
          } else {
            cy.wrap(task).should('not.have.class', 'completed');
          }
        }
        );
      });

      // Double-click again to revert the state
      cy.get('.main [for="toggle-all"]').click();

      // Verify that tasks are back to their initial state
      cy.get('.todo-list').within(() => {
        cy.get('li').each(task => {
          if (initialActiveCount > 0) {
            cy.wrap(task).should('not.have.class', 'completed');
          } else {
            cy.wrap(task).should('have.class', 'completed');
          }
        });
      });
    });
});//done

it('Check Fillter "ALL" - and Check the count of all tasks', () => {
  let task = {
    name: 'task1',
    value: true
  }
  helpers.addNewTask(['Task 1', 'Task 2', 'Task 3'])

  helpers.compeletExistTask(['Task 1', 'Task 3'])


  // Calculate the total number of tasks (active + completed)
  let totalTasksCount = 0;
  let activeCount = 0;
  let completedCount = 0;

  // Visit the "Active" filter
  helpers.filterTasks('Active')

  cy.get('.todo-list li').its('length').then(activeTasksCount => {
    activeCount = activeTasksCount;
    // Visit the "Completed" filter
    helpers.filterTasks('Completed')
    cy.get('.completed').its('length')
      // helpers.locaterLength('.completed')
      .then(completedTasksCount => {
        completedCount = completedTasksCount;
        totalTasksCount = activeCount + completedCount;
        helpers.filterTasks('All')
        cy.get('.todo-list li').should('have.length', totalTasksCount);

      });
  });
});//done

it('add task "Active" and try to acsses it ', () => {
  helpers.addNewTask(['Active'])
  helpers.checkTaskexistance('Active')
})


