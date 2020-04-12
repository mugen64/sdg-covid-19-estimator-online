import Vue from 'vue';
import Spacer from '~/components/Spacer';
import { thousandSeparator } from '~/filters/thousandSeperator';

// filters
Vue.filter('seperator', thousandSeparator);

// register components
Vue.component('spacer', Spacer);
