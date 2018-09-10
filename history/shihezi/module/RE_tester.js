const phone_RE=/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;/* 手机校验 */
const password_RE_tooShort=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
const password_RE_tooWeak=/^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{8,}$/
export {phone_RE,password_RE_tooShort,password_RE_tooWeak}
