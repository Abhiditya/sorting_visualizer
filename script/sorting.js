let stopSorting = false;
let paused= false;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function mapSpeedToDelay(value) {
    const minDelay = 100; 
    const maxDelay = 1000; 

    return maxDelay - (value - minDelay);
}

async function swap(array, i, j){
    if(stopSorting) return;
    await waitWhilePaused(); 
    
    const container = document.getElementById('array');
    const children = container.children;
    children[i].classList.add('compare');
    children[j].classList.add('compare');

    let delayTime = mapSpeedToDelay(document.querySelector('#speed_input').value);

    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    await delay(delayTime);
    await waitWhilePaused(); 

    children[i].classList.remove('compare');
    children[j].classList.remove('compare');

    await delay(delayTime);
    await waitWhilePaused(); 

    children[i].style.height = `${array[i]}vh`;
    children[j].style.height = `${array[j]}vh`;

    children[i].classList.add('swap');
    children[j].classList.add('swap');

    await delay(delayTime);
    await waitWhilePaused(); 

    children[i].classList.remove('swap');
    children[j].classList.remove('swap');
}


function disable() {
    document.querySelector('#arr_sz').disabled = true;
    document.querySelector('.algorithm').disabled = true;
    document.querySelector('#arr_sz').classList.add('disable');
    document.querySelector('.algorithm').classList.add('disable');
    const startButton = document.querySelector('.start');
    startButton.removeEventListener('click', startSort);
    startButton.classList.add('disable');
}

function enable() {
    document.querySelector('#arr_sz').disabled = false;
    document.querySelector('.algorithm').disabled = false;
    document.querySelector('#arr_sz').classList.remove('disable');
    document.querySelector('.algorithm').classList.remove('disable');
    const startButton = document.querySelector('.start');
    startButton.addEventListener('click', startSort);
    startButton.classList.remove('disable');
}

async function markSorted(index){
    if(stopSorting) return;

    const container = document.getElementById('array');
    const children = container.children;

    children[index].classList.add('sorted');
}

async function allSorted() {
    if(stopSorting) return;

    const container = document.getElementById('array');
    const children = container.children;
    for (let i = 0; i < children.length; i++) {
        await delay(80);
        children[i].classList.add('allSorted');
    }
}


function createBars(){
    stopSorting = true;
    if(paused == true) toggleSort();
    enable();
    bar=document.querySelector('#arr_sz').value;
    let Array = [];

    for(let i=0; i<bar; i++){
        let Num= Math.floor(Math.random()*100) + 1;
        Array.push(Num);
    }

    const maxValue = Math.max(...Array);

    const container = document.getElementById('array');
    container.innerHTML='';
    for(let i=0; i<bar; i++){
        const div = document.createElement('div');
        div.className='cell';

        const normalizeH = (Array[i]/maxValue)*65;
        div.style.height=`${normalizeH}vh`;
 
        container.appendChild(div);
    }
}

async function startSort(){
    stopSorting = false;
    if(paused == true) toggleSort();
    
    disable();

    delayTime =document.querySelector('#speed_input').value;
    const algoSelect = document.getElementById('algorithm');
    const algo = algoSelect.value;
    const array = Array.from(document.getElementById('array').children).map(div => parseInt(div.style.height));

    if (algo !== '0') {
        if(algo ==='1'){
            await bubbleSort(array);
        }
        if(algo ==='2'){
            await selectionSort(array);
        }
        if(algo ==='3'){
            await insertionSort(array);
        }
        if(algo ==='4'){
            await mergeSort(array);
        }
        if(algo ==='5'){
            await quickSort(array);
        }
    } else {
        alert("Please select a sorting algorithm.");
    }
    stopSorting = true;
    enable();
}

function toggleSort() {
    paused = !paused;
    const toggleBtn = document.getElementById("toggle");
    toggleBtn.textContent = paused ? "Play" : "Pause";
}
async function waitWhilePaused() {
    while (paused) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  

document.querySelector('#arr_sz').addEventListener('input', createBars);


document.querySelector('.start').addEventListener('click', async function(){
    disable();
    await startSort();
})
document.querySelector('.newArray').addEventListener('click', function(){
    stopSorting = true;
    createBars();
    enable();
})

document.addEventListener('DOMContentLoaded',createBars);
