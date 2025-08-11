import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import NProgress from "./nprogressConfig";

const takeScreenshotAndPDF = async () => {
  // Start progress bar immediately
  NProgress.start();

  try {
    const canvas = await html2canvas(document.body, {
      scale: 2,
      useCORS: true,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4"
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Additional pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const blob = pdf.output("blob");
    const blobURL = URL.createObjectURL(blob);
    window.open(blobURL, "_blank");
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    // Stop progress bar in all cases
    NProgress.done();
  }
};

export default takeScreenshotAndPDF;
