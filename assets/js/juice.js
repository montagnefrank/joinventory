/**
 *          ****************************************************************************
 *          **********************||  PORTALES PANEL ADMINISTRATIVO ||******************
 *          ****************************************************************************
 * 
 *          @date               2019-11-15
 *          @author             Bayman Burton <bayman@burtonservers.com>
 *          @copyright          2019-2020 Burton Technology https://burtonservers.com
 *          @license            https://www.gnu.org/licenses/gpl-3.0.en.html GNU General Public License (GPL v3)
 *          International Registered Trademark & Property of Burton Technology  https://burtonservers.com
 * 
 *          This source file is subject to the GNU General Public License (GPL v3)
 *          that is bundled with this package in the file LICENSE.txt.
 *          It is also available through the world-wide-web at this URL:
 *          https://www.gnu.org/licenses/gpl-3.0.en.html
 *          If you did not receive a copy of the license and are unable to
 *          obtain it through the world-wide-web, please send an email
 *          to dev@burtonservers.com so we can send you a copy immediately.
 *          This software is built and distributed by Burton Technology https://burtonservers.com
 *          By using this software you are Aware it is strictly prohibited its comercial distribution or 
 *          modification of any aspect of the aplication
 *
 *          Desc:
 *          Custom admin dashboard for easy lightweight SPA deployment.
 * 
 *          WARNING
 *          Please do not edit this file or the aplication could stop working as intended, also
 *          any modifications will be overwritten by newer versions in the future
 *          
 */

$(document).ready(function() {

    $("#loading").hide();
    $("#loading").fadeIn('slow');

    console.log('Consultando API');
    var formData = new FormData();
    formData.append('meth', 'construct');
    $.ajax({
        url: apiURI,
        type: 'POST',
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        timeout: 3000,
        data: formData,
        success: function(data) {
            if (data.scriptResp == "done") {
                $('body').append(data.juice);
                window.localStorage.setItem("juice", data.juice);
            } else {
                $('body').append(juiceShell);
            }
        },
        error: function(error) {
            var userIntel = window.localStorage.getItem("userIntel");
            if (userIntel) {
                var jsonObj = $.parseJSON('[' + userIntel + ']');
                userIntel = jsonObj[0];
                if (userIntel.login == 'YES') {
                    $('body').append(window.localStorage.getItem("juice"));
                } else {
                    $('body').append(juiceShell);
                }
            } else {
                $('body').append(juiceShell);
            }
        }
    });

    /*           INICIO DE SESION               */
    $(document).on('click', '#loginBtn', function(e) {
        e.preventDefault();
        var username = $(document).find('.username').val();
        var password = $(document).find('.password').val();

        /// VALIDAMOS QUE NO EXISTAN CAMPOS VACIOS ///
        if (username == '') {
            $.growl.warning({
                message: "Ingrese su nombre de usuario"
            });
            return false;
        }
        if (password == '') {
            $.growl.warning({
                message: "Ingrese su contraseña"
            });
            return false;
        }

        $("#loading").fadeIn("fast", function() {
            var formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('apiuri', apiURI);
            formData.append('meth', 'login');
            $.ajax({
                url: apiURI,
                type: 'POST',
                dataType: "json",
                cache: false,
                contentType: false,
                timeout: 3000,
                processData: false,
                data: formData,
                success: function(data) {
                    if (data.scriptResp == "noMatch") {
                        $("#loading").fadeOut("fast", function() {
                            $.growl.error({
                                message: "Usuario o contraseña incorrectos"
                            })
                        });
                        //    $('.username').val('');
                        //    $('.password').val('');
                    }
                    if (data.scriptResp == "match") {
                        window.localStorage.removeItem("pendingCalls");
                        window.localStorage.removeItem("localPanels");
                        window.localStorage.removeItem("localCalls");
                        window.localStorage.setItem("userIntel", JSON.stringify(data.userIntel));
                        showPanel(data.userIntel.panelUsuario, data.userIntel.idUsuario);
                    }
                },
                error: function(error) {
                    $("#loading").fadeOut('slow');
                    swal({
                        title: "Lo Sentimos",
                        text: "El servidor no responde, revise su conexión e intente de nuevo ",
                        type: "error",
                        showCancelButton: false,
                        confirmButtonText: 'Entendido',
                        cancelButtonText: 'salir'
                    });
                }
            });
        });
    });

});

var loginShell = `
                    <div class="page">
                        <div class="page-main">
                            <div class="overlay"></div>
                            <div class="masthead anim">
                                <!-- <div class="masthead-bg"></div> -->
                                <div class="container  mastheadheight">
                                    <div class="row h-100">
                                        <div class="col-12 my-auto">
                                            <div class="masthead-content text-dark py-5 py-md-0">
                                                <form class="" method="post">
                                                    <div class="card logincard anim animLv2">
                                                        <div class="text-center mb-3 anim animLv2 animLogo">
                                                            <img src="assets/img/logo.png" class="loginLogo" alt="">
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-title text-center text-white">Inicia sesi&oacute;n </div>
                                                            <div class="form-group anim animLv3">
                                                                <label class="form-label text-white">
                                                                    <svg version="1.1" class="user-icon" x="0px" y="0px" viewBox="-255 347 100 100" xml:space="preserve" height="36px" width="30px">
                                                                        <path class="user-path" d="
                                                                        M-203.7,350.3c-6.8,0-12.4,6.2-12.4,13.8c0,4.5,2.4,8.6,5.4,11.1c0,0,2.2,1.6,1.9,3.7c-0.2,1.3-1.7,2.8-2.4,2.8c-0.7,0-6.2,0-6.2,0
                                                                        c-6.8,0-12.3,5.6-12.3,12.3v2.9v14.6c0,0.8,0.7,1.5,1.5,1.5h10.5h1h13.1h13.1h1h10.6c0.8,0,1.5-0.7,1.5-1.5v-14.6v-2.9
                                                                        c0-6.8-5.6-12.3-12.3-12.3c0,0-5.5,0-6.2,0c-0.8,0-2.3-1.6-2.4-2.8c-0.4-2.1,1.9-3.7,1.9-3.7c2.9-2.5,5.4-6.5,5.4-11.1
                                                                        C-191.3,356.5-196.9,350.3-203.7,350.3L-203.7,350.3z" />
                                                                    </svg>
                                                                    Usuario
                                                                </label>
                                                                <input type="email" class="form-control username submitEnterUser" id="submitEnterUser" placeholder="Ingresa tu usuario">
                                                            </div>
                                                            <div class="form-group anim animLv3">
                                                                <label class="form-label text-white">
                                                                    <svg version="1.1" class="password-icon" x="0px" y="0px" viewBox="-255 347 100 100" height="36px" width="30px">
                                                                        <path class="key-path" d="M-191.5,347.8c-11.9,0-21.6,9.7-21.6,21.6c0,4,1.1,7.8,3.1,11.1l-26.5,26.2l-0.9,10h10.6l3.8-5.7l6.1-1.1
                                                                                l1.6-6.7l7.1-0.3l0.6-7.2l7.2-6.6c2.8,1.3,5.8,2,9.1,2c11.9,0,21.6-9.7,21.6-21.6C-169.9,357.4-179.6,347.8-191.5,347.8z" />
                                                                    </svg>
                                                                    Contraseña
                                                                </label>
                                                                <input type="password" class="form-control password submitEnter" placeholder="Ingresa tu contraseña">
                                                            </div>
                                                            <div class="form-group anim animLv3">
                                                                <label class="custom-control custom-checkbox">
                                                                    <input type="checkbox" class="custom-control-input" />
                                                                    <span class="custom-control-label text-white">Recordarme</span>
                                                                </label>
                                                            </div>
                                                            <div class="form-footer mt-2 anim animLv3">
                                                                <a id="loginBtn" class="btn btn-info btn-block text-white"><i class="fa fa-check-square"></i>Entrar</a>
                                                            </div>
                                                            <!-- <div class="mt-2 anim animLv3" id='googleIn'>
                                                                <a href="#" class="btn btn-google btn-block"><i class="fa fa-google" ></i> Ingrese con Google</a>
                                                            </div> -->
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

var juiceShell = `
                <script class="juice">
                $(document).ready(function() {

                    /* VERIFICAMOS LA CONEXION A INTERNET */
                    setInterval(function() {
                        var formData = new FormData();
                        formData.append('meth', 'none');
                        $.ajax({
                            url: apiURI,
                            type: 'POST',
                            dataType: "json",
                            cache: false,
                            contentType: false,
                            processData: false,
                            timeout: 3000,
                            data: formData,
                            success: function(data) {
                                $('#updateCharts').removeClass("btn-danger").addClass("btn-outline-primary ");
                            },
                            error: function(error) {
                                $('#updateCharts').removeClass("btn-outline-primary").addClass("btn-danger");
                            }
                        });

                    }, 30000);

                    /*           DETECTAMOS SI HAY SESION ALMACENADA               */
                    setTimeout(function() {
                        var userIntel = window.localStorage.getItem("userIntel");
                        if (userIntel) {
                            var jsonObj = $.parseJSON('[' + userIntel + ']');
                            userIntel = jsonObj[0];
                            var isAlready = window.localStorage.getItem("googleAlready");
                            if (isAlready != 'YES') {
                                setTimeout(function() {
                                    showPanel(userIntel.panelUsuario, userIntel.idUsuario);
                                }, 2000);
                            }
                        } else {
                            showPanel();
                        }
                    }, 3000);

                    /*           CIERRE DE SESION               */
                    $(document).on('click', '.logOutBtn', function(e) {
                        $("#loading").fadeIn("fast", function() {
                            window.localStorage.clear();
                                $('.video-background').show();
                                $('body').attr('class', '');
                            showPanel();
                        });
                    });

                    /*           CAMBIAR DE PANEL MOSTRADO             */
                    $(document).on('click', '.changePanel', function(e) {
                        var self = this,
                            userIntel = JSON.parse(window.localStorage.getItem("userIntel")),
                            panelToShow = $(self).attr('data-panel'),
                            userId = $('#sidebarLoaded').attr('userIdPanel');

                        if (panelToShow != userIntel.panelUsuario || panelToShow == 'homeLogo') {
                            if (panelToShow == 'homeLogo') {
                                panelToShow = 'home'
                            }
                            $("#loading").fadeIn("fast", function() {
                                showPanel(panelToShow, userId);
                            });
                        };
                    });

                    /*           INICIAR CON GOOGLE              */
                    $(document).on('click', '#googleIn', function(e) {
                        $(document).find('.g-signin2 > div').click();
                    });

                    /** CAMBIAR DE TEMA */
                    if (window.localStorage.getItem('themePanel') != 'dark' && window.localStorage.getItem('themePanel') != 'light') {
                        window.localStorage.setItem('themePanel', 'light');
                        $('.themePanelDesc').html('Modo Día');
                        $('#themeSidebarSheet').attr('href', 'assets/plugins/toggle-sidebar/sidemenuLight.css');
                        $('#themeSheet').attr('href', "assets/css/dashboardLight.css");
                    } else {
                        if (window.localStorage.getItem('themePanel') == 'dark') {
                            $('.themePanelDesc').html('Modo Noche');
                            $('#themeSidebarSheet').attr('href', 'assets/plugins/toggle-sidebar/sidemenuDark.css');
                            $('#themeSheet').attr('href', "assets/css/dashboardDark.css");
                        } else
                        if (window.localStorage.getItem('themePanel') == 'light') {
                            $('.themePanelDesc').html('Modo Día');
                            $('#themeSidebarSheet').attr('href', 'assets/plugins/toggle-sidebar/sidemenuLight.css');
                            $('#themeSheet').attr('href', "assets/css/dashboardLight.css");
                        }
                    }
                    $(document).on('change', '#themeSwitch', function(e) {
                        if (window.localStorage.getItem('themePanel') == 'dark') {
                            window.localStorage.setItem('themePanel', 'light');
                            $("#loading").fadeIn("fast", function() {
                                $('.themePanelDesc').html('Modo Día');
                                $('#themeSidebarSheet').attr('href', 'assets/plugins/toggle-sidebar/sidemenuLight.css');
                                $('#themeSheet').attr('href', "assets/css/dashboardLight.css");
                                $("#loading").fadeOut("fast");
                            });
                        } else
                        if (window.localStorage.getItem('themePanel') == 'light') {
                            window.localStorage.setItem('themePanel', 'dark');
                            $("#loading").fadeIn("fast", function() {
                                $('.themePanelDesc').html('Modo Noche');
                                $('#themeSidebarSheet').attr('href', 'assets/plugins/toggle-sidebar/sidemenuDark.css');
                                $('#themeSheet').attr('href', "assets/css/dashboardDark.css");
                                $("#loading").fadeOut("fast");
                            });
                        }
                    });
                });

                /** RESUMIMOS LAS LLAMADAS A LA API EN UNA MISMA FUNCION */
                function apiCall(postData, onSuccess) {
                    $.ajax({
                        url: apiURI,
                        type: 'POST',
                        dataType: "json",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: postData,
                        success: function(data) {
                            if (data.scriptResp == "done") {
                                onSuccess(data);
                            } else {
                                console.log('hubo un error en al respuesta.');
                                console.log(data);
                            }
                        },
                        error: function(error) {
                            console.log("Hubo un error de internet, no hubo respuesta de la API");
                            console.log(error);
                        }
                    });
                }
                </script>
`;

/**  ANIMAMOS LA VENTANA DE LOGIN PARA APARECER */
function showLogin() {
    setTimeout(function() {
        $('body div.page').remove();
        $('body').prepend(loginShell);
        $("#loading").fadeOut('slow');
        $(document).find(" div.masthead").velocity("transition.slideLeftBigIn", 200);
        $(document).find("div.masthead .animLv2").delay(500).velocity("transition.slideRightBigIn");
        $(document).find("div.masthead .animLv3").delay(1200).velocity("transition.slideUpBigIn", {
            stagger: 200
        });
        enterSubm();
    }, 100);
}

/** FUNCIONALIDAD DE LOS INPUTS DE LOGIN */
function enterSubm() {
    $('.submitEnterUser').keypress(function(e) {
        if (e.which == 13) {
            $('.submitEnter').focus();
        }
    });
    $('.submitEnter').keypress(function(e) {
        if (e.which == 13) {
            $(document).find('#loginBtn').click();
        }
    });
    setTimeout(function() {
        $(document).find('#submitEnterUser').focus();
    }, 2500);
}

/** Mostramos el contenido del menu seleccionado, si no se ha seleccionado nigun menu retorna la ventana de Login */
function showPanel(p, u) {
    var userIntel = window.localStorage.getItem("userIntel");
    var jsonObj = $.parseJSON('[' + userIntel + ']');
    userIntel = jsonObj[0];
    var formData = new FormData();
    formData.append('panel', p);
    formData.append('user', u);
    formData.append('meth', 'loadPanel');
    return $.ajax({
        url: apiURI,
        type: 'POST',
        dataType: "json",
        cache: false,
        contentType: false,
        timeout: 3000,
        processData: false,
        data: formData,
        success: function(data) {
            if (data.scriptResp == "loaded") {
                $('body div.page').remove();
                $('body script.controller').remove();
                if (data.panelName != 'login') {
                    $('body').attr("class", data.panelName + ' app sidebar-mini');
                    var view = populate(data.panelName, data.panel);
                    localizeImgs(view, function(views) {
                        $(views).insertAfter("#loading");
                        $('body').append(data.control);
                        $('.video-background').hide();
                        userIntel.panelUsuario = data.panelName;
                        userIntel.panelView = views;
                        userIntel.panelControl = data.control;
                        window.localStorage.setItem("userIntel", JSON.stringify(userIntel));
                        $('#updateCharts').removeClass("btn-danger").addClass("btn-outline-primary ");
                        loadSideBar(userIntel.idUsuario);

                        var localPanels = window.localStorage.getItem("localPanels");
                        if (localPanels) {
                            localPanels = $.parseJSON('[' + localPanels + ']');
                            localPanels = localPanels[0];
                        } else {
                            localPanels = {};
                        }
                        localPanels[data.panelName] = {};
                        localPanels[data.panelName].view = views;
                        localPanels[data.panelName].control = data.control;
                        window.localStorage.setItem("localPanels", JSON.stringify(localPanels));
                    });
                } else {
                    showLogin();
                }
            }
        },
        error: function(error) {
            if (userIntel) {
                if (userIntel.login == 'YES') {
                    var localPanels = window.localStorage.getItem("localPanels");
                    if (localPanels) {
                        var isListed = 0;
                        localPanels = $.parseJSON('[' + localPanels + ']');
                        localPanels = localPanels[0];
                        for (var key in localPanels) {
                            if (p == key) {
                                isListed = 1
                                $('body div.page').remove();
                                $('body script.controller').remove();
                                $('body').attr("class", p + ' app sidebar-mini');
                                var view = populate(p, localPanels[key].view);
                                $(view).insertAfter("#loading");
                                $('body').append(localPanels[key].control);
                                $('.video-background').hide();
                                userIntel.panelUsuario = key;
                                userIntel.panelView = localPanels[key].view;
                                userIntel.panelControl = localPanels[key].control;
                                window.localStorage.setItem("userIntel", JSON.stringify(userIntel));
                                $('#updateCharts').removeClass("btn-outline-primary").addClass("btn-danger");
                                loadSideBar(u);
                            }
                        }
                        if (isListed == 0) {
                            $('body div.page').remove();
                            $('body script.controller').remove();
                            $('body').attr("class", userIntel.panelUsuario + ' app sidebar-mini');
                            var view = populate(userIntel.panelUsuario, userIntel.panelView);
                            $(view).insertAfter("#loading");
                            $('body').append(userIntel.panelControl);
                            if (userIntel.panelUsuario != 'login') {
                                $('.video-background').hide();
                                $('#updateCharts').removeClass("btn-outline-primary").addClass("btn-danger");
                                loadSideBar(userIntel.idUsuario);
                                swal({
                                    title: "Lo Sentimos",
                                    text: "No pudimos establecer una conexión con el servidor, revise su internet e intente de nuevo",
                                    type: "error",
                                    showCancelButton: false,
                                    confirmButtonText: 'Entendido',
                                    cancelButtonText: 'salir'
                                });
                            } else {
                                showLogin();
                            }
                        }
                    } else {
                        $('body div.page').remove();
                        $('body script.controller').remove();
                        $('body').attr("class", userIntel.panelUsuario + ' app sidebar-mini');
                        var view = populate(userIntel.panelUsuario, userIntel.panelView);
                        $(view).insertAfter("#loading");
                        $('body').append(userIntel.panelControl);
                        if (userIntel.panelUsuario != 'login') {
                            $('.video-background').hide();
                            loadSideBar(userIntel.idUsuario);
                        } else {
                            showLogin();
                        }
                    }
                }
            } else {
                showLogin();
            }
        }
    });
}

/** EN STA FUNCION POBLAMOS LAS VARIABLES DE LAS PLANTILLAS HTML CON LOS DATOS DE NUESTRA APP */
function populate(panel, code) {
    var userIntel = window.localStorage.getItem("userIntel");
    var jsonObj = $.parseJSON('[' + userIntel + ']');
    userIntel = jsonObj[0];
    code = code.split("___DERECHOSDEAUTOR___").join('<a href="#">Join Iventario </a>© 2020. Todos los derechos reservados.');
    code = code.split("___APPNAME___").join('Sistema de Inventario');
    code = code.split("___APIURI___").join(apiURI);
    if (panel == "home") {
        return code;
    }
    if (panel == "login") {
        return code;
    }
    if (panel == "sideBar") {
        code = code.split("___PATHTOPROFILEPIC___").join(userIntel.userImg);
        code = code.split("___NOMBRESUSUARIO___").join(userIntel.nombreUsuario);
        code = code.split("___ROLUSUARIO___").join(userIntel.rolUsuario);
        code = code.split("___IDUSUARIO___").join(userIntel.idUsuario);
        return code;
    }
    if (panel == "docts") {
        code = code.split("___PATHTOPROFILEPIC___").join(userIntel.userImg);
        return code;
    }
    if (panel == "cats") {
        return code;
    }
    if (panel == "blog") {
        return code;
    }
    if (panel == "users") {
        return code;
    }
    if (panel == "userconfig") {
        return code;
    }
    return code;
}

/** EL USUARIO DEPENDINEDO DE SU ROL RECIBE UN SIDEBAR DIFERENTE */
function loadSideBar(u) {
    console.log('obteniendo sidebar');
    var userData = JSON.parse(window.localStorage.getItem("userIntel"));
    if (userData.sidebarUsuario == undefined) {
        var formData = new FormData();
        formData.append('user', u);
        formData.append('meth', 'showSideBar');
        return $.ajax({
            url: apiURI,
            type: 'POST',
            dataType: "json",
            cache: false,
            contentType: false,
            timeout: 3000,
            processData: false,
            data: formData,
            success: function(data) {
                if (data.scriptResp == "loaded") {
                    var view = populate('sideBar', data.sideb);
                    localizeImgs(view, function(views) {
                        $(views).insertBefore("#appContent");
                        userData.sidebarUsuario = views;
                        window.localStorage.setItem("userIntel", JSON.stringify(userData));
                        fixsb();
                        $("#loading").fadeOut("fast");
                    });
                } else {
                    console.log('hubo un error #45345345789754653');
                }
            },
            error: function(error) {
                console.log("Hubo un error de internet, intente de nuevo");
                console.log(error);
            }
        });
    } else {
        $(userData.sidebarUsuario).insertBefore("#appContent");
        fixsb();
        $("#loading").fadeOut("fast");
    }
}

/** CARGAMOS LA FUNCIONALIDAD DEL SIDEBAR YA QUE ESTAMOS LLAMANDOLO DE FORMA ASINCRONA */
function fixsb() {
    (function() {
        "use strict";

        var slideMenu = $('.side-menu');

        // Toggle Sidebar
        $('[data-toggle="sidebar"]').click(function(event) {
            event.preventDefault();
            $('.app').toggleClass('sidenav-toggled');
        });

        if ($(window).width() > 739) {
            $('.app-sidebar').hover(function(event) {
                event.preventDefault();
                $('.app').removeClass('sidenav-toggled');
            });
        }

        // Activate sidebar slide toggle
        $("[data-toggle='slide']").click(function(event) {
            event.preventDefault();
            if (!$(this).parent().hasClass('is-expanded')) {
                slideMenu.find("[data-toggle='slide']").parent().removeClass('is-expanded');
            }
            $(this).parent().toggleClass('is-expanded');
        });

        // Set initial active toggle
        $("[data-toggle='slide.'].is-expanded").parent().toggleClass('is-expanded');

        //Activate bootstrip tooltips
        $("[data-toggle='tooltip']").tooltip();

    })();

    // searching toggle
    var sp = document.querySelector('.search-open');
    var searchbar = document.querySelector('.search-inline');
    var shclose = document.querySelector('.search-close');

    function changeClass() {
        searchbar.classList.add('search-visible');
    }

    function closesearch() {
        searchbar.classList.remove('search-visible');
    }
    sp.addEventListener('click', changeClass);
    shclose.addEventListener('click', closesearch);
}

/** RECURSOS CONVERTIDOS A LOCAL CANVAS */
function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

function localizeImgs(dom, finished) {
    var ii = 0;
    if ($(dom).find('img').length > ii) {
        $(dom).find('img').each(function(i, n) {
            //console.log('debug LINE');
            //console.log(n);
            toDataUrl($(n).attr('src'), function(myBase64) {
                dom = dom.split($(n).attr('src')).join(myBase64);
                ii++;
                if (ii == $(dom).find('img').length) {
                    finished(dom);
                }
            });
        });
    } else {
        finished(dom);
    }
}