function guessGame() {
  var answer = Math.floor(Math.random() * 100) + 1;
  var count = 0;
  var guess = null;
   var resultBox = document.getElementById('result');

  while (guess !== answer) {
    var input = prompt('請輸入你猜的數字 (1~100)：');
    if (input === null) {
      alert('遊戲結束。');
      return;
    }

    guess = parseInt(input);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      alert('請輸入 1 到 100 的整數！');
      continue;
    }

    count++;
    if (guess > answer) {
      alert('再小一點！');
    } else if (guess < answer) {
      alert('再大一點！');
    } else {
      alert('答對，你總共猜了' + count + '次。');
      resultBox.textContent = '答案：' + answer + '\n猜了' + count + '次';
    }
  }
}

guessGame();