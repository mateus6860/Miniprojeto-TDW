document.addEventListener("DOMContentLoaded", function () {

    const url = "https://harry-potter-api-en.onrender.com/db";


    // Função remover efeitos do botão
    function clearEffects() {

        const houseButtons = document.querySelectorAll(".houseBtn");
        houseButtons.forEach(function (button) {
            button.classList.remove("correct", "incorrect");
        });
    }

    function generateRandomCharacter() {
        fetch(url)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {

                // Personagem aleatória
                const characters = data.characters;
                const randomNum = Math.floor(Math.random() * characters.length);
                const randomCharacter = characters[randomNum];

                // Mostrar personagem aleatória
                document.getElementById("main-row").innerHTML =
                    '<img class="character-image" src="' + randomCharacter.image + '">';

                clearEffects();

                // Adicionar EventListener "click" a cada botão
                const houseButtons = document.querySelectorAll(".houseBtn");
                houseButtons.forEach(function (button) {
                    button.addEventListener("click", function () {

                        // Limpar efeitos do botão
                        this.classList.remove("correct", "incorrect");

                        const clickedHouse = this.value;

                        if (clickedHouse === randomCharacter.hogwartsHouse) {
                            this.classList.add("correct");
                        } else {
                            this.classList.add("incorrect");
                        }
                    });
                });

            }).catch((error) => console.log(error));
    }

    // Gerar personagem quando se abre a página
    generateRandomCharacter();

    // Botão gerar personagem
    document.getElementById("generate-btn").addEventListener("click", function () {
        generateRandomCharacter();
    });
});


