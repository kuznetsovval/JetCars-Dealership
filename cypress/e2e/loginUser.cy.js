describe('User Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should successfully log in with valid credentials', () => {
        cy.get('input[placeholder="Введіть ім\'я"]').type('Valentyn');
        cy.get('input[placeholder="Введіть електронну адресу"]').type('kuznecovvalentin1@gmail.com');
        cy.get('input[placeholder="Введіть пароль"]').type('123456');

        cy.contains('Увійти').click();

        cy.url().should('include', '/market');
    });

    it('should show an error with invalid credentials', () => {
        cy.get('input[placeholder="Введіть ім\'я"]').type('invalidName');
        cy.get('input[placeholder="Введіть електронну адресу"]').type('invalid@example.com');
        cy.get('input[placeholder="Введіть пароль"]').type('invalidPassword');

        cy.contains('Увійти').click();

        cy.on('window:alert', (str) => {
            expect(str).to.equal("Ім'я користувача або пароль неправильні. Спробуйте ще раз.");
        });
    });
});
