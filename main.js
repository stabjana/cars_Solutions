'use strict';

const addCarForm = document.querySelector('#addCar');
const searchCarForm = document.querySelector('#searchCar'); // for reset the form

const cars = [];

class Car {
    constructor(license, maker, model, owner, price, color) {
        this.license = license;
        this.maker = maker;
        this.model = model;
        this.owner = owner;
        this.price = parseFloat(price);
        this.color = color;
    }
}

const addCar = (e) => {
    e.preventDefault(); // to prevent reloading of the page

    const license = document.querySelector('#license').value.trim(); //trim removes the white spaces
    const maker = document.querySelector('#maker').value.trim();
    const model = document.querySelector('#model').value.trim();
    const owner = document.querySelector('#owner').value.trim();
    const price = document.querySelector('#price').value.trim();
    const color = document.querySelector('#color').value;

    const newCar = new Car(license, maker, model, owner, price, color);

    addCarForm.reset();

    cars.push(newCar) // pushing new car into array
    displayTable();
}

const displayTable = () => {
    const table = document.querySelector('#carsTable');

    table.innerHTML = table.rows[0].innerHTML; // 0 starts from the first element in the table and what else does it do?

    cars.forEach(car => { // why you need forEach to create a row and not only create the row?
        const row = table.insertRow(-1); // (-1) is used in table, but no one understands

        Object.values(car).forEach(text => {
            const cell = row.insertCell(-1); // inserts cell with value
            cell.textContent = text;
        })
    })
}

const searchCar = (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('#search').value;
    const foundCar = cars.find(car => car.license.toLowerCase() === searchInput.toLowerCase());

    const searchResult = document.querySelector('#searchResult');
    if (foundCar) {
        searchResult.innerHTML = `
          <p>Maker: ${foundCar.maker}</p>
          <p>Model: ${foundCar.model}</p>
          <p>Owner: ${foundCar.owner}</p>
          <p>Price: ${foundCar.price.toFixed(2)}€</p>
        `;
    } else {
        searchResult.innerHTML = '<p>No car found with the given license plate.</p>';
    }
}

addCarForm.addEventListener('submit', addCar);
searchCarForm.addEventListener('submit', searchCar);
