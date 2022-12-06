const getfullkey = (key)=>{
let arr = []
for (let i = 97; i < 97+26; i+=1){
    if (i !== 106)
    arr = [...arr, String.fromCharCode(i)]
}

let key_arr = Array.from(key);

for (let i = 0; i< 25; i+=1){
    if (!key_arr.includes(arr[i]))
    key_arr = [...key_arr, arr[i]]
}

return key_arr.join("")
}

const getkeysquare = (key) => {
    key = getfullkey(key);
    console.log(key);
    let square = []
    for (let i = 0; i <5; i++){
        let row = []
        for (let j = 0; j < 5; j++){
            row = [...row, key[i*5 +j]]
        }
        square = [...square, row]
    }
    return square
}

const getPairs = (plainText, cipherText) => {
    plainText = plainText.toLowerCase().trim().replace(" ", "").replace("-", "").replace(".", "");
    cipherText = cipherText.toUpperCase().trim().replace(" ", "");
    let pairs = [];
    for (let i = 0; i < plainText.length; i+=2){
        pairs = [...pairs, [plainText.charAt(i)+plainText.charAt(i+1), cipherText.charAt(i)+cipherText.charAt(i+1)]];
    }
    return pairs;
}

const getCommonPairs = (plainText, cipherText) => {
    let pairs = getPairs(plainText,cipherText)
    let commonLetters = []
    for (let i = 0; i < pairs.length;i++){
        let [plain, cypher] = pairs[i]
        console.log(plain);
        plain = plain.toLowerCase();
        cypher = cypher.toLowerCase();
        if (cypher.includes(plain[0]) ||cypher.includes(plain[1])){
        commonLetters = [...commonLetters, [pairs[i][0], pairs[i][1], String(i)]];
        }
    }
    return commonLetters;
}

const cypher = (a, b , square) => {
    if (a === 'j'){
        a = 'i'
    }
    if (b === 'j'){
        b = 'i'
    }

    let row_a = 0
    let row_b = 0
    let col_a = 0
    let col_b = 0


    let cypher_a;
    let cypher_b;
    for (let i = 0; i < square.length;i++){
        for (let j = 0; j < square.length;j++){
            
            if (square[i][j] === a){
            row_a = i
            col_a = j
            }

          if (square[i][j] === b){
            row_b = i
            col_b = j
          }
    
        }
    }
    console.log("here");
    if (row_a === row_b){
        cypher_a = square[row_a][(col_a +1)%5]
        cypher_b = square[row_a][(col_b +1)%5]
      }


    else if (col_a === col_b){
        cypher_a = square[(row_a+1)%5][col_a]
        cypher_b = square[(row_b+1)%5][col_b]
    }

    else{
        cypher_a = square[row_a][col_b]
        cypher_b = square[(row_b)][col_a]
    }
    return cypher_a + cypher_b;


}

const runCypher = (plaintext, key) => {
    plaintext = plaintext.toLowerCase().trim().replace(" ", "").replace("-", "").replace(".", "");
    let keysquare = getkeysquare(key);
    console.log(keysquare);

    let res = "";
    for (let i = 0; i<plaintext.length; i = i+2){
        console.log("here1");
        res += cypher(plaintext.charAt(i),plaintext.charAt(i+1), keysquare);
    }
    return res;
}

const runDecypher = (cyphertext, key) => {
    cyphertext = cyphertext.toUpperCase().trim().replace(" ", "");
    let keysquare = getkeysquare(key);
    let res = "";
    for (let i = 0; i<cyphertext.length; i = i+2){
        res += decypher(cyphertext.charAt(i),cyphertext.charAt(i+1), keysquare);
    }
    return res;

}

const decypher = (a, b , square) => {
    if (a === 'j'){
        a = 'i'
    }
    if (b === 'j'){
        b = 'i'
    }

    a = a.toLowerCase()
    b= b.toLowerCase()

    let row_a = -1
    let row_b = -1
    let col_a = -1
    let col_b = -1

    let cypher_a;
    let cypher_b;
    for (let i = 0; i < square.length;i++){
        for (let j = 0; j < square.length;j++){

            if (square[i][j] === a){
            row_a = i
            col_a = j
            }

          if (square[i][j] === b){
            row_b = i
            col_b = j
          }
    
        }
    }

    console.log(row_a)

    if (row_a === row_b){
        if (col_a - 1 < 0){
            cypher_a = square[row_a][4]
        }
        else {
            cypher_a = square[row_a][(col_a -1)%5]
        }
        if (col_b - 1 < 0){
            cypher_b = square[row_a][4]
        }
        else {
            cypher_b = square[row_a][(col_b -1)%5]
        }
      }


      else if (col_a === col_b){
        if (row_a - 1 < 0){
            cypher_a = square[4][col_a]
        }
        else {
            cypher_a = square[(row_a-1)%5][col_a]
        }
        if (row_b - 1 < 0){
            cypher_b = square[4][col_b]
        }
        else {
            cypher_b = square[(row_b-1)%5][col_b]
        }
      }

      else{
        cypher_a = square[row_a][col_b]
        cypher_b = square[(row_b)][col_a]
      }

      return cypher_a + cypher_b;


}



export {runCypher as runCypher,
    runDecypher as runDecypher,
    getPairs as getPairs,
getCommonPairs as getCommonPairs};


