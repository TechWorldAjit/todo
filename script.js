document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesList = document.getElementById('notes-list');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const body = document.querySelector('body');  // Reference to the body element
    let activeTab = 'daily';

    // Define background colors for each tab
    const tabColors = {
        daily: 'rgba(0, 255, 0, 0.05)', // deep green with 20% opacity
        weekly: 'rgba(0, 0, 255, 0.05)', // deep blue with 20% opacity
        monthly: 'rgba(255, 0, 0, 0.05)', // dark blue with 20% opacity
        goals: 'rgba(255, 255, 0, 0.1)', // deep yellow with 20% opacity
    };

    // Load notes from local storage
    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem(activeTab)) || [];
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <p>${note}</p>
                <button class="delete-btn" data-index="${index}">X</button>
            `;
            notesList.appendChild(noteElement);
        });
    };

    // Save notes to local storage
    const saveNotes = (notes) => {
        localStorage.setItem(activeTab, JSON.stringify(notes));
    };

    // Add a new note
    addNoteBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            const notes = JSON.parse(localStorage.getItem(activeTab)) || [];
            notes.push(noteText);
            saveNotes(notes);
            loadNotes();
            noteInput.value = '';
        }
    });

    // Delete a note
    notesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            const notes = JSON.parse(localStorage.getItem(activeTab)) || [];
            notes.splice(index, 1);
            saveNotes(notes);
            loadNotes();
        }
    });

    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            activeTab = e.target.getAttribute('data-tab');
            loadNotes();

            // Change body background color based on the active tab
            body.style.backgroundColor = tabColors[activeTab];
        });
    });

    // Initial load and setting the background color for the active tab
    loadNotes();
    body.style.backgroundColor = tabColors[activeTab];
});
