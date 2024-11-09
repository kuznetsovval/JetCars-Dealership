describe('Registration Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/registration');
    });

    it('should successfully register a user', () => {
        const name = 'Ігор';
        const email = 'ihor.ihor@gmail.com';
        const password = 'abc123@#$'

        cy.get('input[placeholder="Введіть ім\'я"]').type(name);
        cy.get('input[placeholder="Введіть електронну адресу"]').type(email);
        cy.get('input[placeholder="Введіть пароль"]').type(password);

        cy.get('button').contains('Зареєструватися').click();

        cy.url().should('include', '/market');
    });

    it('should show an alert if fields are empty', () => {
        cy.get('button').contains('Зареєструватися').click();

        cy.on('window:alert', (txt) => {
            expect(txt).to.contains('Будь ласка, введіть дані перед реєстрацією.');
        });
    });
});
