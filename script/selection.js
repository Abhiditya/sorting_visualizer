async function selectionSort(array) {
    if(stopSorting) return;

    for (let i = 0; i < array.length - 1; i++) {
        if(stopSorting) return;

        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if(stopSorting) return;
            
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            await swap(array, i, minIndex);
        }
        await markSorted(i);
    }
    await markSorted(array.length - 1);
    await allSorted();
}
