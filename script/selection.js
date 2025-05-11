async function selectionSort(array) {
    const timeComplexitySpan = document.querySelector('.time');
    const spaceComplexitySpan = document.querySelector('.space');
    timeComplexitySpan.innerText = "O(n^2)";
    spaceComplexitySpan.innerText = "O(1)";

    if(stopSorting) return;
    await waitWhilePaused(); 

    for (let i = 0; i < array.length - 1; i++) {
        if(stopSorting) return;
        await waitWhilePaused(); 

        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if(stopSorting) return;
            await waitWhilePaused(); 
            
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            await swap(array, i, minIndex);
        }
        
        await waitWhilePaused(); 
        await markSorted(i);
    }
    await markSorted(array.length - 1);
    await allSorted();
}
