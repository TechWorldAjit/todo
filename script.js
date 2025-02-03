document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesList = document.getElementById('notes-list');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const body = document.querySelector('body');
    let activeTab = 'daily';

    // Colors for each tab
    const tabColors = {
        daily: '#1f1f1f',   // Soft dark teal
        weekly: '#1f1f1f',  // Soft dark blue
        monthly: '#1f1f1f', // Soft dark burgundy
        goals: '#1f1f1f',   // Soft dark olive green
    };

    // Colors for buttons (Add button and active tab highlight)
    const primaryColors = {
        daily: '#00BD56',    // Green
        weekly: '#2196F3',   // Blue
        monthly: '#F93827',  // Purple
        goals: '#FF9800',    // Orange
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
                <p>${note.text || note}</p> 
                <button class="delete-btn" data-index="${index}">✓</button>
                <button class="imp-btn" data-index="${index}" style="color: ${note.important ? 'black' : ''}">⦿</button>
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
            notes.push({ text: noteText, important: false });
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
        } else if (e.target.classList.contains('imp-btn')) {
            const index = e.target.getAttribute('data-index');
            const notes = JSON.parse(localStorage.getItem(activeTab)) || [];
            notes[index].important = !notes[index].important;

            // Update the color of the button text when marked important
            const impButton = e.target;
            if (notes[index].important) {
                impButton.style.color = 'black';  // Text turns black when important
            } else {
                impButton.style.color = '';  // Revert text color when not important
            }

            saveNotes(notes);
            loadNotes();
        }
    });

    const updateUI = () => {
        body.style.backgroundColor = tabColors[activeTab];  // Set background color based on tab
        addNoteBtn.style.backgroundColor = primaryColors[activeTab];  // Change "Add" button color
        addNoteBtn.style.borderColor = primaryColors[activeTab];  // Border color for "Add" button

        tabButtons.forEach(button => {
            if (button.getAttribute('data-tab') === activeTab) {
                button.classList.add('active');
                button.style.backgroundColor = primaryColors[activeTab];  // Active tab color
            } else {
                button.classList.remove('active');
                button.style.backgroundColor = '#333';  // Default color for inactive tabs
            }
        });
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            activeTab = e.target.getAttribute('data-tab');
            loadNotes();
            updateUI();  // Update UI elements based on the selected tab
        });
    });

    // Initialize UI setup on page load
    loadNotes();
    updateUI();
});


