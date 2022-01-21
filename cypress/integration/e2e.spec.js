/// <reference types="cypress" />
import EnderecoPage from '../support/page_objects/endereco.page';
const dadosEndereco = require('../fixtures/enderecos.json')
var faker = require('faker');
faker.locale = 'pt_BR';


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos/')
    });
    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {       
        let nomeFaker = faker.name.firstName()
        let sobrenomeFaker = faker.name.lastName()
        let empresaFaker = faker.company.companyName()
        let emailFaker = faker.internet.email(nomeFaker)
        let telFaker = faker.phone.phoneNumber()
        let ruaFaker = faker.address.streetName()
        let numeroFaker = faker.datatype.number()
        let cidadeFaker = faker.address.city()
        let estadoFaker = faker.address.state()
        let cepFaker = faker.address.zipCode()
        
        //adicionando 4 produtos ao carrinho de páginas diferentes
        cy.addProduto('Argus All-Weather Tank', 'M', 'Gray', 1)
        cy.get(':nth-child(2) > .page-numbers').click()
        cy.addProduto('Bruno Compete Hoodie', 'L', 'Blue', 1)
        cy.get(':nth-child(3) > .page-numbers').click()
        cy.addProduto('Cronus Yoga Pant', '33', 'Black', 1)
        cy.get('ul.page-numbers > :nth-child(4) > .page-numbers').click()
        cy.addProduto('Hawkeye Yoga Short', '36', 'Gray', 1)
        //checkout preenchendo dados com faker
        cy.checkoutProduto()
        EnderecoPage.editarEnderecoFaturamento(
            nomeFaker, 
            sobrenomeFaker, 
            empresaFaker, 
            'Brasil', 
            ruaFaker, 
            numeroFaker, 
            cidadeFaker, 
            estadoFaker, 
            cepFaker, 
            telFaker, 
            emailFaker)
            cy.get('#terms').check()
            cy.get('#place_order').click()
            cy.get('.woocommerce-notice').should('contain','Obrigado. Seu pedido foi recebido.')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta - usando arquivo de dados', () => {               
        //adicionando 4 produtos ao carrinho de páginas diferentes
        cy.addProduto('Argus All-Weather Tank', 'M', 'Gray', 1)
        cy.get(':nth-child(2) > .page-numbers').click()
        cy.addProduto('Bruno Compete Hoodie', 'L', 'Blue', 1)
        cy.get(':nth-child(3) > .page-numbers').click()
        cy.addProduto('Cronus Yoga Pant', '33', 'Black', 1) 
        cy.get('ul.page-numbers > :nth-child(4) > .page-numbers').click()
        cy.addProduto('Hawkeye Yoga Short', '36', 'Gray', 1)
        //checkout preenchendo dados com arquivo de dados
        cy.checkoutProduto()
        EnderecoPage.editarEnderecoFaturamento(
            dadosEndereco[1].nome,
            dadosEndereco[1].sobrenome,
            dadosEndereco[1].empresa,
            dadosEndereco[1].pais,
            dadosEndereco[1].endereco,
            dadosEndereco[1].numero,
            dadosEndereco[1].cidade,
            dadosEndereco[1].estado,
            dadosEndereco[1].cep,
            dadosEndereco[1].telefone,
            dadosEndereco[1].email)
            cy.get('#terms').check()
            cy.get('#place_order').click()
            cy.get('.woocommerce-notice').should('contain','Obrigado. Seu pedido foi recebido.')
    });
})