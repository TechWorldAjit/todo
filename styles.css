document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesList = document.getElementById('notes-list');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const body = document.querySelector('body');
    let activeTab = 'daily';

    const tabColors = {
        daily: 'rgba(0, 255, 0, 0.05)',
        weekly: 'rgba(0, 0, 255, 0.05)',
        monthly: 'rgba(255, 0, 0, 0.05)',
        goals: 'rgba(255, 255, 0, 0.1)',
    };

    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem(activeTab)) || [];
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            if (note.important) {
                noteElement.classList.add('important');
            }
            noteElement.innerHTML = `
                <p>${note.text || note}</p> <button class="delete-btn" data-index="${index}">🗹</button><button class="imp-btn" data-index="${index}">⦿</button>
            `;
            notesList.appendChild(noteElement);
        });
    };

    const saveNotes = (notes) => {
        localStorage.setItem(activeTab, JSON.stringify(notes));
    };

    addNoteBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            const notes = JSON.parse(localStorage.getItem(activeTab)) || [];
            notes.push({ text: noteText, important: false }); // Store as object with text and important
            saveNotes(notes);
            loadNotes();
            noteInput.value = '';
        }
    });

    notesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            const notes = JSON.parse(localStorage.getItem(activeTab)) || [];
            notes.splice(index, 1);
            saveNotes(notes);
            loadNotes();
        } else if (e.target.classList.contains('imp-btn')) { // Important button click
            const index = e.target.getAttribute('data-index');
            const notes = JSON.parse(localStorage.getItem(activeTab)) || [];
            notes[index].important = !notes[index].important;
            saveNotes(notes);
            loadNotes();
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            activeTab = e.target.getAttribute('data-tab');
            loadNotes();
            body.style.backgroundColor = tabColors[activeTab];
        });
    });

    loadNotes();
    body.style.backgroundColor = tabColors[activeTab];
});
