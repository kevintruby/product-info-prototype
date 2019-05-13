// model definition
import { Product } from '@/models/Product';

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
        images:       _.get(api_result_obj, `${variant}.images`, []),
        attributes:   _.get(api_result_obj, `${variant}.attributes`, []),
      };

  // @todo: consider standardizing structure of how images and attributes may come back?

  return new Product(instance_payload);
};
