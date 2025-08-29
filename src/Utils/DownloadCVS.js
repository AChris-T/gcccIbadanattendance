// utils/downloadCSV.js
export function downloadCSV(data, filename = 'data.csv') {
  if (!data || data.length === 0) {
    console.error('No data available to download');
    return;
  }

  // Extract headers from keys of the first object
  const headers = Object.keys(data[0]);

  // Convert rows
  const csvRows = [
    headers.join(','), // header row
    ...data.map((row) =>
      headers
        .map((field) => {
          let val = row[field] ?? '';
          // Escape quotes and commas properly
          if (typeof val === 'string') {
            val = `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        })
        .join(',')
    ),
  ];

  // Create blob and download
  const blob = new Blob([csvRows.join('\n')], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
