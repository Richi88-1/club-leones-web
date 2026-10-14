
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // PORTADA DE BIENVENIDA
    // =====================================

    const botonBienvenido =
        document.getElementById("btnBienvenido");

    const portada =
        document.getElementById("portada");

    const paginaPrincipal =
        document.getElementById("paginaPrincipal");

    const videoFondo =
        document.getElementById("videoFondo");

    const instagramFlotante =
        document.getElementById("instagramFlotante");

    if (videoFondo) {
        videoFondo.muted = true;

        const reproduccion = videoFondo.play();

        if (reproduccion) {
            reproduccion.catch(function () {
                console.log("Reproducción automática no disponible.");
            });
        }
    }

    botonBienvenido.addEventListener("click", function () {
        portada.hidden = true;
        paginaPrincipal.hidden = false;
        instagramFlotante.hidden = false;

        if (videoFondo) {
            videoFondo.pause();
        }

        window.scrollTo(0, 0);
    });


    // =====================================
    // MENÚ PARA CELULARES
    // =====================================

    const menuToggle =
        document.getElementById("menuToggle");

    const menuPrincipal =
        document.getElementById("menuPrincipal");

    function cerrarMenu() {
        menuPrincipal.classList.remove("abierto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        menuToggle.textContent = "☰";
    }

    menuToggle.addEventListener("click", function () {
        const abierto =
            menuPrincipal.classList.toggle("abierto");

        menuToggle.setAttribute(
            "aria-expanded",
            String(abierto)
        );

        menuToggle.setAttribute(
            "aria-label",
            abierto ? "Cerrar menú" : "Abrir menú"
        );

        menuToggle.textContent = abierto ? "✕" : "☰";
    });

    menuPrincipal.querySelectorAll("a").forEach(function (enlace) {
        enlace.addEventListener("click", cerrarMenu);
    });


    // =====================================
    // EFECTO DEL MENÚ AL BAJAR
    // =====================================

    const navbar = document.getElementById("navbar");

    function actualizarNavbar() {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }

    window.addEventListener(
        "scroll",
        actualizarNavbar,
        { passive: true }
    );


    // =====================================
    // ANIMACIONES AL BAJAR
    // =====================================

    const reducirMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const elementosAnimados =
        document.querySelectorAll(".reveal");

    if (
        "IntersectionObserver" in window &&
        !reducirMovimiento.matches
    ) {
        const observador = new IntersectionObserver(
            function (entradas, observer) {
                entradas.forEach(function (entrada) {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visible");
                        observer.unobserve(entrada.target);
                    }
                });
            },
            {
                threshold: 0.05,
                rootMargin: "0px 0px 60px 0px"
            }
        );

        elementosAnimados.forEach(function (elemento) {
            observador.observe(elemento);
        });

        document.documentElement.classList.add(
            "animaciones-activas"
        );
    }


    // =====================================
    // FOTOS Y VIDEOS DEL CLUB
    // =====================================

    const galerias = {
        entrenamientos: [
            "Entrenamiento1.mp4",
            "Entrenamiento2.jpeg",
            "Entrenamiento3.jpeg"
        ],

        competencias: [
            "competencias1.JPG",
            "competencias2.JPG",
            "competencias3.JPG",
            "competencias4.JPG"
        ],

        comunidad: [
            // Agrega aquí las fotos futuras:
            // "comunidad1.jpg"
        ]
    };

    const nombres = {
        entrenamientos: "ENTRENAMIENTOS",
        competencias: "COMPETENCIAS",
        comunidad: "COMUNIDAD"
    };

    const ventanaGaleria =
        document.getElementById("ventanaGaleria");

    const tituloGaleria =
        document.getElementById("tituloGaleria");

    const contenidoGaleria =
        document.getElementById("contenidoGaleria");

    const cerrarGaleria =
        document.getElementById("cerrarGaleria");

    const visorImagen =
        document.getElementById("visorImagen");

    const imagenGrande =
        document.getElementById("imagenGrande");

    const cerrarVisor =
        document.getElementById("cerrarVisor");

    function ampliarFotografia(ruta, descripcion) {
        imagenGrande.src = ruta;
        imagenGrande.alt = descripcion;
        visorImagen.showModal();
    }

    cerrarVisor.addEventListener("click", function () {
        visorImagen.close();
    });

    visorImagen.addEventListener("click", function (evento) {
        if (evento.target === visorImagen) {
            visorImagen.close();
        }
    });

    visorImagen.addEventListener("close", function () {
        imagenGrande.removeAttribute("src");
    });

    function abrirGaleria(categoria) {

        if (!Object.prototype.hasOwnProperty.call(
            galerias, categoria
        )) {
            return;
        }

        tituloGaleria.textContent = nombres[categoria];
        contenidoGaleria.replaceChildren();

        const archivos = galerias[categoria];

        if (archivos.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.className = "mensaje-vacio";
            mensaje.textContent =
                "Próximamente compartiremos fotos y videos de esta sección.";

            contenidoGaleria.appendChild(mensaje);
        }

        archivos.forEach(function (archivo, indice) {

            const extension =
                archivo.split(".").pop().toLowerCase();

            const ruta = encodeURIComponent(archivo);

            const esVideo =
                ["mp4", "webm", "ogg"].includes(extension);

            const esImagen =
                ["jpg", "jpeg", "png", "webp"].includes(extension);

            if (!esVideo && !esImagen) {
                return;
            }

            const elemento = document.createElement("div");
            elemento.className = "elemento-galeria";

            const descripcion =
                nombres[categoria] + " " + (indice + 1);

            if (esVideo) {
                const video = document.createElement("video");
                video.src = ruta;
                video.controls = true;
                video.preload = "metadata";
                video.playsInline = true;
                video.setAttribute("aria-label", descripcion);
                elemento.appendChild(video);
            }

            if (esImagen) {
                const imagen = document.createElement("img");
                imagen.src = ruta;
                imagen.alt = descripcion;
                imagen.loading = "lazy";
                imagen.tabIndex = 0;
                imagen.setAttribute("role", "button");
                imagen.setAttribute(
                    "aria-label",
                    "Ampliar " + descripcion
                );

                imagen.addEventListener("click", function () {
                    ampliarFotografia(ruta, descripcion);
                });

                imagen.addEventListener("keydown", function (evento) {
                    if (
                        evento.key === "Enter" ||
                        evento.key === " "
                    ) {
                        evento.preventDefault();
                        ampliarFotografia(ruta, descripcion);
                    }
                });

                elemento.appendChild(imagen);
            }

            const texto = document.createElement("p");
            texto.textContent = descripcion;

            elemento.appendChild(texto);
            contenidoGaleria.appendChild(elemento);
        });

        ventanaGaleria.showModal();
    }

    document.querySelectorAll("[data-galeria]")
        .forEach(function (boton) {
            boton.addEventListener("click", function () {
                abrirGaleria(boton.dataset.galeria);
            });
        });

    cerrarGaleria.addEventListener("click", function () {
        ventanaGaleria.close();
    });

    ventanaGaleria.addEventListener("click", function (evento) {
        if (evento.target === ventanaGaleria) {
            ventanaGaleria.close();
        }
    });

    ventanaGaleria.addEventListener("close", function () {
        contenidoGaleria.querySelectorAll("video")
            .forEach(function (video) {
                video.pause();
            });
    });


    // =====================================
    // AUSPICIADORES OFICIALES
    // =====================================

    /*
       Guarda las imágenes con estos nombres
       directamente dentro de leonesWeb.

       Puedes cambiar las extensiones aquí
       si algún archivo es PNG o JPEG.
    */

    const auspiciadores = [
        {
            nombre: "Diesel Service",
            imagen: "auspiciador1.jpg"
        },
        {
            nombre: "MendoLab",
            imagen: "auspiciador2.jpg"
        },
        {
            nombre: "Solución DPF Diésel Motor",
            imagen: "auspiciador3.jpg"
        },
        {
            nombre: "Cabaña López",
            imagen: "auspiciador4.jpg"
        },
        {
            nombre: "Rencar Wash",
            imagen: "auspiciador5.jpg"
        },
        {
            nombre: "Oasis Cajas Mecánicas",
            imagen: "auspiciador6.jpg"
        },
        {
            nombre: "DS Tuning",
            imagen: "auspiciador7.jpg"
        },
        {
            nombre: "Passion Motors",
            imagen: "auspiciador8.jpg"
        },
        {
            nombre: "Renca",
            imagen: "auspiciador9.jpg"
        }
    ];


    // =====================================
    // CREAR TARJETAS DE AUSPICIADORES
    // =====================================

    const carruselVentana =
        document.getElementById("carruselVentana");

    const carruselPista =
        document.getElementById("carruselPista");

    const botonAnterior =
        document.getElementById("auspiciadoresAnterior");

    const botonSiguiente =
        document.getElementById("auspiciadoresSiguiente");

    function crearTarjeta(auspiciador, copia) {

        const tarjeta = document.createElement("div");
        tarjeta.className = "auspiciador-card";

        if (copia) {
            tarjeta.setAttribute("aria-hidden", "true");
        }

        const cajaImagen = document.createElement("div");
        cajaImagen.className = "auspiciador-logo-contenedor";

        const imagen = document.createElement("img");
        imagen.className = "auspiciador-logo";
        imagen.src = encodeURIComponent(auspiciador.imagen);
        imagen.alt = copia ? "" : "Logo de " + auspiciador.nombre;
        imagen.loading = "lazy";
        imagen.draggable = false;

        const nombre = document.createElement("p");
        nombre.className = "auspiciador-nombre";
        nombre.textContent = auspiciador.nombre;

        cajaImagen.appendChild(imagen);
        tarjeta.appendChild(cajaImagen);
        tarjeta.appendChild(nombre);

        return tarjeta;
    }

    // DOS SERIES PARA PRODUCIR EL BUCLE INFINITO

    auspiciadores.forEach(function (auspiciador) {
        carruselPista.appendChild(
            crearTarjeta(auspiciador, false)
        );
    });

    auspiciadores.forEach(function (auspiciador) {
        carruselPista.appendChild(
            crearTarjeta(auspiciador, true)
        );
    });


    // =====================================
    // MOVIMIENTO CONTINUO DEL CARRUSEL
    // =====================================

    let pausadoPorMouse = false;
    let pausadoPorFoco = false;
    let arrastrando = false;
    let visibleEnPantalla = false;

    let inicioArrastre = 0;
    let desplazamientoInicial = 0;

    let tiempoAnterior = 0;

    const velocidad = 35; // Píxeles por segundo

    // Distancia exacta entre ambas series.
    function longitudSerie() {
        const tarjetas = carruselPista.children;

        if (tarjetas.length < 2) {
            return 0;
        }

        return (
            tarjetas[auspiciadores.length].offsetLeft -
            tarjetas[0].offsetLeft
        );
    }

    // Mantener el desplazamiento dentro del primer ciclo.
    function normalizarPosicion() {

        const longitud = longitudSerie();

        if (longitud <= 0) {
            return;
        }

        if (carruselVentana.scrollLeft >= longitud) {
            carruselVentana.scrollLeft -= longitud;
        }

        if (carruselVentana.scrollLeft < 0) {
            carruselVentana.scrollLeft += longitud;
        }
    }

    // Detectar cuándo la sección está visible.
    if ("IntersectionObserver" in window) {

        const observadorCarrusel = new IntersectionObserver(
            function (entradas) {
                visibleEnPantalla = entradas[0].isIntersecting;
            },
            {
                threshold: 0.01
            }
        );

        observadorCarrusel.observe(carruselVentana);

    } else {
        visibleEnPantalla = true;
    }

    function animarCarrusel(tiempo) {

        const delta = tiempoAnterior
            ? Math.min((tiempo - tiempoAnterior) / 1000, 0.05)
            : 0;

        tiempoAnterior = tiempo;

        const puedeMoverse =
            !paginaPrincipal.hidden &&
            visibleEnPantalla &&
            !document.hidden &&
            !reducirMovimiento.matches &&
            !pausadoPorMouse &&
            !pausadoPorFoco &&
            !arrastrando;

        if (puedeMoverse && longitudSerie() > 0) {

            carruselVentana.scrollLeft += velocidad * delta;

            normalizarPosicion();
        }

        requestAnimationFrame(animarCarrusel);
    }

    requestAnimationFrame(animarCarrusel);


    // =====================================
    // PAUSAR AL PASAR EL MOUSE
    // =====================================

    carruselVentana.addEventListener("mouseenter", function () {
        pausadoPorMouse = true;
    });

    carruselVentana.addEventListener("mouseleave", function () {
        pausadoPorMouse = false;
    });

    carruselVentana.addEventListener("focusin", function () {
        pausadoPorFoco = true;
    });

    carruselVentana.addEventListener("focusout", function (evento) {
        if (!carruselVentana.contains(evento.relatedTarget)) {
            pausadoPorFoco = false;
        }
    });


    // =====================================
    // ARRASTRAR CON EL MOUSE
    // =====================================

    carruselVentana.addEventListener("pointerdown", function (evento) {

        if (evento.pointerType === "touch") {
            return;
        }

        if (evento.button !== 0) {
            return;
        }

        arrastrando = true;

        inicioArrastre = evento.clientX;
        desplazamientoInicial = carruselVentana.scrollLeft;

        carruselVentana.classList.add("arrastrando");

        carruselVentana.setPointerCapture(evento.pointerId);
    });

    carruselVentana.addEventListener("pointermove", function (evento) {

        if (!arrastrando) {
            return;
        }

        const distancia = evento.clientX - inicioArrastre;

        carruselVentana.scrollLeft =
            desplazamientoInicial - distancia;
    });

    function terminarArrastre() {
        if (!arrastrando) {
            return;
        }

        arrastrando = false;

        carruselVentana.classList.remove("arrastrando");

        normalizarPosicion();
    }

    carruselVentana.addEventListener(
        "pointerup",
        terminarArrastre
    );

    carruselVentana.addEventListener(
        "pointercancel",
        terminarArrastre
    );

    carruselVentana.addEventListener(
        "lostpointercapture",
        terminarArrastre
    );


    // =====================================
    // FLECHAS DEL CARRUSEL
    // =====================================

    function moverCarrusel(direccion) {

        // Aproximadamente una tarjeta cada vez.
        const primeraTarjeta =
            carruselPista.querySelector(".auspiciador-card");

        if (!primeraTarjeta) {
            return;
        }

        const distancia =
            primeraTarjeta.getBoundingClientRect().width + 22;

        let posicion =
            carruselVentana.scrollLeft +
            distancia * direccion;

        const longitud = longitudSerie();

        if (longitud > 0) {
            posicion = ((posicion % longitud) + longitud) % longitud;
        }

        carruselVentana.scrollLeft = posicion;
    }

    botonAnterior.addEventListener("click", function () {
        moverCarrusel(-1);
    });

    botonSiguiente.addEventListener("click", function () {
        moverCarrusel(1);
    });


    // =====================================
    // AJUSTES DE TAMAÑO
    // =====================================

    window.addEventListener("resize", function () {
        normalizarPosicion();
    });

});
