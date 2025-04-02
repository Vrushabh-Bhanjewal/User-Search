"use strict";
let form = document.querySelector('.form');
let input = document.querySelector('#input');
let box = document.querySelector('.container');
const myfetchData = async (url, option) => {
    const res = await fetch(url, option);
    if (!res.ok) {
        console.error('Error loading data');
        throw new Error(`Error fetching data: ${res.statusText}`);
    }
    let data = await res.json();
    // console.log(data)
    return data;
};
const singleUserUI = (curr) => {
    // console.log(curr)
    const { login, url, id, avatar_url } = curr;
    let card = `
    <div class="card">
        <img class="img1" src="${avatar_url}" alt="${login}">
        <div class="card-info">
            <p class="text"><a href="${url}">${login.toUpperCase()}</a></p>
            <img class="img2" src="${avatar_url}" alt="${login}">
        </div>
    </div>
    `;
    box.insertAdjacentHTML('beforeend', card);
};
const fetchUser = async (url) => {
    try {
        const data = await myfetchData(url, {});
        // console.log(data)
        for (let curr of data) {
            // console.log(curr);
            singleUserUI(curr);
        }
    }
    catch (error) {
        console.error("Error fetching users:", error);
    }
};
fetchUser('https://api.github.com/users');
// search 
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const serachinp = input.value.toLocaleLowerCase();
    let url = `https://api.github.com/users`;
    try {
        const allData = await myfetchData(url, {});
        const matching = allData.filter(curr => {
            return curr.login.toLowerCase().includes(serachinp);
        });
        box.innerHTML = '';
        if (matching.length == 0) {
            box?.insertAdjacentHTML('beforeend', ` 
                <div>
                    <h1>Data Not Found</h1>
                </div>
                `);
        }
        else {
            for (let curr of matching) {
                singleUserUI(curr);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
