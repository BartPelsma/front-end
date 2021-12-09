import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { IAddCategoryObject } from '../models/add-category.model';
import { IAddProductImage } from '../models/add-product-image.model';
import { ICategory } from '../models/category.model';
import { IUpdateProductObject } from '../models/update-product.model';

@Component({
  selector: 'app-edit-inventory-page',
  templateUrl: './app-edit-inventory-page.component.html',
  styleUrls: ['./app-edit-inventory-page.component.scss']
})
export class AppEditInventoryPageComponent implements OnInit {
  /* Contains the value for the succes of retrieving the categories */
  succesfullCategoriesBool = false;
  /* Contains the value for the new category field */
  newCategory: IAddCategoryObject = {} as IAddCategoryObject;
  /* Contains the boolean value if a new category should be created  */
  addNewCategory = false;
  /* Contains the values for the new product. */
  product: IUpdateProductObject = {} as IUpdateProductObject;
  /* Contains all (temp) image objects  */
  images: Array<IAddProductImage> = [];
  /* Selected index of the image carousel. */
  selectedImageIndex = 0;
  /* Selected image that has to be removed. Is null when confirm is not active. */
  removingImageIndex: number | null = null;
  /* All categories received from the backend */
  categories: Array<ICategory> | null = null;
  /* Contains last catalog number plus 1 */
  maxCatalogNumber = 0;
  /*
    Contains loading state.
    Disables all form inputs/buttons when true. Loading spinner is visible when true
  */
  isLoading = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService,
    private snackbarService: MatSnackBar,
    private apiService: ApiService,
    private router: Router,
    private dialogRef: MatDialogRef<AppEditInventoryPageComponent>
  ) { }

  /*
    Initialise categories and catalog numbers when page starts loading
    See https://angular.io/guide/lifecycle-hooks for more information
  */
  ngOnInit(): void {
    this.initialisePage();
  }

  /*
    Initialise page
  */
  initialisePage(): void {
    this.images = [];

    this.addNewCategory = false;

    this.product = {
      id: this.data.id,
      categoryId: this.data.categoryId,
      catalogNumber: this.data.catalogNumber,
      description: this.data.description,
      images: this.data.images,
      location: this.data.location,
      name: this.data.name,
      requiresApproval: this.data.requiresApproval
    };

    this.apiService.getAllCategories().subscribe({
      next: (resp) => {
        this.categories = resp.body;
      },
      error: (err) => {
        this.showErrorNotification('PRODUCT.UPDATE.NO_CATEGORIES_RESPONSE');
      }
    });

    this.apiService.getLastCatalogNumber().subscribe({
      next: (resp) => {
        this.maxCatalogNumber = (resp.body as number) + 1;
        this.product.catalogNumber = (resp.body as number) + 1;
      },
      error: (err) => {
        this.showErrorNotification('PRODUCT.UPDATE.NO_CATALOG_NUMBER_RESPONSE');
      }
    });

    this.onChangeSelectedImageIndex();
  }

  /*
    Handles the functionality when the new category gets selected
  */
  onChange(event: any): void {
    this.addNewCategory = event.source.selected;
  }

  /*
    Handles saving the category and resetting the page to get the new category
  */
  onClickSaveCategory(): void {
    if (this.newCategory.name) {
      this.apiService.addCategory(this.newCategory).subscribe({
        next: (resp) => {
          this.isLoading = false;
          this.snackbarService.open(this.translate.instant('CATEGORY.UPDATE.UPDATE_CATEGORY_SUCCESFUL'), undefined, {
            panelClass: 'success-snack',
            duration: 2500
          });
          this.getAllCategories();
          this.product.categoryId = resp.body;
          this.addNewCategory = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.showErrorNotification(err.error);
        }
      });
    }
    else {
      this.snackbarService.open(this.translate.instant('CATEGORY.UPDATE.UPDATE_CATEGORY_UNSUCCESFUL'), undefined, {
        panelClass: 'error-snack',
        duration: 2500
      });
    }
  }

  /*
    Gets all categories
  */
  getAllCategories(): void {
    this.apiService.getAllCategories().subscribe({
      next: (resp) => {
        this.categories = resp.body;
      },
      error: (err) => {
        this.showErrorNotification('PRODUCT.UPDATE.NO_CATEGORIES_RESPONSE');
      }
    });

  }

  /*
    Handles the functionality when the 'previous image' button is clicked.
    Roll over to last image when on first image, and previous is clicked.
  */
  onClickPreviousImage(): void {
    if (this.images === null || this.images.length < 1) {
      this.selectedImageIndex = 0;
      this.onChangeSelectedImageIndex();
      return;
    }

    if (this.selectedImageIndex === 1) {
      this.selectedImageIndex = this.images.length;
      this.onChangeSelectedImageIndex();
      return;
    }
    this.selectedImageIndex--;
    this.onChangeSelectedImageIndex();
  }

  /*
    Handles the functionality when the 'next image' button is clicked.
    Roll over to first image when on last image, and next is clicked.
  */
  onClickNextImage(): void {
    if (this.images === null || this.images.length < 1) {
      this.selectedImageIndex = 0;
      return;
    }

    if (this.selectedImageIndex === this.images.length) {
      this.selectedImageIndex = 1;
      this.onChangeSelectedImageIndex();
      return;
    }
    this.selectedImageIndex++;
    this.onChangeSelectedImageIndex();
  }

  /*
    Set the image source to the correct image. Use default image when unable to retreive image
  */
  onChangeSelectedImageIndex(): void {
    const element = document.getElementById('imagePreview') as HTMLImageElement;

    if (this.images === null || this.images.length < 1) {
      element.src = '/assets/images/no_image_found.png';
      this.selectedImageIndex = 0;
      return;
    }

    element.src = this.images[this.selectedImageIndex - 1].base64;
  }

  /*
    The Add image is a wrapper around the real file input because the real input is not style-able.
    When clicked, fake a click on the real fileInput
  */
  onClickAddImage(): void {
    const element = document.getElementById('fileInput') as HTMLElement;
    element.click();
  }

  /*
    Remove image when confirm is clicked
  */
  onConfirmRemoveImage(): void {
    if (this.removingImageIndex === null || this.removingImageIndex < 0) {
      return;
    }
    this.images.splice(this.removingImageIndex, 1);
    this.removingImageIndex = null;
    this.onClickPreviousImage();
  }

  /*
    Handle file changes. Loop through all added files and convert them to IAddProductImages.
    Compare base64 strings to block duplicate images.
  */
  async onFileChanged(event: Event): Promise<void> {
    const element = document.getElementById('fileInput') as HTMLInputElement;
    if (element.files == null) {
      return;
    }

    for (let i = 0; i < element.files?.length; i++) {
      const newImage: IAddProductImage = {
        base64: await this.imageToBase64(element.files.item(i)).then(x => x) as string,
        file: element.files.item(i) as File
      };

      if (!this.checkIfImage(newImage.file)) {
        continue;
      }

      if (this.images.findIndex(x => x.base64 === newImage.base64) > -1) {
        continue;
      }

      this.images.push(newImage);
    }
    this.selectedImageIndex = this.images.length;
    this.onChangeSelectedImageIndex();
  }

  /*
    Checks all product values. Shows error if incorrect or saves data if correct.
  */
  onClickUpdateProduct(){
    if (this.product.name == null || this.product.name.trim() === '') {
      this.showErrorNotification('PRODUCT.UPDATE.NO_NAME');
      return;
    }

    if (this.product.catalogNumber == null || this.product.catalogNumber < 0 || this.product.catalogNumber > this.maxCatalogNumber) {
      this.showErrorNotification('PRODUCT.UPDATE.CATALOG_NUMBER_INCORRECT');
      return;
    }

    if (this.product.categoryId < 1) {
      this.showErrorNotification('PRODUCT.UPDATE.NO_CATEGORY');
      return;
    }

    if (this.product.description == null || this.product.description.trim() === '') {
      this.showErrorNotification('PRODUCT.UPDATE.NO_DESCRIPTION');
      return;
    }

    this.isLoading = true;

    this.product.images = this.images.map(x => x.base64);

    this.apiService.updateProduct(this.product).subscribe({
      next: (resp) => {
        this.isLoading = false;
        this.snackbarService.open(this.translate.instant('PRODUCT.EDIT.UPDATE_SUCCESSFUL'), undefined, {
          panelClass: 'success-snack',
          duration: 2500
        });
        this.initialisePage();
      },
      error: (err) => {
        this.isLoading = false;
        this.showErrorNotification(err.error);
      }
    });
    this.ngOnInit();
  }

  /*
    Return base64 string of the given file
  */
  private imageToBase64(image: File | null): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image as File);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  /*
    Show error notification

    @param translateableMessage: string
    String that has to be presented in the error notification (gets translated)
  */
  private showErrorNotification(translateableMessage: string): void {
    this.snackbarService.open(this.translate.instant(translateableMessage), undefined, {
      panelClass: 'error-snack',
      duration: 2500
    });
  }

  /*
    Check if submitted file is an image. Note; this is just a 'client side' guess.
    Real checks need to be done on the server side.
  */
  private checkIfImage(file: File): boolean {
    return file.type.match(/image-*/) !== null;
  }
}