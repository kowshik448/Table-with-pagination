/// <reference types="cypress" />


describe("test whole TableComponent" , ()=>{

    beforeEach(() => {
        cy.visit("http://localhost:3000/")
    })

    // display table on searching 
    it("should display table when search input is given", () => {
        cy.get("input[type='text']").type("as")
        cy.get(".tableHeader")
    })

    // sorting the table 
    it("should sort table when clicked on headers", () => {
        cy.contains("arrow_drop_down").should("be.visible")
        cy.get("th.head-title").contains("City").click()
        cy.contains("arrow_drop_up").should("be.visible")
    })

    // showing side panel onclicking each row
    it("should display side panel when clicked on any table row",()=>{
        cy.get("[class='tableRow active'][id='1']").click()
        cy.get("[class='tableRow inactive']").should("be.visible")
        //when clicked on close btn , side panel should close 
        cy.contains("span","close").click()
        cy.get("[class='tableRow active']").should("be.visible")
    })

})