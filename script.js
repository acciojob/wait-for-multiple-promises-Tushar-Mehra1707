//your JS code here. If required.
const outputBody = document.getElementById("output");
const loadingRow = document.getElementById("loading-row");

// Helper function to create a promise that resolves after a random time
function createPromise(index) {
  const delay = Math.random() * 2 + 1; // Between 1 and 3 seconds
  const startTime = performance.now();

  return new Promise((resolve) => {
    setTimeout(() => {
      const endTime = performance.now();
      const duration = (endTime - startTime) / 1000; // Convert ms to seconds
      resolve({
        name: `Promise ${index + 1}`,
        time: duration.toFixed(3)
      });
    }, delay * 1000);
  });
}

// Track when the promises started
const promiseStart = performance.now();

// Create and run all three promises
const promises = [0, 1, 2].map(i => createPromise(i));

Promise.all(promises).then(results => {
  // Calculate total time (max of all durations)
  const promiseEnd = performance.now();
  const totalTime = ((promiseEnd - promiseStart) / 1000).toFixed(3);

  // Remove loading row
  loadingRow.remove();

  // Add results to table
  results.forEach(result => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time}</td>
    `;
    outputBody.appendChild(row);
  });

  // Add total time row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${totalTime}</strong></td>
  `;
  outputBody.appendChild(totalRow);
});

