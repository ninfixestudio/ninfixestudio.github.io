const requirementTabs = document.querySelectorAll('.requirement-tabs button');
const requirementLists = document.querySelectorAll('.requirements-list');

requirementTabs.forEach(tab => {

    tab.addEventListener('click', () => {

        // Hapus active dari semua tab
        requirementTabs.forEach(button => {
            button.classList.remove('active');
        });

        // Jadikan tab yang diklik active
        tab.classList.add('active');

        // Sembunyikan semua requirement
        requirementLists.forEach(list => {
            list.classList.add('hidden');
        });

        // Ambil ID berdasarkan data-tab
        const target = document.getElementById(tab.dataset.tab);

        // Tampilkan requirement yang sesuai
        target.classList.remove('hidden');

    });

});