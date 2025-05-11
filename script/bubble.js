
async function bubbleSort(array) {
    const timeComplexitySpan = document.querySelector('.time');
    const spaceComplexitySpan = document.querySelector('.space');
    timeComplexitySpan.innerText = "O(n^2)";
    spaceComplexitySpan.innerText = "O(1)";

    for (let i = 0; i < array.length - 1; i++) {
        if (stopSorting) return;
        await waitWhilePaused(); 
        for (let j = 0; j < array.length - i - 1; j++) {
            if (stopSorting) return;
            await waitWhilePaused(); 
            if (array[j] > array[j + 1]) {
                await swap(array, j, j + 1);
            }
        }
        await waitWhilePaused(); 
        await markSorted(array.length-i-1);
    }
    await markSorted(0);
    await allSorted();
}
