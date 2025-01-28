import type { TrackingData } from '../types';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => void;
  }
}

export default function getPdf(json: TrackingData['TransitEvents']) {
  const pdf = new jsPDF('p', 'pt', 'a4');
  const columns = ['Timestamp', 'State', 'Code'];
  const rows = json.map((e) => [
    new Date(e.timestamp).toDateString(),
    e.state,
    e.code,
  ]);

  pdf.text('Data of Tracking', 235, 40);

  pdf.autoTable({
    head: [columns],
    body: rows,
    startY: 65,
    theme: 'grid',
    styles: {
      font: 'times',
      halign: 'center',
      cellPadding: 3.5,
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0],
    },
    headStyles: {
      textColor: [0, 0, 0],
      fontStyle: 'normal',
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      fillColor: [166, 204, 247],
    },
    alternateRowStyles: {
      fillColor: [212, 212, 212],
      textColor: [0, 0, 0],
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
    rowStyles: {
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
    tableLineColor: [0, 0, 0],
  });

  if (typeof window !== 'undefined') {
    console.log(pdf.output('datauristring'));
  }

  pdf.save('tracking_data.pdf');
}
