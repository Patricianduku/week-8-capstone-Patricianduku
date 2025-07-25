describe('Settings Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/settings');
  });

  it('loads the Settings page with core sections', () => {
    cy.contains('Settings').should('exist');
    cy.contains('Profile Settings').should('exist');
  });

  it('has a visible email input', () => {
    cy.get('input[type="email"]')
      .first()
      .should('be.visible')
      .clear()
      .type('test@example.com');
  });

  it('opens the Change Password modal and closes it', () => {
    cy.contains('Change Password').click();
    cy.contains('Change Password').should('exist');
    cy.contains('Cancel').click();
  });

  // it('checks if Admin Panel is visible conditionally', () => {
  //   cy.get('body').then($body => {
  //     if ($body.text().includes('Admin Panel')) {
  //       cy.contains('Admin Panel').should('exist');
  //     } else {
  //       cy.contains('Admin Panel').should('not.exist');
  //     }
  //   });
  // });
});
