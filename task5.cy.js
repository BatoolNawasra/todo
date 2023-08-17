import * as helpers from '../todo/helpers'



describe('example to-do app', () => {

  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo')
  })

  it('Adding a new task and verify its added in task list', () => {
    // cy.get('.new-todo')
    //   .clear()
    //   .type('First Task')
    //   .type('{enter}')
    helpers.addNewTask('First Task')
    // Verify that the added task is present in the list
    cy.get('.main ul ').within(() => {
      cy.contains('First Task')
    })
    helpers.containTask('First Task')
    // cy.get('.main ul li ')
    //   .should('contain', 'First Task')
    helpers.ckeckcompleted('First Task', 'fales')
  })//done


  it('Mark New Added Task as Completed Verify it added to the completed list', () => {
    // cy.get('.new-todo')
    // .clear()
    //.type('Second Task')
    //.type('{enter}');
    helpers.addNewTask('Second Task')
    helpers.compeletExistTask('Second Task')
    // cy.get('.main ul li')
    //.contains('Second Task')
    //.parent()
    //.find('[type="checkbox"]')
    //.should('exist')
    //.click();


    // cy.get('.main ul li')
    // .contains('Second Task')
    // .parent()
    // .within(() => {
    //   cy.get('[type="checkbox"]').as('checkbox'); // Alias the checkbox element
    //   })
    // Verify that the checkbox is checked
    // cy.get('@checkbox').should('be.checked');

    // Verify that the task appears in the completed list
    // cy.contains('.filters li', 'Completed')
    //   .click();
    helpers.Filter('Completed')
    // cy.get('.main ul li').should('contain', 'Second Task');
    helpers.ckeckcompleted('Second Task', 'true')
  });


  it('add task and  Edit its text ', () => {
    //cy.get('.new-todo')
    //.clear()
    //.type('Third Task')
    //.type('{enter}')

    helpers.addNewTask('Third Task')

    cy.get('.main ul li')
      .contains('Third Task')
      .parent()
      .dblclick()

    cy.get('.main ul li input.edit')
      .clear()
      .type('Edited Successfully {enter}')

    // Verify that the edited task is present in the list
    //cy.get('.main ul li').should('contain', 'Edited Successfully')
    helpers.containTask('Edited Successfully')
  })//done


  it('Editing an existing task with empty text.', () => {

    // Double-click to enter edit mode for the task
    cy.get('.main ul li')
      .contains('Pay electric bill')
      .dblclick()

    // Clear the existing text and save with empty text
    cy.get('.main ul li.editing input.edit')
      .clear()
      .type('{enter}')

    // Verify that the task is deleted
    cy.get('.main ul li')
      .should('not.contain', 'Pay electric bill')
    //  .should('not.exist', 'Pay electric bill') for dom elements not text 
  })//done


  it('Deleting a task.', () => {
    // cy.get('.new-todo')
    // .clear()
    //.type('Fifth Task')
    //.type('{enter}')
    helpers.addNewTask('Fifth Task')

    // Click the delete button even if it's hidden
    cy.get('section.main ul.todo-list li')
      .contains('Fifth Task')
      .parent()
      .find('button.destroy')
      .click({ force: true }) // Click with {force: true} to interact with hidden element
    // Verify that the deleted task is not present in the list
    cy.get('.main ul li')
      .should('not.contain', 'Fifth Task');

  })//done




  it('verify number of items in the active todo list correct ', () => {
    //  cy.get('.new-todo')
    //.clear()
    //  .type('Sixth Task ')
    //.type('{enter}')
    helpers.addNewTask('Sixth Task')
    // Get the number of active items from the todo count
    cy.get('.todo-count')
      .invoke('text')
      .then(countText => {
        const num = parseInt(countText);

        cy.log(num);

        // Switch to the "Active" filter
        // cy.contains('.filters li', 'Active')
        //   .click();

        // Verify the number of items in the active todo list
        cy.get('.main ul li')
          .should('have.length', num);
      });
  });//done







  it('Check "Click All as Completed" button functionality one click.', () => {
    // Click the "Click All as Completed" button
    cy.get('.main [for="toggle-all"]')
      .click();

    // Verify that all task items are marked as completed within the context of '.todo-list'
    cy.get('.todo-list').within(() => {
      // Check that each individual task list item has the class 'completed'
      cy.get('li').each((item) => {
        cy.wrap(item).should('have.class', 'completed');
      });
    });
  });//done




  it.only('"Clear All Completed" button Check visibility when changing from hidden to visible', () => {

    // Verify that "Clear All Completed" button is initially hidden
    cy.get('.clear-completed')
      .should('not.be.visible');

    // Mark a task as completed
    // cy.get('.toggle')
    //   .first()
    //   .check();
    helpers.compeletExistTask('Pay electric bill')  

    // Verify that "Clear All Completed" button becomes visible within '.footer'
    cy.get('.footer').within(() => {
      cy.get('.clear-completed')
        .should('be.visible');
    });
  });//done

  it('"Clear All Completed" button Check visibility when changing from visible to hidden', () => {


    // Mark all tasks as completed using "Click All as Completed" button
    cy.get('.main [for="toggle-all"]')
      .click();

    // Verify that "Clear All Completed" button is visible within '.footer'
    cy.get('.footer').within(() => {
      cy.get('.clear-completed')
        .should('be.visible');
    });

    // Uncheck tasks to make them incomplete
    cy.get('.toggle')
      .uncheck();

    // Verify that "Clear All Completed" button is hidden again within '.footer'
    cy.get('.footer').within(() => {
      cy.get('.clear-completed')
        .should('not.be.visible');
    });
  });




  it.only('Check Filter "Active"', () => {
    // Mark a task as completed
    // cy.get('.toggle')
    //   .first()
    //   .check();
    helpers.compeletExistTask('Pay electric bill')  

    // Click on the "Active" filter
    // cy.contains('.filters li', 'Active')
    //   .click();
    helpers.Filter('Active')
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
    // cy.get('.toggle')
    //   .first()
    //   .check()
    helpers.compeletExistTask('Pay electric bill')  

    // Click on the "Active" filter
    // cy.contains('.filters li', 'Active')
    //   .click()
    helpers.Filter('Active')
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
    // Add three new tasks and mark them as completed
    // cy.get('.new-todo')
    //   .type('Task 1{enter}')
    // .type('Task 2{enter}')
    //.type('Task 3{enter}')

    helpers.addNewTask('Task 1')
    helpers.addNewTask('Task 2')
    helpers.addNewTask('Task 3')
    helpers.compeletExistTask('Task 1')
    helpers.compeletExistTask('Task 2')
    helpers.compeletExistTask('Task 3')







    // cy.contains('.filters li', 'Completed')
    //   .click() // go to completed tasks page 
    helpers.Filter('Completed')
    // Verify that only completed tasks are displayed
    cy.get('.todo-list ').within(() => {
      cy.get('li').each((item) => {
        cy.wrap(item).should('have.class', 'completed');
      });

    })

  })//done 


  it('Check "Click All as Completed" button functionality double click.', () => {
    // cy.get('.new-todo')
    //   .clear()
    //   .type('New Task {enter}')

    helpers.addNewTask('New Task')
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
    // Add some tasks
    // cy.get('.new-todo')
    //   .type('Task 1{enter}')
    //   .type('Task 2{enter}')
    //   .type('Task 3{enter}')


    //   cy.get('.main ul li')
    //   .contains('Task 1')
    //   .parent()
    //   .find('[type="checkbox"]')
    //   .should('exist')
    //   .click();

    //   cy.get('.main ul li')
    //   .contains('Task 3')
    //   .parent()
    //   .find('[type="checkbox"]')
    //   .should('exist')
    //   .click();  // Mark random tasks as completed

    helpers.addNewTask('Task 1')
    helpers.addNewTask('Task 2')
    helpers.addNewTask('Task 3')
    helpers.compeletExistTask('Task 1')

    helpers.compeletExistTask('Task 3')
    // Calculate the total number of tasks (active + completed)
    let totalTasksCount = 0;
    let activeCount = 0;
    let completedCount = 0;

    // Visit the "Active" filter
    //  cy.contains('.filters li', 'Active')
    //    .click();
    helpers.Filter('Active')


    cy.get('.todo-list li').its('length').then(activeTasksCount => {
      activeCount = activeTasksCount;


      // Visit the "Completed" filter
      // cy.contains('.filters li', 'Completed')
      //   .click();
      helpers.Filter('Completed')
      cy.get('.completed').its('length')
        // helpers.locaterLength('.completed')
        .then(completedTasksCount => {
          completedCount = completedTasksCount;
          totalTasksCount = activeCount + completedCount;

          // Visit the "All" filter
          // cy.contains('.filters li', 'All')
          //   .click();
          helpers.Filter('All')
          cy.get('.todo-list li').should('have.length', totalTasksCount);

        });
    });
  });//done

  it('add task "Active" and try to acsses it ', () => {
    // cy.get('.new-todo')
    //   .type('Active {enter}')
    helpers.addNewTask('Active')

    cy.get('.todo-list').within(() => {

      cy.get('li')
        .should('contain', 'Active');

    });
    helpers.containTask('Active')
  })

})
