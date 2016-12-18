import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { ConfirmationService } from "primeng/primeng";

import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";

@Component({
    templateUrl: "./app/components/product-detail/product-detail.component.html",
    styleUrls: ["./app/components/product-detail/product-detail.component.css"]
})
export class ProductDetailComponent implements OnDestroy, OnInit {

    private _product: Product;
    private _buySuscription: Subscription;
    private _likeSuscription: Subscription;
    private _swStorage: boolean;
    private _likes: any;

    constructor(
        private _productService: ProductService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _confirmationService: ConfirmationService
        )  { }

    ngOnInit(): void {
        this._route.data.forEach((data: { product: Product }) => this._product = data.product);
        window.scrollTo(0, 0);
        this._swStorage = (typeof(Storage) !== "undefined");
        if (this._swStorage) {
            this._likes = localStorage.getItem("whatapop.likes") ? JSON.parse(localStorage.getItem("whatapop.likes")): {};
            if (this.meGusta() && this._product.likes === 0) {
                this._likes[this._product.id] = false;
            }
        }
    }

    ngOnDestroy(): void {
        if (this._swStorage) {
            localStorage.setItem("whatapop.likes", JSON.stringify(this._likes));
        }

        if (this._buySuscription !== undefined) {
            this._buySuscription.unsubscribe();
        }

        if (this._likeSuscription !== undefined) {
            this._likeSuscription.unsubscribe();
        }
    }

    private _buyProduct(): void {
        this._buySuscription = this._productService
                                        .buyProduct(this._product.id)
                                        .subscribe(() => this._showPurchaseConfirmation())
    }

    private _showPurchaseConfirmation(): void {
        this._confirmationService.confirm({
            rejectVisible: false,
            message: "Producto comprado. ¡Enhorabuena!",
            accept: () => this._router.navigate(["/product"])
        });
    }
    
    getImageSrc(): string {
        return this._product && this._product.photos.length > 0 ? this._product.photos[0] : "";
    }

    showPurchaseWarning(): void {
        this._confirmationService.confirm({
            message: `Vas a comprar ${this._product.name}. ¿Estás seguro?`,
            accept: () => this._buyProduct()
        });
    }

    goBack(): void {
        window.history.back();
    }

    addLike(): void {
        if (!this._swStorage) {
            return;
        }

        if (!this.meGusta()) {
            
            this._likeSuscription = this._productService
                                        .likeProduct(this._product.id, this._product.likes+1)
                                        .subscribe();
            this._likes[this._product.id] = true;
        }

    }

    meGusta(): boolean {
        if (this._swStorage) {
            return this._likes[this._product.id];
        } else {
            return false;
        }
    }
}
