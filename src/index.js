
const player1 = {
    Nome: "Mario",
    Velocidade: 4,
    Manobrabilidade: 3,
    Poder: 3,
    Pontos: 0
};

const player2 = {
    Nome: "Luigi",
    Velocidade: 3,
    Manobrabilidade: 4,
    Poder: 4,
    Pontos: 0
};

async function roll_dice() {
    return Math.floor(Math.random() * 6) + 1;
}
// função 'Math.random()' serve para chamar um numero aleatório.
// função 'Math.floor()' serve para arrendodar o número para inteiro.
// 'async' para que a função comem um após o outro, assíncrono.

async function get_random_block() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "Reta";
            break;
        case random < 0.66:
            result = "Curva";
            break;
        default:
            result = "Confronto";
    }
    return result;
}

async function log_roll_result (character_name, block, dice_result, attribute) {
    console.log(`${character_name} 🎲 rolou um dado de ${block} ${dice_result} + ${attribute} = ${dice_result + attribute}`);
}

async function play_race_engine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

    // sortear bloco   
    let block = await get_random_block();
    console.log(`Bloco: ${block}`);

    // rolar dados
    let dice_result1 = await roll_dice();
    let dice_result2 = await roll_dice();

    // teste de habilidade
    let total_test_skill1 = 0;
    let total_test_skill2 = 0;

    if (block === "Reta"){
        total_test_skill1 = dice_result1 + character1.Velocidade;
        total_test_skill2 = dice_result2 + character2.Velocidade;

        await log_roll_result(
            character1.Nome,
            "velocidade",
            dice_result1,
            character1.Velocidade
        );

        await log_roll_result(
            character2.Nome,
            "velocidade",
            dice_result2,
            character2.Velocidade
        );
    }

    if (block === "Curva"){
        total_test_skill1 = dice_result1 + character1.Manobrabilidade;
        total_test_skill2 = dice_result2 + character2.Manobrabilidade;

        await log_roll_result(
            character1.Nome,
            "manobrabilidade",
            dice_result1,
            character1.Manobrabilidade
        );

        await log_roll_result(
            character2.Nome,
            "manobrabilidade",
            dice_result2,
            character2.Manobrabilidade
        );
    } 

    if (block === "Confronto"){
        let power_result1 = dice_result1 + character1.Poder;
        let power_result2 = dice_result2 + character2.Poder;

        console.log(`${character1.Nome} confrontou com ${character2.Nome}! 🥊`);

        
        await log_roll_result(
            character1.Nome,
            "poder",
            dice_result1,
            character1.Poder
        );

        await log_roll_result(
            character2.Nome,
            "poder",
            dice_result2,
            character2.Poder
        );

        if (power_result1 > power_result2 && character2.Pontos > 0){
            console.log(`${character1.Nome} venceu o confronto! ${character2.Nome} perdeu 1 ponto 🐢`);
            character2.Pontos--;
        }
        if (power_result2 > power_result1 && character1.Pontos > 0){
            console.log(`${character2.Nome} venceu o confronto! ${character1.Nome} perdeu 1 ponto 🐢`);
            character1.Pontos--;
        }


        // if ternário.
        // character2.Pontos -= power_result1 > power_result2 && character2.Pontos > 0 ? 1 : 0;
        // character1.Pontos -= power_result2 > power_result1 && character1.Pontos > 0 ? 1 : 0;
      
        console.log(power_result2 === power_result1 ? 
            "Confronto empatado! Nenhum ponto foi perdido" : "");   
    }  


    // verificando o vencedor.
    if (total_test_skill1 > total_test_skill2) {
        console.log(`${character1.Nome} marcou um ponto!`);
        character1.Pontos++;
    } else if (total_test_skill2 > total_test_skill1) {
        console.log(`${character2.Nome} marcou um ponto!`);
        character2.Pontos++;
    }

    console.log("-----------------------------------");

    }
}

async function declare_winner(character1, character2){
    console.log("Resultado final:");
    console.log(`${character1.Nome}: ${character1.Pontos} ponto(s)`);
    console.log(`${character2.Nome}: ${character2.Pontos} ponto(s)`);

    if (character1.Pontos > character2.Pontos)
        console.log(`\n${character1.Nome} venceu a corrida! Parabéns!`);
     else if (character2.Pontos > character1.Pontos)
        console.log(`\n${character2.Nome} venceu a corrida! Parabens!`)
     else console.log("A corrida terminou em empate");
    
}


    
// função motor da corrida.
(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.Nome} e ${player2.Nome} começando...\n`);

    // 'await' para a função esperar executar uma para ir para outra.
    await play_race_engine(player1, player2); 
    await declare_winner(player1, player2);
})();
// é uma função auto invocável.
// botao 'windwns.' abre a janela de emoji.

