import { ICategory } from './category.model';
import { ProductStatus } from './product-status.enum';

export interface ICatalogFlat {
    id: number;
    name: string;
    catalogNumber: number;
    description: string;
    requiresApproval: boolean;
    status: ProductStatus;
    images: Array<string>;
    pdfs: Array<string>;
    category: ICategory;
    imageIndex: number;
    endDate: Date | null;
    startDate: Date;
}
