
async function bubbleSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        if (stopSorting) return;
        for (let j = 0; j < array.length - i - 1; j++) {
            if (stopSorting) return;
            if (array[j] > array[j + 1]) {
                await swap(array, j, j + 1);
            }
        }
        await markSorted(array.length-i-1);
    }
    await markSorted(0);
    await allSorted();
}
