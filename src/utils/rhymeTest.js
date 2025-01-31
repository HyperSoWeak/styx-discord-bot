import pinyin from 'pinyin';

function extractRhyme(pinyinStr) {
  const rhymePattern = /[aeiouü]+(?:ng|n)?$/i;
  const match = pinyinStr.match(rhymePattern);
  if (!match) return '';
  const result = match[0].endsWith('ng') ? match[0].slice(0, -1) : match[0];
  return result;
}

function getRhymeForChineseChar(chineseChar) {
  const pinyinResult = pinyin.pinyin(chineseChar, { style: 'NORMAL' });

  if (pinyinResult && pinyinResult[0] && pinyinResult[0][0]) {
    const fullPinyin = pinyinResult[0][0];
    return extractRhyme(fullPinyin);
  }

  return '';
}

function checkIfRhymes(char1, char2) {
  const rhyme1 = getRhymeForChineseChar(char1);
  const rhyme2 = getRhymeForChineseChar(char2);

  if (!rhyme1 || !rhyme2) return false;

  if (rhyme1 === 'un' && rhyme2 === 'in') return true;
  if (rhyme1 === 'in' && rhyme2 === 'un') return true;

  return rhyme1.endsWith(rhyme2) || rhyme2.endsWith(rhyme1);
}

function analyzeRhymes(text) {
  const lines = text.split(/[\s,，。；、]+/);

  let count = 0;
  let isDouble = false;
  let rhymeList = [];

  for (let i = 1; i < lines.length; i++) {
    const line1 = lines[i - 1];
    const line2 = lines[i];

    const char11 = line1[line1.length - 1];
    const char21 = line2[line2.length - 1];

    const result = checkIfRhymes(char11, char21);

    if (!result) break;

    let double = false;

    if (line1.length >= 2 && line2.length >= 2) {
      const char12 = line1[line1.length - 2];
      const char22 = line2[line2.length - 2];
      double = checkIfRhymes(char12, char22);
    }

    if (count === 0) {
      isDouble = double;
    } else {
      if (isDouble && !double) break;
    }

    count++;
    if (isDouble) {
      if (count === 1) rhymeList.push(line1.slice(-2));
      rhymeList.push(line2.slice(-2));
    } else {
      if (count === 1) rhymeList.push(char11);
      rhymeList.push(char21);
    }
  }

  return { count, isDouble, rhymeList };
}

async function rhymeTest(message) {
  const result = analyzeRhymes(message.content);
  if (result.count >= 1) {
    const rhymeList = result.rhymeList.join(' ');
    const response = `${result.isDouble ? '雙押' : '單押'} x${result.count}\n${rhymeList}`;
    await message.reply(response);
  }
}

export default rhymeTest;
