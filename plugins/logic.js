// Inject Logic Module into app
import { Estimator } from '~/logic';
// inject onto context and vue instance
export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  inject('Estimator', Estimator);
};
