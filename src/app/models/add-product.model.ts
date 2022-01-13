/* Model used for the Add product page */
export interface IAddProductObject {
    /* Name of the product */
    name: string;
    /* categoryId of the product. Foreign key in the backend / database */
    categoryId: number;
    /* Catalog number of the product. This number determines the list-order if catalog-sorting is selected */
    catalogNumber: number;
    /* Location of the product. Ex: Top shelf 2A */
    location: string;
    /* Description of the product */
    description: string;
    /* All images of the product (does not include note images) */
    images: Array<string>;
    /* Boolean to check if approval (action by the lender) is required before finalising the reservation. */
    pdfs: Array<string>;
    requiresApproval: boolean;
    /* the PDF of the product*/
    // pdf: Array<string>;
}
