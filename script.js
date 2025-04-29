//your JS code here. If required.
const outputBody = document.getElementById("output");
const loadingRow = document.getElementById("Loading-row...");
function createPromise(index) {
  const delay = Math.random() * 2 + 1;
  const startTime = performance.now();

  return new Promise((resolve) => {
    setTimeout(() => {
      const endTime = performance.now();
      const duration = (endTime - startTime) / 1000; 
      resolve({
        name: `Promise ${index + 1}`,
        time: duration.toFixed(3)
      });
    }, delay * 1000);
  });
}
const promiseStart = performance.now();
const promises = [0, 1, 2].map(i => createPromise(i));

Promise.all(promises).then(results => {
  const promiseEnd = performance.now();
  const totalTime = ((promiseEnd - promiseStart) / 1000).toFixed(3);

  loadingRow.remove();

  results.forEach(result => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time}</td>
    `;
    outputBody.appendChild(row);
  });
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${totalTime}</strong></td>
  `;
  outputBody.appendChild(totalRow);
});

