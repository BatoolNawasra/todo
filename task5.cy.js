import * as helpers from '../todo/helpers'
const TASK = {
task1:'First Task',
task2:'Second Task',
task3:'Third Task',
task5:'Fifth Task',
activeTask:'Active'
}
const FILTERS = {
  Active: 'Active',
  ALL: 'All',
  Completed: 'Completed'
}



describe('example to-do app', () => {

  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo')
  })

  it('Adding a new task and verify its added in task list', () => {
    helpers.addNewTask([TASK.task1])
    cy.get('.main ul ').within(() => {
      cy.contains(TASK.task1)
    })
    helpers.checkTaskexistance(TASK.task1, true)
    helpers.checkCompleted({ name:TASK.task1, clicked: false })
  })//done


  it('Mark New Added Task as Completed Verify it added to the completed list', () => {
    helpers.addNewTask([TASK.task2])
    helpers.compeletExistTask([TASK.task2])
    helpers.filterTasks(FILTERS.Completed)
    helpers.checkCompleted({ name:TASK.task2, clicked: true })
  });


  it('add task and  Edit its text ', () => {
    helpers.addNewTask([TASK.task3])
    helpers.editTaskName(TASK.task3, 'Edited Successfully')
    helpers.checkTaskexistance('Edited Successfully')
  })//done


  it('Editing an existing task with empty text.', () => {
    helpers.editTaskName('Pay electric bill', '')
    //helpers.checkTaskexistance({ taskName: 'Pay electric bill', shouldExist: false })
   
    cy.get('.main ul li')
      .should('not.contain', 'Pay electric bill')
  })//done


  it('Deleting a task.', () => {
    helpers.addNewTask([TASK.task5])
    helpers.deleteTask(TASK.task5)
    helpers.checkTaskexistance(TASK.task5, false)
  })//done

  it('verify number of items in the active todo list correct ', () => {
    helpers.addNewTask(TASK.task5)
    // Get the number of active items from the todo count
    cy.get('.todo-count')
      .invoke('text')
      .then(countText => {
        const num = parseInt(countText);
        cy.log(num);
        helpers.filterTasks(FILTERS.Active)
        // Verify the number of items in the active todo list
        cy.get(helpers.LOCATORS.items)
          .should('have.length', num);
      });
  });//done


  it('Check "Click All as Completed" button functionality one click.', () => {
    // Click the "Click All as Completed" button
    cy.get(helpers.LOCATORS.toggleAllButton)
      .click();
    cy.get('.todo-list').within(() => {
      cy.get('li').each(task => {
        cy.get(task).find('label').then((text) => {
         let taskName = text.text()
          cy.log(taskName)
          helpers.checkCompleted({ name: taskName, clicked: false })

        });//done
      })
    })})



      it('"Clear All Completed" button Check visibility when changing from hidden to visible', () => {
        helpers.checkButtonAvailabilty(false)
        helpers.compeletExistTask(['Pay electric bill'])
        helpers.checkButtonAvailabilty(true)
      });//done

      it('"Clear All Completed" button Check visibility when changing from visible to hidden', () => {
        cy.get(helpers.LOCATORS.toggleAllButton)
          .click();
        helpers.checkButtonAvailabilty(true)
        cy.get('.toggle')
          .uncheck();
        helpers.checkButtonAvailabilty(false)
      });




      it('Check Filter "Active"', () => {
        helpers.compeletExistTask(['Pay electric bill'])
        helpers.filterTasks(FILTERS.Active)
        // Verify that only active tasks are displayed using within() and each()
        cy.get('.todo-list').within(() => {
          cy.get('li').each(task => {
            //helpers.ckeckcompleted(task,'fales')
            cy.wrap(task).should('not.have.class', 'completed');
          });
        });
      });//done



      it('Verify active items count matches the number at the bottom', () => {
        helpers.compeletExistTask(['Pay electric bill'])
        helpers.filterTasks(FILTERS.Active)
        cy.get('.todo-list li')
          .its('length')
          .then(activeItemCount => {
            cy.get('.todo-count')
              .invoke('text')
              .then(bottomText => {
                const num = parseInt(bottomText.match(/\d+/)[0]);
                expect(activeItemCount).to.equal(num);
              });
          });
      });//done


      it('Check Fillter "Completed"', () => {
        helpers.addNewTask([TASK.task1,TASK.task2,TASK.task3])
        helpers.compeletExistTask([TASK.task1,TASK.task2,TASK.task3])
        helpers.filterTasks(FILTERS.Completed)
        cy.get('.todo-list ').within(() => {
          cy.get('li').each((item) => {

            cy.wrap(item).should('have.class', 'completed');
          });
        })
      })//done 
      it('Check "Click All as Completed" button functionality double click.', () => {
        helpers.addNewTask(['New Task']);
        cy.get('.todo-list li')
          .its('length').then(initialActiveCount => {
            // Click the "Click All as Completed" button
            cy.get(helpers.LOCATORS.toggleAllButton).click();
            // Verify that tasks change state based on the behavior expected
            cy.get('.todo-list').within(() => {
              cy.get('li').each(task => {
                cy.get(task).find('label').then((text) => {
                  let taskName = text.text()
                  cy.log(taskName)
                  helpers.checkCompleted({ name: taskName, clicked: true })
                })
              });
            });
          })

        // Double-click again to revert the state
        cy.get(helpers.LOCATORS.toggleAllButton).click();

        // Verify that tasks are back to their initial state
        cy.get('.todo-list').within(() => {
          cy.get('li').each(task => {

            cy.get(task).find('label').then((text) => {
              let taskName = text.text()
              cy.log(taskName)
              //  helpers.checkCompleted()
              helpers.checkCompleted({ name: taskName, clicked: false })
            });
          });
        });


        it.only('Check Fillter "ALL" - and Check the count of all tasks', () => {
          helpers.addNewTask([TASK.task1,TASK.task2,TASK.task3])
          helpers.compeletExistTask([TASK.task1,TASK.task3])
          // Calculate the total number of tasks (active + completed)
          let totalTasksCount = 0;
          let activeCount = 0;
          let completedCount = 0;
          helpers.filterTasks(FILTERS.Active)
          cy.get('.todo-list li').its('length').then(activeTasksCount => {
            activeCount = activeTasksCount;
            helpers.filterTasks(FILTERS.Completed)
            cy.get('.completed').its('length')
              // helpers.locaterLength('.completed')
              .then(completedTasksCount => {
                completedCount = completedTasksCount;
                totalTasksCount = activeCount + completedCount;
                helpers.filterTasks(FILTERS.ALL)
                cy.get(helpers.LOCATORS.items).should('have.length', totalTasksCount);
              });
          });
        });//done

        it('add task "Active" and try to acsses it ', () => {
          helpers.addNewTask([TASK.activeTask])
          cy.get('.todo-list').within(() => {
            cy.get('li')
              .should('contain', TASK.activeTask);
          });
          helpers.checkTaskexistance('Active')
        })

      })
    })