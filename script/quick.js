async function quickSort(array, left = 0, right = array.length - 1) {
    if(stopSorting) return;

    if (left < right) {
        let pivotIndex = await partition(array, left, right);
        await quickSort(array, left, pivotIndex - 1);
        await quickSort(array, pivotIndex + 1, right);

        if(left===0 && right===array.length-1){
            if(stopSorting) return;
            await allSorted();
        }
    }

    async function partition(array, left, right) {
        if(stopSorting) return;

        const container = document.getElementById('array');
        const children = container.children;

        let delayTime = mapSpeedToDelay(document.querySelector('#speed_input').value)

        const pivot = array[right];
        let i = left;
        children[right].style.backgroundColor = 'red';

        for (let j = left; j < right; j++) {
            if(stopSorting) return;
            await new Promise(resolve => setTimeout(resolve,delayTime));
            if (array[j] < pivot) {
                await swap(array, i, j);
                i++;
            }
        }
        await swap(array, i, right);
        children[right].style.backgroundColor='';
        await markSorted(i);
        return i;
    }
}
