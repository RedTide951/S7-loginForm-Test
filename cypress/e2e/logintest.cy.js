describe("Login Form Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5174/");
    cy.get("body").then(($body) => {
      cy.log($body.html());
    });
  });

  context("a) Başarılı form doldurulduğunda submit edebiliyorum", () => {
    it("success testleri", () => {
      cy.get('input[name="email"]').type("valid@example.com");
      cy.get('input[name="password"]').type("Password1!");
      cy.get('input[name="terms"]').check();
      cy.get("button").contains("Login").should("not.be.disabled");
      cy.get("button").contains("Login").click();
      cy.url().should("include", "/Success");
    });
  });

  context(
    "b) Hatalı durumlarda beklenen hata mesajları görünüyor ve buton disabled kalıyor",
    () => {
      it("Email yanlis", () => {
        cy.get('input[name="email"]').type("invalid-email");
        cy.get('[data-testid="email-error-text"]').should("be.visible");
        cy.get('[data-testid="login-button"]').should("be.disabled");
      });

      it("Email ve Parola Yanlis", () => {
        cy.get('input[name="email"]').type("invalid-email");
        cy.get('input[name="password"]').type("123");
        cy.get('[data-testid="email-error-text"]').should("be.visible");
        cy.get('[data-testid="password-error-text"]').should("be.visible");
        cy.get('[data-testid="login-button"]').should("be.disabled");
      });

      it("Email ve Parola dogru, sartlar kabul edilmemis", () => {
        cy.get('input[name="email"]').type("valid@example.com");
        cy.get('input[name="password"]').type("Password1!");
        cy.get('[data-testid="email-error-text"]').should("not.exist");
        cy.get('[data-testid="password-error-text"]').should("not.exist");
        cy.get('[data-testid="login-button"]').should("be.disabled");
      });
    }
  );
});

/* cy.get('input[name="email"]').type("invalid-email");
      cy.get('[data-testid="email-error-text"]').should("be.visible");
      cy.get('[data-testid="password-error-text"]').should("be.visible");
      cy.get('[data-testid="terms-error-text"]').should("be.visible");
      cy.get('[data-testid="login-button"]').should("be.disabled"); 
      pass test delete this line
      */
