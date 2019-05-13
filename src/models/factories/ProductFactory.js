// model definition
import { Product, ProductAttribute, ProductImage } from '@/models/Product';

// utility helpers -- using destructuring for webpack tree-shaking
import { get } from 'lodash';
const _ = { get };

export const ProductFromCollectionApi = api_result_obj => {
  // sanity check on data type
  if (!api_result_obj || api_result_obj.constructor !== Object)
    return;

  // parse the API results
  const current = 'masterData.current',
        variant = `${current}.masterVariant`;

  // if time permits, try to prototype a way of centralizing the field definitions here; not happy with
  let instance_payload = {
        id:           _.get(api_result_obj, 'id', ''),
        name:         _.get(api_result_obj, `${current}.name.en`, 'N/A'),
        description:  _.get(api_result_obj, `${current}.description.en`, 'N/A'),
        cent_amount:  _.get(api_result_obj, `${variant}.prices[0].value.centAmount`, 0),
        images:       [],
        attributes:   [],
      },
      images = _.get(api_result_obj, `${variant}.images`, []),
      attributes = _.get(api_result_obj, `${variant}.attributes`, []);

  if (images && images.constructor === Array)
    images.forEach(img_obj => instance_payload.images.push( new ProductImage(img_obj) ));

  if (attributes && attributes.constructor === Array)
    attributes.forEach(attr_obj => instance_payload.attributes.push( new ProductAttribute(attr_obj) ));

  return new Product(instance_payload);
};
