import React from 'react';

let navigator;

export const setNavigator = (nav) => {
    navigator = nav;
};

export const Navigate = (routeName) => {
    navigator.push(routeName)
};