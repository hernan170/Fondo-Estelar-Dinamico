 // --- Lógica del Fondo de Estrellas (del ejemplo anterior) ---
        const canvas = document.getElementById('starfield');
        const ctx = canvas.getContext('2d');
        const numStars = 1000; // Número de estrellas
        let stars = [];

        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        function initStars() {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speed: Math.random() * 0.5 + 0.1,
                    color: getRandomColor(),
                    targetColor: getRandomColor(),
                    colorProgress: 1,
                    colorDuration: Math.random() * 300 + 100
                });
            }
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        }

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                star.x -= star.speed;
                if (star.x < 0) {
                    star.x = canvas.width;
                    star.y = Math.random() * canvas.height;
                    star.color = getRandomColor();
                    star.targetColor = getRandomColor();
                    star.colorProgress = 0;
                    star.colorDuration = Math.random() * 300 + 100;
                }

                if (star.colorProgress < star.colorDuration) {
                    star.colorProgress++;
                    if (star.colorProgress === star.colorDuration) {
                        star.color = star.targetColor;
                        star.targetColor = getRandomColor();
                        star.colorProgress = 0;
                        star.colorDuration = Math.random() * 300 + 100;
                    }
                }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.fill();
            });
        }

        function animate() {
            drawStars();
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('load', () => {
            resizeCanvas();
            animate();
        });

        // --- Lógica del Menú Lateral ---
        function openNav() {
            document.getElementById("mySidenav").style.width = "250px"; // Ancho del menú abierto
            // Opcional: Empuja el contenido principal a la derecha
            // document.querySelector(".main-content").style.marginLeft = "250px";
        }

        function closeNav() {
            document.getElementById("mySidenav").style.width = "0"; // Cierra el menú
            // Opcional: Regresa el contenido principal a su posición original
            // document.querySelector(".main-content").style.marginLeft = "0";
        }