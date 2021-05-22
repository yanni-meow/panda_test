const designBox = document.querySelector('.design_box');

const textColorBtn = document.querySelector('.color_btn');
const backgroundColorBtn = document.querySelector('.backgroundcolor_btn');

const ranges = document.querySelectorAll('.range');
const red = document.getElementById('red');
const green = document.getElementById('green');
const blue = document.getElementById('blue');

const changeRangeBackground = (range) => {
    let value = (range.value-range.min)/(range.max-range.min)*100;
    range.style.background = `linear-gradient(to right, ${range.id} 0%, ${range.id} ${value}%, #fff ${value}%, white 100%`;
}

const changeSelector = (choice) => {
    const valueOfRange = designBox.style[choice].replace(/\D/g, ' ').split(' ').filter(el => el !== '');
    ranges.forEach(function (range, index) {
        range.value = valueOfRange[index];
        changeRangeBackground(range);
        range.oninput = () => {
            designBox.style[choice] = `rgb(${red.value}, ${green.value}, ${blue.value})`;
            changeRangeBackground(range);
        }  
    })
} 

textColorBtn.onclick = () => {
    textColorBtn.style.background = 'rgb(255, 204, 250)';
    backgroundColorBtn.style.background = '#fff';
    changeSelector('color');
}

backgroundColorBtn.onclick = () => {
    backgroundColorBtn.style.background = 'rgb(255, 204, 250)';
    textColorBtn.style.background = '#fff';
    changeSelector('background');
}

window.onload = () => {
    textColorBtn.style.background = 'rgb(255, 204, 250)';
    designBox.style.color = 'rgb(0, 0, 0)';
    designBox.style.background = 'rgb(255, 255, 255)';
    changeSelector('color');
}