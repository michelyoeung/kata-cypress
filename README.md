## Introduction

As we know, end-to-end (e2e) testing can be very repetitive and time consuming at the same time. Cypress is one of the most famous e2e testing tool.
It allows us to make e2e tests in the same way an end user would do. It is mainly used to make e2e tests on pre-production environment, before a release,
to test the non-regression and the new features and would partially replace the Quality Assurance (QA) team. "Partially" because we will always need a real human
to assert generally that every goes well on the application before a release (just in case).
This Code Kata allows you dip your hands into Cypress : how it works, how to make your first basic e2e tests, and what are the best practices.

## Get started

1. First of all, you can start the project and play with the application to know be familiar with it
   about the different interactions, the UX/UI, etc. (spoiler : you might have seen this application before).


2. To run the project (on localhost port 4200) :

   ```
   npm i
   npm run start
   ```

3. Once you have played with the application, you can run the Cypress test provided as example.
   To run Cypress for end-to-end testing (**the project must be run before in parallel**) :
   ` npm run test:e2e `


4. Cypress will be launched and the Cypress interface will automatically appear in a window :

   - Select `E2E Testing`
   - Choose your favorite browser
   - Then click on the starting button `Start E2E Testing in ...`
   - The new interface will open on the selected browser, and you can select the test to run in
     the `Specs` section. You should see a `app.spec.cy.ts` file.
   - If you click on the spec, the e2e test will start.


5. The different folders and their utilities :
   - You can write your future tests inside `/cypress/e2e/` folder, in the same file as the example test `app.spec.cy.ts`,
   or simply create another test files `test-name.spec.cy.ts`. You can also find the different Cypress commands on the official [documentation](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Cypress-Can-Be-Simple-Sometimes).
   Don't forget to follow the given tips and best practices in the further section.
   - Inside `/cypress/support/` folder, this will contain every written Cypress commands (we will talk about this later).
   - Inside `/cypress/fixtures/` folder, this will contain the different configuration files in order to mock your data for example (normally not used in this Code Kata).

## Exercice

As exercice, you can implement these different e2e tests :

1) Verify that if there is no user profile, the profile section does not appear on the top-left corner of the main pages.


2) Go to the profile creation page, then verify that if a required information is missing, it is not possible to validate
   the form. But if every required information is filled, it is possible to validate and a success message should appear.
   Consequently, the user information previously filled should appear on profile section (on the top-left corner of the main pages in every step).
   You also have to check that if you modify the information in the form and if you re-validate, it should change the displayed information on the profile
   section.


3) Check that the profile section and the profile page access button are displayed on every main pages (in every step).
   You also have to check that if we access to the profile creation page with the access button, the "go back app" button should
   redirect the user in the exactly same step.


4) Go to the starting page, start the process, follow the different steps by choosing the preferred option, then check that
   the options displayed on the wheel are linked to the selected options in terms of the PRICE ONLY (you can directly check in the application code to know
   the expected restaurants names following to the selected price option). Then, you have to check that the chosen restaurant (after
   the wheel has finished turning) matches the restaurant described in the result page (last step).

## Tips and best practices

1) Here is some basic examples about how to write a Cypress test :
    ```typescript
    describe('My different specs', () => {
      it('Example 1', () => {
        cy.visit('http://localhost:4200');
        cy.contains('Ça part en prod!!!').click();
        cy.contains('Vegan').click();
        cy.contains('Junk Food').click();
        cy.contains('ALL').click();
        cy.contains('GO').click();
        cy.wait(5000);
      });
    
      it('Example 2', () => {
        cy.visit('http://localhost:4200');
        cy.get('[data-cy="changeProfile"]').click();
        cy.get('[data-cy="inputName"]').type('Léopold');
        cy.get('[data-cy="inputAge"]').type('25');
        cy.get('[data-cy="inputProfilePic"]').should('exist');
        cy.get('[data-cy="inputCheck"]').click();
        cy.get('[data-cy="formValid"]').click();
        cy.wait(5000);
      });
    });
    ```

    Note : Both examples are NOT equivalent.

    In `Example 1`, you can see that we base on the content text to select the different interactive elements (buttons in our case).
    We could also base on the HTML/CSS element ID, or element class. But in these cases, if the specs change, it will be required to
    update not only the code, but also every impacted Cypress tests that we wrote.
    To avoid that, one of the best practices is to systematically add an HTML tag (for example `data-cy`) :
    ```html
    <button
      id="main"
      class="btn btn-large"
      name="submission"
      role="button"
      data-cy="my-data-cy-custom-tag-name"
    >
      My button
    </button>
    ```
    By doing this, we no longer depend neither on the specs nor on the structural aspect of the written code since
    the `data-cy` tag name (`my-data-cy-custom-tag-name`) won't be modified. The tag will only be potentially moved.
    After doing this, in the Cypress test, you will be able to easily select the element like the `Example 2` (and so, 
    without thinking about future code modifications).


2) Factorize your Cypress tests.

   As we saw, Cypress allows you to write fluid syntax style code by chaining the different provided commands.
   However, you can also create your custom commands. This might be very useful to factorize your code, when a repetitive
   chainable actions is used (for example, the login authentification action before launching any e2e test).
   To add a custom command, inside `/cypress/support/commands.ts` file, there is a quick tutorial generated by Cypress in comments.
   But it is done like that :
   ```typescript
   Cypress.Commands.add('myCommandName', (arg1, arg2) => {
     // Cypress code to be factorized
   });
   ```
   And you also have to declare the added command inside the `/cypress/support/index.d.ts` to enable the autocompletion (since we are using Typescript) :
   ```typescript
   declare namespace Cypress {
     interface Chainable<Subject = any> {
       myCommandName: (arg1, arg2) => Chainable<any>;
       // the other commands declared here
     }
   }
   ```
   
3) Your Cypress tests should not depend on each other (like unit tests).


4) You should avoid using `afterEach` or `afterAll` hooks to clean up the data, because your Cypress test can fail and
consequently not clean the mocked data (required for the test) as expected.


5) To deal with asynchronous events (like HTTP queries etc.), you can use `cy.wait()` to wait
an arbitrary period of time.

## See more

Here you can check this beautiful [Cypress article](https://www.youtube.com/watch?v=dQw4w9WgXcQ) made by Léopold Bancal and Antoine Meirhaeghe.
