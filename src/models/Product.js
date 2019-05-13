// lodash helpers -- using destructuring for webpack tree-shaking
import { get } from 'lodash';
const _ = { get };

// need to figure out where to put this
const organic_badge_url = 'https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/5e85d71501308335-L2AE6hCf-thumb.jpg';

// API results look complicated; using a factory to generate instances aligned to class properties
export class Product {
  badges = {
    organic: { badge_url: organic_badge_url },
  };
  constructor (product_obj) {
    this.id = _.get(product_obj, 'id', '');
    this.name = _.get(product_obj, 'name', 'N/A');
    this.description = _.get(product_obj, 'description', 'N/A');
    this.images = _.get(product_obj, 'images', []);
    this.attributes = _.get(product_obj, 'attributes', []);

    // cost info primarily looks related to how many cents, i.e. 100 == $1.00; should update if more variants found
    this.cent_amount = _.get(product_obj, 'cent_amount', 0);
  }

  get detail_img_url () {
    const provideFallback = () => {
      let default_img = new ProductImage();
      return default_img.detail_fallback;
    };

    // sanity check on data type
    if (!this.images || this.images.constructor !== Array || !this.images.length)
      return provideFallback();

    // consider trying if the object only has one image
    if (this.images.length === 1) {
      let img_obj = this.images[0];
      return (!img_obj || img_obj.constructor !== ProductImage || !img_obj.url.length) ? provideFallback() : img_obj.url;
    }

    let img_obj = this.images[1];
    if (!img_obj || img_obj.constructor !== ProductImage || !img_obj.url.length)
      return provideFallback();

    // try thumbnail as an alternative
    if (img_obj.url === img_obj.detail_fallback) {
      let thumbnail_img = this.thumbnail_img_url;
      if (thumbnail_img !== img_obj.thumbnail_fallback)
        return thumbnail_img;
    }

    return img_obj.url;
  }

  get is_organic () {
    if (!this.attributes || this.attributes.constructor !== Array)
      return false;

    let matching_index = this.attributes.findIndex(attr_obj => {
      // sanity check on data type
      if (!attr_obj || attr_obj.constructor !== ProductAttribute)
        return false;

      return attr_obj.name.toLowerCase() === 'organic' && attr_obj.value === true
    });

    return matching_index > -1;
  }

  get price () {
    // sanity check on data type
    if (!this.cent_amount || this.cent_amount.constructor !== Number || this.cent_amount === 0)
      return 'N/A';

    let dollar_amount = Number(this.cent_amount / 100);
    return `$${dollar_amount.toFixed(2)}`;
  }

  get thumbnail_img_url () {
    const provideFallback = () => {
      let default_img = new ProductImage();
      return default_img.thumbnail_fallback;
    };

    // sanity check on data type
    if (!this.images || this.images.constructor !== Array || !this.images.length)
      return provideFallback();

    let img_obj = this.images[0];
    if (!img_obj || img_obj.constructor !== ProductImage || !img_obj.url.length)
      return provideFallback();

    return img_obj.url;
  }
}

export class ProductAttribute {
  constructor (attr_obj = {}) {
    this.name = _.get(attr_obj, 'name', '');
    this.value = _.get(attr_obj, 'value', null);
  }
}

export class ProductImage {
  detail_fallback = 'https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE.jpg';
  thumbnail_fallback = 'https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE-thumb.jpg';
  constructor (img_obj = {}) {
    this.dimensions = _.get(img_obj, 'dimensions', { w: 0, h: 0 });
    this.label = _.get(img_obj, 'label', '');
    this.url = _.get(img_obj, 'url', '');
  }
}
