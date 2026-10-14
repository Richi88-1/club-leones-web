
document.addEventListener("DOMContentLoaded", function () {

    // ====================================
    // CONFIGURACIÓN GENERAL
    // ====================================

    const portada = document.getElementById("portada");
    const paginaPrincipal = document.getElementById("paginaPrincipal");
    const botonBienvenido = document.getElementById("btnBienvenido");
    const videoFondo = document.getElementById("videoFondo");

    const contactosFlotantes =
        document.getElementById("contactosFlotantes");

    const reducirMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    // ====================================
    // VIDEO DE BIENVENIDA
    // ====================================

    if (videoFondo) {
        videoFondo.muted = true;

        const reproduccion = videoFondo.play();

        if (reproduccion) {
            reproduccion.catch(function () {
                console.log("Reproducción automática bloqueada.");
            });
        }
    }

    // ====================================
    // ENTRAR A LA PÁGINA
    // ====================================

    botonBienvenido.addEventListener("click", function () {

        portada.hidden = true;
        paginaPrincipal.hidden = false;
        contactosFlotantes.hidden = false;

        if (videoFondo) {
            videoFondo.pause();
        }

        window.scrollTo(0, 0);
    });


    // ====================================
    // MENÚ DE CELULARES
    // ====================================

    const menuToggle = document.getElementById("menuToggle");
    const menuPrincipal = document.getElementById("menuPrincipal");

    function cerrarMenu() {
        menuPrincipal.classList.remove("abierto");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
    }

    menuToggle.addEventListener("click", function () {

        const abierto =
            menuPrincipal.classList.toggle("abierto");

        menuToggle.textContent = abierto ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", String(abierto));
        menuToggle.setAttribute(
            "aria-label",
            abierto ? "Cerrar menú" : "Abrir menú"
        );
    });

    menuPrincipal.querySelectorAll("a").forEach(function (enlace) {
        enlace.addEventListener("click", cerrarMenu);
    });


    // ====================================
    // MENÚ AL DESPLAZARSE
    // ====================================

    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function () {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }, { passive: true });


    // ====================================
    // ANIMACIONES DE ENTRADA
    // ====================================

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


    // ====================================
    // FOTOS Y VIDEOS DEL CLUB
    // ====================================

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
            "competencias4.JPG",
            "competencias5.JPG",
            "competencias6.JPG",
            "competencias7.JPG",
            "competencias8.JPG",
            "competencias9.JPG",
            "competencias10.JPG"
        ],

        comunidad: [
            "comunidad1.JPG",
            "comunidad2.JPG",
            "comunidad3.JPG"
        ]

    };

    const nombres = {
        entrenamientos: "ENTRENAMIENTOS",
        competencias: "COMPETENCIAS",
        comunidad: "COMUNIDAD"
    };


    // ====================================
    // VENTANAS DE LAS GALERÍAS
    // ====================================

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


    // ABRIR IMAGEN AMPLIADA

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


    // ABRIR GALERÍA

    function abrirGaleria(categoria) {

        if (!Object.prototype.hasOwnProperty.call(
            galerias,
            categoria
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
                "Próximamente tendremos contenido de esta sección.";
            contenidoGaleria.appendChild(mensaje);
        }

        archivos.forEach(function (archivo, indice) {

            const extension = archivo.split(".").pop().toLowerCase();
            const ruta = encodeURIComponent(archivo);

            const esVideo =
                ["mp4", "webm", "ogg"].includes(extension);

            const esImagen =
                ["jpg", "jpeg", "png", "webp"].includes(extension);

            if (!esVideo && !esImagen) {
                return;
            }

            const tarjeta = document.createElement("div");
            tarjeta.className = "elemento-galeria";

            const descripcion =
                nombres[categoria] + " " + (indice + 1);

            if (esVideo) {

                const video = document.createElement("video");

                video.src = ruta;
                video.controls = true;
                video.preload = "metadata";
                video.playsInline = true;
                video.setAttribute("aria-label", descripcion);

                tarjeta.appendChild(video);
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

                tarjeta.appendChild(imagen);
            }

            const texto = document.createElement("p");
            texto.textContent = descripcion;

            tarjeta.appendChild(texto);
            contenidoGaleria.appendChild(tarjeta);
        });

        ventanaGaleria.showModal();
    }

    // BOTONES DE GALERÍA

    document.querySelectorAll("[data-galeria]")
        .forEach(function (boton) {

            boton.addEventListener("click", function () {
                abrirGaleria(boton.dataset.galeria);
            });

        });


    // CERRAR GALERÍA

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


    // ====================================
    // AUSPICIADORES OFICIALES
    // ====================================

    const auspiciadores = [

        { nombre: "Diesel Service", imagen: "auspiciador1.jpg" },

        { nombre: "MendoLab", imagen: "auspiciador2.jpg" },

        { nombre: "Solución DPF", imagen: "auspiciador3.jpg" },

        { nombre: "Cabaña López", imagen: "auspiciador4.jpg" },

        { nombre: "Rencar Wash", imagen: "auspiciador5.jpg" },

        { nombre: "Oasis Cajas Mecánicas", imagen: "auspiciador6.jpg" },

        { nombre: "DS Tuning", imagen: "auspiciador7.jpg" },

        { nombre: "Passion Motors", imagen: "auspiciador8.jpg" },

        { nombre: "Renca", imagen: "auspiciador9.jpg" }

    ];

    const carruselVentana =
        document.getElementById("carruselVentana");

    const carruselPista =
        document.getElementById("carruselPista");

    const botonAnterior =
        document.getElementById("auspiciadoresAnterior");

    const botonSiguiente =
        document.getElementById("auspiciadoresSiguiente");


    // CREAR TARJETAS

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

    // REPETIR LAS TARJETAS PARA CREAR UN BUCLE

    auspiciadores.forEach(function (auspiciador) {
        carruselPista.appendChild(crearTarjeta(auspiciador, false));
    });

    auspiciadores.forEach(function (auspiciador) {
        carruselPista.appendChild(crearTarjeta(auspiciador, true));
    });


    // ====================================
    // CARRUSEL AUTOMÁTICO
    // ====================================

    let pausadoPorMouse = false;
    let pausadoPorFoco = false;
    let arrastrando = false;
    let visible = false;

    let inicioX = 0;
    let scrollInicial = 0;
    let tiempoAnterior = 0;

    const velocidad = 35;

    function longitudSerie() {

        const tarjetas = carruselPista.children;

        if (tarjetas.length < auspiciadores.length + 1) {
            return 0;
        }

        return tarjetas[auspiciadores.length].offsetLeft -
               tarjetas[0].offsetLeft;
    }

    function normalizarCarrusel() {

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

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entradas) {
            visible = entradas[0].isIntersecting;
        });

        observer.observe(carruselVentana);

    } else {
        visible = true;
    }

    function animarCarrusel(tiempo) {

        const delta = tiempoAnterior
            ? Math.min((tiempo - tiempoAnterior) / 1000, 0.05)
            : 0;

        tiempoAnterior = tiempo;

        if (
            !paginaPrincipal.hidden &&
            visible &&
            !document.hidden &&
            !reducirMovimiento.matches &&
            !pausadoPorMouse &&
            !pausadoPorFoco &&
            !arrastrando
        ) {
            carruselVentana.scrollLeft += velocidad * delta;
            normalizarCarrusel();
        }

        requestAnimationFrame(animarCarrusel);
    }

    requestAnimationFrame(animarCarrusel);


    // DETENER AL PASAR EL MOUSE

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


    // ARRASTRAR CON EL MOUSE

    carruselVentana.addEventListener("pointerdown", function (evento) {

        if (evento.pointerType === "touch" || evento.button !== 0) {
            return;
        }

        arrastrando = true;
        inicioX = evento.clientX;
        scrollInicial = carruselVentana.scrollLeft;

        carruselVentana.classList.add("arrastrando");
        carruselVentana.setPointerCapture(evento.pointerId);
    });

    carruselVentana.addEventListener("pointermove", function (evento) {

        if (!arrastrando) {
            return;
        }

        carruselVentana.scrollLeft =
            scrollInicial - (evento.clientX - inicioX);
    });

    function terminarArrastre() {
        arrastrando = false;
        carruselVentana.classList.remove("arrastrando");
        normalizarCarrusel();
    }

    carruselVentana.addEventListener("pointerup", terminarArrastre);
    carruselVentana.addEventListener("pointercancel", terminarArrastre);
    carruselVentana.addEventListener("lostpointercapture", terminarArrastre);


    // FLECHAS DEL CARRUSEL

    function moverCarrusel(direccion) {

        const tarjeta = carruselPista.querySelector(".auspiciador-card");

        if (!tarjeta) {
            return;
        }

        const estilos = getComputedStyle(carruselPista);
        const separacion = parseFloat(estilos.columnGap) || 0;

        const distancia = tarjeta.offsetWidth + separacion;
        const longitud = longitudSerie();

        if (longitud <= 0) {
            return;
        }

        let nuevaPosicion =
            carruselVentana.scrollLeft + distancia * direccion;

        nuevaPosicion =
            ((nuevaPosicion % longitud) + longitud) % longitud;

        carruselVentana.scrollLeft = nuevaPosicion;
    }

    botonAnterior.addEventListener("click", function () {
        moverCarrusel(-1);
    });

    botonSiguiente.addEventListener("click", function () {
        moverCarrusel(1);
    });

    window.addEventListener("resize", normalizarCarrusel);

});
