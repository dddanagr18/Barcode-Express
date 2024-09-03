document.addEventListener('DOMContentLoaded', () => {
    const barcodeInput = document.getElementById('barcodeInput');
    const tableBody = document.querySelector('#barcodeTable tbody');
    const downloadBtn = document.getElementById('downloadBtn');
    const maxBarcodes = 2000;
    let barcodeData = [];

    barcodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && barcodeData.length < maxBarcodes) {
            e.preventDefault();
            const date = document.getElementById('date').value;
            const salesOrder = document.getElementById('salesOrder').value;
            const barcode = barcodeInput.value.trim();

            if (barcode && date && salesOrder) {
                barcodeData.push({ date, salesOrder, barcode });
                addBarcodeToTable(date, salesOrder, barcode);
                barcodeInput.value = ''; // Clear the input
            } else {
                alert("Please fill in all fields and scan a valid barcode.");
            }
        }
    });

    function addBarcodeToTable(date, salesOrder, barcode) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${date}</td><td>${salesOrder}</td><td>${barcode}</td>`;
        tableBody.appendChild(row);
    }

    downloadBtn.addEventListener('click', () => {
        if (barcodeData.length > 0) {
            downloadExcelFile();
        } else {
            alert("No barcodes to download.");
        }
    });

    function downloadExcelFile() {
        let csvContent = "data:text/csv;charset=utf-8,Date,Sales Order,Barcode\n";
        barcodeData.forEach(row => {
            csvContent += `${row.date},${row.salesOrder},${row.barcode}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "barcodes.csv");
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
    }
});
