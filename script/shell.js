async function shellSort(array) {
    const timeComplexitySpan = document.querySelector('.time');
    const spaceComplexitySpan = document.querySelector('.space');
    timeComplexitySpan.innerText = "O(n log n)";
    spaceComplexitySpan.innerText = "O(1)";

    const container = document.getElementById('array');
    const children = container.children;
    const n = array.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            if (stopSorting) return;
            await waitWhilePaused();

            let temp = array[i];
            let j = i;

            while (j >= gap && array[j - gap] > temp) {
                if (stopSorting) return;
                await waitWhilePaused();

                array[j] = array[j - gap];

                // Visual updates
                children[j].classList.add('swap');
                children[j - gap].classList.add('compare');

                children[j].style.height = `${array[j]}vh`;

                await delay(mapSpeedToDelay(document.querySelector('#speed_input').value));

                children[j].classList.remove('swap');
                children[j - gap].classList.remove('compare');

                j -= gap;
            }

            array[j] = temp;
            children[j].style.height = `${array[j]}vh`;
        }
    }

    for (let i = 0; i < n; i++) {
        await markSorted(i);
    }
    await allSorted();
}
