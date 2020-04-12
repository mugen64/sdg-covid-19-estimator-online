import { mount, createLocalVue } from '@vue/test-utils';
import Componet from '../Calculator.vue';
import SampleData from '~/data';
const localVue = createLocalVue();
describe('Calculator UI', () => {
  let wrapper;
  beforeEach(() => {
    // const parent = mount({
    //   data: {
    //     estimate :
    //   }
    // })
    wrapper = mount(Componet, {
      localVue,
      propsData: {
        value: { data: SampleData[0] }
      }
    });
  });
  it(
    'should have input fields with data attributes' +
      ' data-population, data-time-to-elapse, data-reported-cases,data-total-hospital-bed,' +
      ' a select field data-period-type and button data-goestimate',
    () => {
      // given the calculator UI
      // we should expect to find the following input fields
      expect(wrapper.find('input[data-population]').exists()).toBe(true);
      expect(wrapper.find('input[data-time-to-elapse]').exists()).toBe(true);
      expect(wrapper.find('input[data-reported-cases]').exists()).toBe(true);
      expect(wrapper.find('input[data-total-hospital-beds]').exists()).toBe(
        true
      );
      expect(wrapper.find('select[data-period-type]').exists()).toBe(true);
      expect(wrapper.find('button[data-goestimate]').exists()).toBe(true);
    }
  );
});
