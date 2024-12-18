import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDF(): Promise<void> {
  const report = document.getElementById('risk-report');
  if (!report) {
    throw new Error('Report element not found');
  }

  try {
    const canvas = await html2canvas(report, {
      scale: 2,
      logging: false,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('ebios-rm-report.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

export async function shareReport(): Promise<void> {
  try {
    if (!navigator.share) {
      throw new Error('Web Share API not supported');
    }

    await navigator.share({
      title: 'Rapport EBIOS RM',
      text: 'Analyse des risques EBIOS RM',
      url: window.location.href,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Web Share API not supported') {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alert('Le lien a été copié dans le presse-papier !');
    } else {
      console.error('Error sharing report:', error);
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alert('Le lien a été copié dans le presse-papier !');
    }
  }
}