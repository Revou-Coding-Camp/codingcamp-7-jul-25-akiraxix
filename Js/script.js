        // elemen HTML
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const dueDateInput = document.getElementById('due-date-input');
const addButton = document.getElementById('add-button');
const filterButton = document.getElementById('filter-button');
const deleteAllButton = document.getElementById('delete-all-button');
const todoListBody = document.getElementById('todo-list-body');

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const todoText = todoInput.value.trim(); 
    const dueDate = dueDateInput.value; 

    // Validasi Input
    if (todoText === '') {
        alert('Tugas tidak boleh kosong!');
        return;
    }

    if (dueDate === '') {
        alert('Tanggal jatuh tempo tidak boleh kosong!');
        return; 
    }

    addTodoItem(todoText, dueDate);

    todoInput.value = '';
    dueDateInput.value = '';
});

        // menambahkan to-do item ke tabel
function addTodoItem(text, date) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${text}</td>
        <td>${date}</td>
        <td><span class="status-pending">Pending</span></td> <td>
            <button class="action-button complete-button">Complete</button>
            <button class="action-button delete-button">Delete</button>
        </td>
    `;

    todoListBody.appendChild(row);

        // untuk hilangkan pesan "No task found"
    const noTaskRow = document.querySelector('#todo-list-body tr td[colspan="4"]');
    if (noTaskRow) {
        noTaskRow.parentElement.remove();
    }
}

        // tombol Delete dan Complete
todoListBody.addEventListener('click', function(event) {
    const target = event.target; // Elemen yang diklik

    // kalo tombol yang diklik adalah tombol Delete
    if (target.classList.contains('delete-button')) {
        target.closest('tr').remove();
    }

    // kalo tombol yang diklik adalah tombol Complete
    if (target.classList.contains('complete-button')) {
        const statusSpan = target.closest('tr').querySelector('.status-pending');
        if (statusSpan) {
            statusSpan.textContent = 'Completed';
            statusSpan.classList.remove('status-pending'); 
            statusSpan.classList.add('status-completed'); 
            target.remove(); 
        }
    }

        // nambahin pesan "No task found" kalo semua tugas sudah dihapus
    if (todoListBody.children.length === 0) {
        const noTaskRow = document.createElement('tr');
        noTaskRow.innerHTML = `
            <td colspan="4" style="text-align: center; font-style: italic; color: #a0a0a0;">No task found</td>
        `;
        todoListBody.appendChild(noTaskRow);
    }
});

        // nambahin event listener untuk tombol Delete All
deleteAllButton.addEventListener('click', function() {
    // hapus semua anak (<tr>) dari tbody
    while (todoListBody.firstChild) {
        todoListBody.removeChild(todoListBody.firstChild);
    }

    // nambahin kembali pesan "No task found"
    const noTaskRow = document.createElement('tr');
    noTaskRow.innerHTML = `
        <td colspan="4" style="text-align: center; font-style: italic; color: #a0a0a0;">No task found</td>
    `;
    todoListBody.appendChild(noTaskRow);
});

        // nambahin event listener untuk tombol Filter
filterButton.addEventListener('click', function() {
    const filterText = prompt('Masukkan kata kunci untuk filter tugas (kosongkan untuk menampilkan semua):');

    if (filterText === null) {
        return;
    }

    const tasks = todoListBody.querySelectorAll('tr');
    const lowerCaseFilterText = filterText.toLowerCase().trim();

    tasks.forEach(taskRow => {
        // lewati baris "No task found"
        if (taskRow.querySelector('td[colspan="4"]')) {
            return;
        }

        const taskText = taskRow.querySelector('td:first-child').textContent.toLowerCase(); // Ambil teks tugas
        const taskStatus = taskRow.querySelector('.status-pending, .status-completed').textContent.toLowerCase(); // Ambil status

        // logika Filter:
        // tampilkan jika filter kosong ATAU
        // tampilkan jika teks tugas mengandung kata kunci ATAU
        // tampilkan jika status tugas mengandung kata kunci
        if (lowerCaseFilterText === '' || taskText.includes(lowerCaseFilterText) || taskStatus.includes(lowerCaseFilterText)) {
            taskRow.style.display = '';
        } else {
            taskRow.style.display = 'none';
        }
    });
});

