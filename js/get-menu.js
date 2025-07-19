document.addEventListener('DOMContentLoaded', function() {
    const btn_dark = document.querySelector(".btn-dark .drop-btn"),
          dark_tooltip = document.querySelector(".btn-dark .tooltip"),
          dark_menu_wrapper = document.querySelector(".btn-dark .wrapper"),
          dark_menu_bar = document.querySelector(".btn-dark .menu-bar"),
          dark_setting_drop = document.querySelector(".btn-dark .setting-drop"),
          dark_help_drop = document.querySelector(".btn-dark .help-drop"),
          dark_theme_drop = document.querySelector(".btn-dark .theme-drop"),
          dark_setting_item = document.querySelector(".btn-dark .setting-item"),
          dark_theme_item = document.querySelector(".btn-dark .theme-item"),
          dark_help_item = document.querySelector(".btn-dark .help-item"),
          dark_setting_btn = document.querySelector(".btn-dark .back-setting-btn"),
          dark_theme_btn = document.querySelector(".btn-dark .back-theme-btn"),
          dark_help_btn = document.querySelector(".btn-dark .back-help-btn"),
          userInfoButton = document.getElementById("get-user-info");

    if (dark_menu_wrapper) {
        document.addEventListener('click', function() {
            if (dark_menu_wrapper.classList.contains("show")) {
                dark_menu_wrapper.classList.remove("show");
            }
        });

        dark_menu_wrapper.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }

    if (userInfoButton && dark_menu_wrapper) {
        userInfoButton.onclick = function(event) {
            dark_menu_wrapper.classList.toggle("show");
            event.stopPropagation();
        };
    }

    function setupSubMenu(button, menu, marginLeft, height) {
        if (button && menu && dark_menu_bar && dark_menu_wrapper) {
            button.onclick = (event) => {
                hideAllUlElements();
                menu.style.display = "block";
                dark_menu_bar.style.marginLeft = marginLeft;
                dark_menu_wrapper.style.height = height;
                dark_menu_wrapper.style.overflowY = 'auto';
                event.stopPropagation();
            };
        }
    }

    function resetMenu(button) {
        if (button && dark_menu_bar && dark_menu_wrapper) {
            button.onclick = (event) => {
                hideAllUlElements();
                dark_menu_bar.style.display = "block";  
                dark_menu_bar.style.marginLeft = "0px";
                dark_menu_wrapper.style.height = "395px"; 
                event.stopPropagation();
            };
        }
    }

    function hideAllUlElements() {
        const allUlElements = document.querySelectorAll('.btn-dark .wrapper ul');
        allUlElements.forEach(ul => ul.style.display = 'none');
    }

    if (dark_setting_item && dark_setting_drop) {
        setupSubMenu(dark_setting_item, dark_setting_drop, "-380px", "380px");
    }
    if (dark_help_item && dark_help_drop) {
        setupSubMenu(dark_help_item, dark_help_drop, "-350px", "350px");
    }
    if (dark_theme_item && dark_theme_drop) {
        setupSubMenu(dark_theme_item, dark_theme_drop, "-350px", "400px");
    }

    if (dark_setting_btn) resetMenu(dark_setting_btn);
    if (dark_help_btn) resetMenu(dark_help_btn);
    if (dark_theme_btn) resetMenu(dark_theme_btn);
});