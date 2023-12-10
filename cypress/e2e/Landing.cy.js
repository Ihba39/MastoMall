describe("Landing Page Tests",function(){

  it('Visit the URL',function(){
      cy.visit('https://mastomall-shreyawatve11011-gmailcom-shreyas-projects-47fea19f.vercel.app/');
  });

  it('Click on Login/Signup',function(){
    cy.visit('https://mastomall-shreyawatve11011-gmailcom-shreyas-projects-47fea19f.vercel.app/');
    cy.get('.navbar-primary-button').click();
    cy.get('.login-section').should('be.visible');
  });

});