// lodash helpers -- using destructuring for webpack tree-shaking
import { get } from 'lodash';
const _ = { get };

// API results look complicated; should use a factory to generate instances aligned to class properties
export class Product {
  constructor (product_obj) {
    this.id = _.get(product_obj, 'id', '');
    this.name = _.get(product_obj, 'name', 'N/A');
    this.description = _.get(product_obj, 'description', 'N/A');
    this.images = _.get(product_obj, 'images', []);
    this.attributes = _.get(product_obj, 'attributes', []);

    // cost info primarily looks related to how many cents, i.e. 100 == $1.00; should update if more variants found
    this.cent_amount = _.get(product_obj, 'cent_amount', 0);
  }
}
