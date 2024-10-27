document.addEventListener("DOMContentLoaded", function () {

    const url = "https://harry-potter-api-en.onrender.com/db";

    let score = 0;


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

                console.log(randomCharacter.nickname);
                console.log(randomCharacter.character);

                // Mostrar personagem aleatória
                document.getElementById("main-row").innerHTML =

                    '<img class="character-image" src="' + randomCharacter.image + '">';

                const inputBox = document.getElementById("input");

                const enterBtn = document.getElementById("enter-btn");

                function checkInput() {

                    const characterImage = document.querySelector(".character-image");

                    // Caso o valor do input seja igual ao "nickname" OU "character"
                    if (inputBox.value.toLowerCase() === randomCharacter.nickname.toLowerCase() || inputBox.value.toLowerCase() === randomCharacter.character.toLowerCase()) {

                        // FEEDBACK: Efeitos visuais
                        characterImage.classList.add("gold-glow");

                        // Generate magic dots
                        for (let i = 0; i < 50; i++) {
                            const dot = document.createElement("div");
                            dot.classList.add("magic-dot");
                            dot.style.left = `${Math.random() * 100}vw`;
                            dot.style.top = `${Math.random() * 100}vh`;
                            document.body.appendChild(dot);

                            // Remove dot after animation
                            dot.addEventListener("animationend", () => {
                                dot.remove();
                            });
                        }

                        // Limpar input
                        inputBox.value = "";

                    } else {
                        // Incorrect Guess: Shake Effect
                        characterImage.classList.add("shake");

                        // Remove the shake effect after animation ends
                        characterImage.addEventListener("animationend", () => {
                            characterImage.classList.remove("shake");
                        });
                    }
                }


                enterBtn.addEventListener("click", checkInput)


            }).catch((error) => console.log(error));
    }

    // botão gerar personagem

    generateRandomCharacter();

    document.getElementById("generate-btn").addEventListener("click", function () {
        generateRandomCharacter();
    });

});