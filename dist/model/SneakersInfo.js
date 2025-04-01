"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("./Product"));
class SneakersInfo extends Product_1.default {
    constructor() {
        super(...arguments);
        this.colors = [];
        this.gender = "";
        this.sizes = [];
        this.releaseDate = "";
        this.promotions = [];
    }
    getColors() {
        return this.colors;
    }
    getGender() {
        return this.gender;
    }
    getReleaseDate() {
        return this.releaseDate;
    }
    getSizes() {
        return this.sizes;
    }
    getPromotions() {
        return this.promotions;
    }
    setColors(colors) {
        this.colors = colors;
    }
    setGender(gender) {
        this.gender = gender;
    }
    setReleaseDate(releaseDate) {
        this.releaseDate = releaseDate;
    }
    setSizes(sizes) {
        this.sizes = sizes;
    }
    addColor(color) {
        this.colors.push(color);
    }
    removeColor(color) {
        this.colors = this.colors.filter(c => c !== color);
    }
    addSize(size) {
        this.sizes.push(size);
    }
    removeSize(size) {
        this.sizes = this.sizes.filter(s => s !== size);
    }
    addPromotion(promotion) {
        this.promotions.push(promotion);
    }
    removePromotion(promotionId) {
        this.promotions = this.promotions.filter(promotion => promotion.getId() !== promotionId);
    }
}
exports.default = SneakersInfo;
