describe("Landing Page Tests",function(){

  it('Visit the URL',function(){
      cy.visit('https://mastodonmall.vercel.app/');
      
  });

  it('Click on Login/Signup',function(){
    cy.visit('https://mastodonmall.vercel.app/');
    cy.get('.navbar-primary-button').click();
    cy.get('.login-section').should('be.visible');
  });

  it('User Story 1: Allow user to login -> Click on Login Button',function(){
      cy.visit('https://mastodonmall.vercel.app/Login');
      cy.get('.login-button').click();
  })

  it('User Story 2: Allow User to Sign Up -> Sign Up Link takes user to Register Form',function(){
    cy.visit('https://mastodonmall.vercel.app/Login');
    cy.get('a.signup-link').click();
    cy.get('.login-form').should('be.visible');
  });

  it('User Story 3: Allow Seller to mark Transaction as complete',function(){
    cy.visit('https://mastodonmall.vercel.app/your-products');
    cy.get('.card').should('exist');
    cy.get('.button').click({ multiple: true });
  });

});