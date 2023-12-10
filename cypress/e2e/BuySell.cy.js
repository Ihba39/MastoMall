describe("BuySellPage Test",function(){

    it('Visit the URL',function(){
        cy.visit('https://mastomall-shreyawatve11011-gmailcom-shreyas-projects-47fea19f.vercel.app/Login');
    });
  
    it('Click on Login Button',function(){
      cy.visit('https://mastomall-shreyawatve11011-gmailcom-shreyas-projects-47fea19f.vercel.app/Login');
      cy.get('.login-button').click();
    });
  
  });