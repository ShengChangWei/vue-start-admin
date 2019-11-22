import jsrsasign from 'jsrsasign';

/**
 * signData： Asdd=dah&UaBcs=2323&Ua_Bcs=234
 * privateKey： 私钥
 */
export function signString(signData, privateKey, algorithm = 'SHA1withRSA') {
  const sig = new jsrsasign.KJUR.crypto.Signature({ 'alg': algorithm, 'prov': 'cryptojs/jsrsa', 'prvkeypem': privateKey });
  let sign = sig.signString(signData, 'sha1');
  sign = jsrsasign.hextob64(sign);
  return sign;
}
