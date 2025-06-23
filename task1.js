// navBar
const navBar = document.querySelector('nav');
const hambButton = document.querySelector('#hambBtn');
const navMenu = document.querySelector('.navMenu');
const navLinks = document.querySelectorAll('nav a:not(#cartIcon)');

navBar.addEventListener('click', (e) => {
    if (e.target == hambButton || Array.from(navLinks).includes(e.target)) {
        navMenu.classList.toggle('active');
    }
});
// menuSection
const menuSection = document.querySelector('#menu');
const menuList = document.querySelectorAll('#menu h3');
let carts = [];

menuSection.addEventListener('click', (e) => {
    if (Array.from(menuList).includes(e.target)) {
        e.target.classList.toggle('show');
        menuSection.classList.toggle('space');
        const ul = e.target.nextElementSibling;
        ul.classList.toggle('show');
        
        menuList.forEach(h3 => {
            if (h3 != e.target) {
                h3.classList.remove('show');
                menuSection.classList.toggle('space');
                h3.nextElementSibling.classList.remove('show');
            }
        });
    }
    // addToCart
    else if(e.target.className == 'addToCart'){
        // creating cart
        const li = e.target.parentElement.parentElement.parentElement.parentElement.cloneNode(true);
        li.querySelector('button').innerHTML = `<a href="https://www.google.com/" target="blank">Check Out</a>`;
        // appending additional btns
        appendBtns(li);
        // conditional rendering
        addCart(li);
        renderCarts();   
    }
});
// cartSection
const cartSection = document.querySelector('#cart ul');

const appendBtns = (li)=>{
    const btns = document.createElement('div');
    btns.classList.add('btns');
    
    const remove = document.createElement('button');
    const increase = document.createElement('button');
    const count = document.createElement('span');
    const decrease = document.createElement('button');
    
    remove.classList.add('remove');
    remove.textContent = 'Remove';
    increase.classList.add('increase');
    increase.textContent = '+';
    count.className = 'count';
    count.textContent = `1`;
    decrease.classList.add('decrease');
    decrease.textContent = '-';

    btns.appendChild(remove);
    btns.appendChild(increase);
    btns.appendChild(count);
    btns.appendChild(decrease);

    // adding functionality to newBtns
    newBtns(btns);

    li.appendChild(btns);
};

const addCart = (li)=>{
    const exists = carts.some(item => item.firstElementChild.textContent == li.firstElementChild.textContent);
        if(exists){
                carts.forEach(cart=>{
                    if(cart.firstElementChild.textContent == li.firstElementChild.textContent) cart.querySelector('.count').textContent++;
                })
        }else{
            carts.push(li);
        }
};
// noOfCarts and totalAmount
const amount = document.querySelector('#cart #amount');
const cartsTotal = document.querySelectorAll('.noOfCarts a');
let totalCarts = 0;

const renderCarts = ()=>{
    totalCarts = 0;
    amount.textContent = '';
    cartSection.innerHTML = '';
    carts.forEach(cart=>{
        cartSection.appendChild(cart);
        const count = cart.querySelector('.count').textContent
        amount.textContent = Number(amount.textContent) + Number((cart.querySelector('.price').textContent)*count);
        totalCarts += Number(count);
    });
    cartsTotal.forEach(icon => {
        icon.textContent = `${totalCarts}`;
    });
};

const newBtns = (btns)=>{
    btns.addEventListener('click', (e)=>{
        const clicked = Array.from(btns.childNodes).includes(e.target);
        if(clicked){
            const li = e.target.parentElement.parentElement;
            const index = carts.findIndex(cart => cart.textContent == li.textContent);
            const cart = carts[index];
            if(e.target.className == 'remove'){
                carts.splice(index, 1);
            }else{
                if(e.target.className == 'increase'){
                    cart.querySelector('.count').textContent++;
                }else if(e.target.className == 'decrease'){
                    cart.querySelector('.count').textContent--;
                }
            }
            renderCarts();
        }
    });
};