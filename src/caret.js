let getCaret, setCaret;

if (!document) {
  throw new Error('Caret does not have access to document');
} else if ('selectionStart' in document.createElement('input')) {
  getCaret = element => {
    return {
      start: element.selectionStart,
      end: element.selectionEnd
    };
  };
  setCaret = (element, start, end) => {
    element.selectionStart = start;
    element.selectionEnd = end;
  };
} else if(document.selection) {
  getCaret = element => {
    const value = element.value;
    let range = selection.createRange().duplicate();

    range.moveEnd('character', value.length);

    const start = range.text === '' ? value.length : value.lastIndexOf(range.text);
    range = selection.createRange().duplicate();

    range.moveStart('character', -value.length);

    const end = range.text.length;
    return { start, end };
  };
  setCaret = (element, start, end) => {
    const range = element.createTextRange();
    range.collapse(true);
    range.moveStart('character', start);
    range.moveEnd('character', end - start);
    range.select();
  };
} else  {
  throw new Error('Caret unknown input selection capabilities');
}

export default { get: getCaret, set: setCaret };