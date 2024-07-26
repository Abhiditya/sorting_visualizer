async function mergeSort(array, left = 0, right = array.length - 1) {
    if(stopSorting) return;
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    await mergeSort(array, left, mid);
    await mergeSort(array, mid + 1, right);
    await merge(array, left, mid, right);


    for (let i = left; i <= right; i++) {
        if(stopSorting) return;
        await markSorted(i);
    }

    if(left===0 && right===array.length-1){
        if(stopSorting) return;
        await allSorted();
    }
}

async function merge(array, left, mid, right) {
    if(stopSorting) return;
    
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);

    let delayTime = mapSpeedToDelay(document.querySelector('#speed_input').value)
    
    let leftIndex = 0;
    let rightIndex = 0;
    let arrayIndex = left;

    const container = document.getElementById('array');
    const children = container.children;

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        if(stopSorting) return;
        const leftValue = leftArray[leftIndex];
        const rightValue = rightArray[rightIndex];

        children[arrayIndex].classList.add('compare');
        children[arrayIndex + 1].classList.add('compare');

        await delay(delayTime);

        if (leftValue <= rightValue) {
            array[arrayIndex] = leftValue;
            leftIndex++;
        } else {
            array[arrayIndex] = rightValue;
            rightIndex++;
        }

        children[arrayIndex].style.height = `${array[arrayIndex]}vh`;
        
        children[arrayIndex].classList.remove('compare');
        children[arrayIndex + 1].classList.remove('compare');

        arrayIndex++;
    }

    while (leftIndex < leftArray.length) {
        if(stopSorting) return;
        array[arrayIndex] = leftArray[leftIndex];
        children[arrayIndex].style.height = `${array[arrayIndex]}vh`;
        leftIndex++;
        arrayIndex++;
    }
    while (rightIndex < rightArray.length) {
        if(stopSorting) return;
        array[arrayIndex] = rightArray[rightIndex];
        children[arrayIndex].style.height = `${array[arrayIndex]}vh`;
        rightIndex++;
        arrayIndex++;
    }

    
}
