const tooltipStyle = `
  display: inline;
  position: relative;
  width: 0; height: 0;
  padding: 0; margin: 0;
`;

const tooltipContentStyle = `
  position: absolute;
  top: -0.5em;
  left: -30vw;
  background: transparent;
`;

$(document).ready(() => {
  setUpTooltip('input', '&#x25B6;');
  setUpTooltip('button#add', 'Add a question');
  setUpAddQuestion();
  setUpDone();
});

const setUpTooltip = (selector, tooltipText) => {
  $(selector).mouseover((e) => {
    $(e.target).before(`<div class="tooltip" style="${tooltipStyle}"><div style="${tooltipContentStyle}">${tooltipText}</div></div>`);
  });
  $(selector).mouseout(() => {
    $('.tooltip').remove();
  });
};

const setUpAddQuestion = () => {
  $('button#add').click(() => {
    $(`<input class="on-new-line" 
          type="text" 
          aria-labelledby="question-prompt" 
          onkeyup="highlightDoneButton()" 
          placeholder="One question I've heard or have"></input>
    `).insertAfter($('input').last());
    setUpTooltip('input', '&#x25B6;');
    $('button#done').css({
      background: 'inherit',
      visibility: 'hidden',
    });
  });
};

let data = sessionStorage.getItem('data') || '';
const setUpDone = () => {
  $('button#done').click(() => {
    $('input').each(function(index) {
      data += $(this).val() + '\n';
    });
    sessionStorage.setItem('data', data);
    location.reload();
  });
};

const highlightDoneButton = () => {
  $('button#done').css({
    background: 'green',
    visibility: 'visible',
  });
};
