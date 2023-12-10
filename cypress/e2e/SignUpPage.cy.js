describe("Sign Up Page Test",function(){

    it('Visit the URL',function(){
        cy.visit('https://mastomall-shreyawatve11011-gmailcom-shreyas-projects-47fea19f.vercel.app/Signup');
    });
  
    it('Click on Sign Up Link',function(){
      cy.visit('https://mastomall-shreyawatve11011-gmailcom-shreyas-projects-47fea19f.vercel.app/Login');
      cy.get('a.signup-link').click();
    });
  
  });