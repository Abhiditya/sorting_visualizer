async function insertionSort(array) {
    if(stopSorting) return;
    
    const container = document.getElementById('array');
    const children= container.children;
    const length = array.length;
    await markSorted(0);
    for (let i = 1; i < length; i++) {
        if(stopSorting) return;

        let key = array[i];
        let j = i - 1;
        children[i].classList.add('compare');
        while (j >= 0 && array[j] > key) {
            if(stopSorting) return;

            await swap(array, j + 1, j);
            j--;
        }
        
        array[j + 1] = key;
        children[j+1].style.height= `${key}vh`
        children[i].classList.remove('compare');
        await markSorted(i);
    }

    await allSorted();
}
