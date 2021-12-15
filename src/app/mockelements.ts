import { dfdelement } from './dfdElement';

export const mockelements: dfdelement[] = [
  { id: 11, type: 'store', label: 'Upload Database', height : 100, width : 100},
  { id: 12, type: 'store', label: 'Auth DB', height : 100, width : 100} ,
  { id: 13, type: 'flow' , label: 'Auth Req', height : 100, width : 100},
  { id: 14, type: 'flow', label: 'Upload File', height : 100, width : 100},
  { id: 15, type: 'entity', label: 'User', height : 100, width : 100},
  { id: 17, type: 'process' ,label: 'Fetch data', height : 100, width : 100},
  { id: 18, type: 'process' ,label: 'Auth process', height : 100, width : 100},
  { id: 19, type: 'flow' ,label: 'Auth Resp', height : 100, width : 100},
  { id: 20, type: 'flow' ,label: 'Download File', height : 100, width : 100}
];