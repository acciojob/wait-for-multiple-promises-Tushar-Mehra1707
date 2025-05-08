// Utility to return a Promise that resolves after a random delay (1–3 seconds)
function createTimedPromise(index) {
    const delay = Math.random() * 2000 + 1000; // Between 1000 and 3000 ms
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ index: index + 1, time: delay / 1000 }); // Time in seconds
        }, delay);
    });
}

// Main function to track and display results
async function trackPromises() {
    const output = document.getElementById('output');
    const loadingRow = document.getElementById('loadingRow');

    const startTime = performance.now();

    // Create 3 promises
    const promises = [0, 1, 2].map(i => createTimedPromise(i));

    try {
        // Wait for all promises to resolve
        const results = await Promise.all(promises);
        const endTime = performance.now();
        const totalTime = (endTime - startTime) / 1000;

        // Remove loading row
        loadingRow.remove();

        // Populate each result row
        results.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Promise ${result.index}</td>
                <td>${result.time.toFixed(3)}</td>
            `;
            output.appendChild(row);
        });

        // Add total row
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td><strong>Total</strong></td>
            <td><strong>${totalTime.toFixed(3)}</strong></td>
        `;
        output.appendChild(totalRow);
    } catch (err) {
        loadingRow.innerHTML = `<td colspan="2">Error occurred: ${err}</td>`;
    }
}

// Run the tracker when the page is loaded
document.addEventListener('DOMContentLoaded', trackPromises);
