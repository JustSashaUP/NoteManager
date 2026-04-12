describe('Notes App - E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows the notes heading', () => {
    cy.get('[data-testid="notes-heading"]').should('be.visible');
  });

  it('can switch language to Ukrainian', () => {
    cy.get('[data-testid="lang-uk"]').click();
    cy.get('[data-testid="notes-heading"]').should('contain', 'Усі нотатки');
    cy.get('[data-testid="lang-en"]').click();
  });

  it('creates a new note', () => {
    cy.get('[data-testid="new-note-btn"]').click();
    cy.get('[data-testid="note-title-input"]').type('My E2E Test Note');
    cy.get('[data-testid="note-content-input"]').type('This note was created by Cypress.');
    cy.get('[data-testid="save-note-btn"]').click();
    cy.get('[data-testid="notes-grid"]').should('contain', 'My E2E Test Note');
    cy.get('[data-testid="toast"]').should('be.visible');
  });

  it('shows validation error when title is empty', () => {
    cy.get('[data-testid="new-note-btn"]').click();
    cy.get('[data-testid="save-note-btn"]').click();
    cy.contains('Title is required').should('be.visible');
  });

  it('edits an existing note', () => {
    // Create first
    cy.get('[data-testid="new-note-btn"]').click();
    cy.get('[data-testid="note-title-input"]').type('Note to Edit');
    cy.get('[data-testid="save-note-btn"]').click();

    // Edit it
    cy.get('[data-testid="note-card"]').first().trigger('mouseover');
    cy.get('[data-testid="edit-note-btn"]').first().click({ force: true });
    cy.get('[data-testid="note-title-input"]').clear().type('Edited Note Title');
    cy.get('[data-testid="save-note-btn"]').click();
    cy.get('[data-testid="notes-grid"]').should('contain', 'Edited Note Title');
  });

  it('deletes a note', () => {
    // Create first
    cy.get('[data-testid="new-note-btn"]').click();
    cy.get('[data-testid="note-title-input"]').type('Note to Delete');
    cy.get('[data-testid="save-note-btn"]').click();

    // Delete it
    cy.get('[data-testid="note-card"]').first().trigger('mouseover');
    cy.get('[data-testid="delete-note-btn"]').first().click({ force: true });
    cy.get('[data-testid="confirm-delete-btn"]').click();
    cy.get('[data-testid="notes-grid"]').should('not.contain', 'Note to Delete');
  });
});
