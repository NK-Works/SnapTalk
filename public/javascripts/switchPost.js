/* This code is made by Anneshu Nag, Student ID: 2210994760 */
// JavaScript for the frontend part
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('uploadType').addEventListener('change', function() {
    const selectedType = this.value;
    if (selectedType === 'image') {
      document.getElementById('imageUpload').style.display = 'block';
      document.getElementById('textUpload').style.display = 'none';
    } else if (selectedType === 'text') {
      document.getElementById('imageUpload').style.display = 'none';
      document.getElementById('textUpload').style.display = 'block';
    }
  });
});
