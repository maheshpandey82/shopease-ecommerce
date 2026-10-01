import {configureStore,createSlice} from "@reduxjs/toolkit";
const saved=JSON.parse(localStorage.getItem("shopease-cart")||"[]");
const slice=createSlice({name:"cart",initialState:{items:saved},reducers:{
addToCart:(s,a)=>{const x=s.items.find(i=>i.id===a.payload.id);if(x)x.quantity++;else s.items.push({...a.payload,quantity:1});localStorage.setItem("shopease-cart",JSON.stringify(s.items));},
increase:(s,a)=>{const x=s.items.find(i=>i.id===a.payload);if(x)x.quantity++;localStorage.setItem("shopease-cart",JSON.stringify(s.items));},
decrease:(s,a)=>{const x=s.items.find(i=>i.id===a.payload);if(x&&x.quantity>1)x.quantity--;else s.items=s.items.filter(i=>i.id!==a.payload);localStorage.setItem("shopease-cart",JSON.stringify(s.items));},
removeFromCart:(s,a)=>{s.items=s.items.filter(i=>i.id!==a.payload);localStorage.setItem("shopease-cart",JSON.stringify(s.items));},
clearCart:s=>{s.items=[];localStorage.removeItem("shopease-cart")}
}});
export const {addToCart,increase,decrease,removeFromCart,clearCart}=slice.actions;
export const store=configureStore({reducer:{cart:slice.reducer}});