function toNumber(str) {
  var n = parseFloat(str);
  return isNaN(n) ? null : n;
}

function convertTemp(value, unit) {
  if (unit === 'C') {
    return value * 9 / 5 + 32;
  } else if (unit === 'F') {
    return (value - 32) * 5 / 9;
  } else {
    return null;
  }
}

var input = prompt('請輸入溫度（ex:30C 或 30F）：');

if (!input) {
  alert('未輸入內容！');
} else {
  var unit = input.slice(-1).toUpperCase();
  var value = toNumber(input.slice(0, -1));
  var result = convertTemp(value, unit);

  var output = '';
  if (result === null || value === null) {
    output = '輸入格式錯誤！請輸入如 30C 或 86F。';
  } else {
    if (unit === 'C') {
      output = value + 'C = ' + result.toFixed(2) + 'F';
    } else if (unit === 'F') {
      output = value + 'F = ' + result.toFixed(2) + 'C';
    } else {
      output = '未知的單位：' + unit;
    }
  }

  alert(output);
  document.getElementById('result').textContent = output;
}