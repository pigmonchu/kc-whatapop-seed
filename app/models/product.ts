import { Category } from "./category";
import { User } from "./user";

export class Product {

    constructor(
        public id: number,
        public name: string,
        public description: string,
        public category: Category,
        public seller: User,
        public publishedDate: number,
        public state: string,
        public price: number,
        public likes: number,
        public photos: string[]) { }

    static fromJson(json: any): Product {
        return new Product(
            +json.id,
            json.name,
            json.description,
            Category.fromJson(json.category),
            User.fromJson(json.seller),
            +json.publishedDate,
            json.state,
            +json.price,
            +json.likes,
            json.photos
        );
    }

    static fromJsonToList(json: any[]): Product[] {
        return json.reduce((products: Product[], product: any) => {
            products.push(Product.fromJson(product));
            return products;
        }, []);
    }
}
