import { combineReducers } from 'redux';
import notes from './notes';
import editor from './editor';
import tasks from './tasks';
import labels from './labels';
import style from './style';
import filters from './filters';

const dynaApp = combineReducers({
  notes,
  editor,
  labels,
  style,
  tasks,
  filters,
});
export default dynaApp;