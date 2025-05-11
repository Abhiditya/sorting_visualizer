async function quickSort(array, left = 0, right = array.length - 1) {
    const timeComplexitySpan = document.querySelector('.time');
    const spaceComplexitySpan = document.querySelector('.space');
    timeComplexitySpan.innerText = "O(n log(n))";
    spaceComplexitySpan.innerText = "O(log(n))";

    if(stopSorting) return;
    await waitWhilePaused(); 

    if (left < right) {
        let pivotIndex = await partition(array, left, right);
        await quickSort(array, left, pivotIndex - 1);
        await quickSort(array, pivotIndex + 1, right);

        if(left===0 && right===array.length-1){
            if(stopSorting) return;
            await waitWhilePaused();
            await allSorted();
        }
    }

    async function partition(array, left, right) {
        if(stopSorting) return;
        await waitWhilePaused(); 

        const container = document.getElementById('array');
        const children = container.children;

        let delayTime = mapSpeedToDelay(document.querySelector('#speed_input').value)

        const pivot = array[right];
        let i = left;
        children[right].classList.add('pivot');    // highlight pivot

        for (let j = left; j < right; j++) {
            if (stopSorting) return;
            await waitWhilePaused();
    
            children[j].classList.add('compare');
            await delay(delayTime);
            await waitWhilePaused();
    
            if (array[j] < pivot) {
                await swap(array, i, j);
                i++;
            }
    
            children[j].classList.remove('compare');
        }
    
        await swap(array, i, right);
    
        // Remove pivot
        children[right].classList.remove('pivot');
        await markSorted(i);
    
        return i;
    }
}
