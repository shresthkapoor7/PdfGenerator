document.getElementById('fullsize-input').addEventListener('input', function() {
    const markdownText = this.value;
    const converter = new showdown.Converter();
    const html = converter.makeHtml(markdownText);
    document.getElementById('preview').innerHTML = html;
});

document.getElementById('save-btn').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (isDarkMode) {
        doc.setFillColor(0, 0, 0);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

        doc.setTextColor(255, 255, 255);
    } else {
        doc.setTextColor(0, 0, 0);
    }

    doc.html(document.getElementById('preview'), {
        callback: function (doc) {
            doc.save('notes.pdf');
        },
        backgroundColor: null,
        x: 10,
        y: 10,
        width: 180,
        windowWidth: document.getElementById('preview').scrollWidth,
    });
});

document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('fullsize-input').value = '';
    document.getElementById('preview').innerHTML = '';
});

document.getElementById('save-as-txt-btn').addEventListener('click', function() {
    const text = document.getElementById('fullsize-input').value;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.txt';
    a.click();
    URL.revokeObjectURL(url);
});


document.getElementById('toggle-dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = this.textContent === 'Dark Mode' ? 'Light Mode' : 'Dark Mode';
});