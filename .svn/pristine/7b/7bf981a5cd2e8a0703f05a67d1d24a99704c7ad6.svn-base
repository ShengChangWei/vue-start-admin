/**
 * 获取按照ASCII编码排序 并拼接成如下格式
 * Asdd=dah&UaBcs=2323&Ua_Bcs=234
 */
/* ===============================第一种方法(利用sort方法)========================*/
function sort_ASCII(obj) {
  return Object.keys(obj).sort();
}
/* ===============================第二种方法（使用冒泡排序）========================*/

// function sort_ASCII(obj) {
//     const strArr = Object.keys(obj);
//     let temp = '';
//     for (let i = 0; i < strArr.length - 1; i++) {
//         for (let j = 0; j < strArr.length - 1 - i; j++) {
//             if (strArr[j] > strArr[j + 1]) {
//                 temp = strArr[j];
//                 strArr[j] = strArr[j + 1];
//                 strArr[j + 1] = temp;
//             }
//         }
//     }
//     return strArr
// }

/**
 * 拼接成固定的字符串格式
 * @param {Object} obj
 */
export function getKeyValueSortStr(obj) {
  const strArr = sort_ASCII(obj);
  let longStr = '';
  for (const str in strArr) {
    longStr += strArr[str] + '=' + obj[strArr[str]] + '&';
  }
  return longStr.substring(0, longStr.length - 1);// 移除最后一个 & 符号
}

/* ===============================比较字符串不区分大小写========================*/
// function sort_str(obj) {
//   const strArr = Object.keys(obj);
//   return strArr.sort((a, b) => {
//     return a.localeCompare(b)
//   })
// }
