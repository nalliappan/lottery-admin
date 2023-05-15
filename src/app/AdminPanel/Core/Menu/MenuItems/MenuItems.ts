import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'admin-panel/dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'poll'
  },
  {
    state: 'admin-panel',
    name: 'Lottery',
    type: 'sub',
    icon: 'card_giftcard',
    children: [
      {state: 'products', name: '3 Draw',type : 'link'},
      {state: 'products', name: '4 Draw',type : 'link'},
      {state: 'products', name: 'Special Raffle',type : 'link'},
      {state: 'product-add', name: 'Lucky Ball',type : 'link'}
    ]
  },
  {
    state: 'admin-panel',
    name: 'Deposits',
    type: 'sub',
    icon: 'account_balance_wallet',
    children: [
      {state: 'products', name: 'All Deposits',type : 'link'},
      {state: 'products', name: 'Pending',type : 'link'},
      {state: 'products', name: 'Approved',type : 'link'},
      {state: 'product-add', name: 'Successful',type : 'link'},
      {state: 'product-add', name: 'Rejected',type : 'link'}
    ]
  },
  {
    state: 'admin-panel',
    name: 'Withdrawals',
    type: 'sub',
    icon: 'local_atm',
    children: [
      {state: 'products', name: 'All Withdrawals',type : 'link'},
      {state: 'products', name: 'Pending',type : 'link'},
      {state: 'products', name: 'Approved',type : 'link'},
      {state: 'product-add', name: 'Successful',type : 'link'},
      {state: 'product-add', name: 'Rejected',type : 'link'}
    ]
  },
  {
    state: 'admin-panel/invoices',
    name: 'Users',
    type: 'link',
    icon: 'supervised_user_circle'
  },
  {
    state: 'admin-panel/invoices',
    name: 'Payment Gateway',
    type: 'link',
    icon: 'payment'
  },
  {
    state: 'admin-panel/dashboard',
    name: 'Reports',
    type: 'link',
    icon: 'poll'
  },
  {
    state: 'admin-panel/invoices',
    name: 'Content Management',
    type: 'link',
    icon: 'recent_actors'
  },
  {
    state: 'admin-panel/account/profile',
    name: 'Profile',
    type: 'link',
    icon: 'account_circle'
  },
  /*{
    state: '/home',
    name: 'Go To Site',
    type: 'link',
    icon: 'home'
  }*/
];

@Injectable()
export class AdminMenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
