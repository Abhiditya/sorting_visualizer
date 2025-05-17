async function heapSort(array) {
    const timeComplexitySpan = document.querySelector('.time');
    const spaceComplexitySpan = document.querySelector('.space');
    timeComplexitySpan.innerText = "O(n log(n))";
    spaceComplexitySpan.innerText = "O(1)";

    const n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (stopSorting) return;
        await waitWhilePaused();
        await heapify(array, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        if (stopSorting) return;
        await waitWhilePaused();
        await swap(array, 0, i);
        await markSorted(i);
        await heapify(array, i, 0);
    }

    await markSorted(0);
    await allSorted();
}

async function heapify(array, n, i) {
    if (stopSorting) return;
    await waitWhilePaused();

    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        await swap(array, i, largest);
        await heapify(array, n, largest);
    }
}
