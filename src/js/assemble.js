// 초성 배열
const f = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
// 중성 배열
const s = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];
// 종성 배열
const t = [
  "", // 종성은 생략 가능한 케이스가 존재함.
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const ga = "가".charCodeAt(0); // 가 (맨 처음 한글 문자)
const hih = "힣".charCodeAt(0); // 힣 (맨 마지막 한글 문자)
const giyeok = "ㄱ".charCodeAt(0); // 'ㄱ' (맨 처음 한글 자음)

let timeoutId = 0;

function showkoreanAllUnicode() {
  let uni = ga;
  while (uni) {
    const kor = String.fromCharCode(uni); // 유니코드를 문자로 변환
    console.log("uniCode :", uni, "// kor : " + kor);

    if (uni === hih) break;

    uni++;
  }
}

function typing(element, txt) {
  return new Promise((resolve) => {
    let idx = 0;
    timeoutId = setInterval(function () {
      if (idx % 3 === 0) {
        // 다음 글자로 넘어갈떄 글자 추가
        element.innerHTML += txt[idx];
      } else {
        // 현재 글자일때 초성, 초성 + 중성, 초성 + 중성 + 종성 순으로 출력
        if (txt[idx] !== "") {
          // 중성, 종성이 공백일때 무시
          element.innerHTML = element.innerHTML.slice(0, -1) + txt[idx];
        }
      }
      idx++;

      if (txt.length <= idx) {
        clearInterval(timeoutId);

        idx = 0;
        resolve(true);
      }
    }, 100);
  });
}

function disassembleKoreanString(char) {
  const uniCode = char.charCodeAt(0) - ga;

  // 한글이 아닐 경우 예외처리
  if (uniCode < 0 || uniCode > hih - giyeok) {
    return [char, "", ""];
  }

  // 종성은 숫자 1마다, 중성은 29마다, 초성은 589마다 값이 변함

  // 초성 배열의 인덱스
  const fIdx = Math.floor(uniCode / 588);
  // 중성 배열의 인덱스
  const sIdx = Math.floor((uniCode - fIdx * 588) / 28);
  // 종성 배열의 인덱스
  const tIdx = Math.floor(uniCode % 28);

  return [
    f[fIdx],
    String.fromCharCode(ga + fIdx * 588 + sIdx * 28),
    t[tIdx] ? String.fromCharCode(ga + fIdx * 588 + sIdx * 28 + tIdx) : "",
  ];
}

// 입력받은 문자열을 쪼갠 결과값을 출력하는 함수
function disassembleString(line) {
  // console.log(line);
  let titleArr = [];

  [...line].forEach((char) => {
    titleArr = titleArr.concat(disassembleKoreanString(char));
  });

  // console.log(titleArr);
  return titleArr;
}

/* ------------------------------------------------------------------------------------- */

async function start() {
  // showkoreanAllUnicode();

  const titleElement = document.getElementsByClassName("title");

  await typing(titleElement[0], disassembleString("곰돌이!!! ABCDE"));
  await typing(titleElement[1], disassembleString("곰순이 abcde"));
}

start();
