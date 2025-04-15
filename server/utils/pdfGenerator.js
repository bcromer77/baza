const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const generateInvoicePDF = ({ creatorName, brandName, items = [], amount }) => {
  const doc = new PDFDocument();
  const filename = `invoice-${uuidv4()}.pdf`;
  const filepath = path.join(__dirname, '..', 'invoices', filename);

  doc.pipe(fs.createWriteStream(filepath));

  doc.fontSize(20).text('🧾 CreatorTorch Invoice', { align: 'center' });
  doc.moveDown();

  doc.fontSize(14).text(`From: ${creatorName}`);
  doc.text(`To: ${brandName}`);
  doc.moveDown();

  doc.text('Items:');
  items.forEach((item, idx) => {
    doc.text(`${idx + 1}. ${item.description} - €${item.price}`);
  });

  doc.moveDown();
  doc.fontSize(16).text(`Total Amount: €${amount}`, { align: 'right' });

  doc.end();

  return `/invoices/${filename}`; // Relative public path
};

module.exports = generateInvoicePDF;
