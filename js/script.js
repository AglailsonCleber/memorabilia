window.addEventListener('DOMContentLoaded', () => {
    // create click event for toggler buttons
    ButtonToggle('#sidebartoggle', '#sidenav', 'sidenav-menu-toggled');
    ButtonToggle('#sidebartoggle', '.content', 'sidenav-toggled');

    ButtonToggle('#bt-collection-book', '.submenu-book', 'display-none');
    ButtonToggle('#bt-collection-book', '#bt-collection-book .bi-caret-right', 'display-none');
    ButtonToggle('#bt-collection-book', '#bt-collection-book .bi-caret-down', 'display-none');

    ButtonToggle('#bt-collection-music', '.submenu-music', 'display-none');
    ButtonToggle('#bt-collection-music', '#bt-collection-music .bi-caret-right', 'display-none');
    ButtonToggle('#bt-collection-music', '#bt-collection-music .bi-caret-down', 'display-none');

    // create click event for sidebar buttons
    ButtonMenu('#bt-search-book', '#content-book');
    ButtonMenu('#bt-search-music', '#content-music');
    ButtonMenu('#bt-search-movie', '#content-movie');
    ButtonMenu('#bt-search-tvshow', '#content-tvshow');

});

//
function ButtonToggle(togglerId, toggledId, classId) {
    let toggler = document.querySelector(togglerId);
    let toggled = document.querySelector(toggledId);
    if (toggler) {
        toggler.addEventListener('click', event => {
            event.preventDefault();
            toggled.classList.toggle(classId);
            localStorage.setItem(toggledId + '-toggle', toggled.classList.contains(classId));
        });
    }
}

//
function ButtonMenu(btId, contentId) {
    let button = document.querySelector(btId);
    let content = document.querySelector(contentId);
    let allIframe = document.querySelectorAll('iframe');

    if (button) {
        button.addEventListener('click', event => {
            event.preventDefault();
            allIframe.forEach(element => {
                if (!element.classList.contains('display-none')) {
                    element.classList.toggle('display-none');
                }
            });
            content.classList.toggle('display-none');
        });
    }
}




// $(document).ready(function() {
//     $('#language-select').change(function() {
//         var selectedLanguage = $(this).val();
//         if (selectedLanguage === 'pt-br') {
//             // Translate content into Portuguese 
//             translateToPortuguese();
//         } else if (selectedLanguage === 'en') {
//             // Translate content into English
//             translateToEnglish();
//         }
//         // Add more logic for other languages as needed
//     });

//     function translateToPortuguese() {
//         // Use the deepl API
//         // Example: $(".content").text("Olá, mundo!");
//     }

//     // Função de tradução para o inglês
//     function translateToEnglish() {
//         // Use the deepl API
//         // Example: $(".content").text("Hello, world!");
//     }
// });

