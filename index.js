// Reusable utility
function createElement(tag, attributes = {}, textContent = '') {
  const elem = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      elem.className = value;
    } else {
      elem.setAttribute(key, value);
    }
  });

  if (textContent) {
    elem.textContent = textContent;
  }

  return elem;
}

function showError(message) {
  const errorEl = document.getElementById('error-message');
  if (!errorEl) return;

  errorEl.textContent = message;
  errorEl.classList.remove('hidden');
}

/**
 * addElementToDOM
 * Expected by tests: addElementToDOM('dynamic-content', 'Hello, World!')
 */
function addElementToDOM(elementId, text) {
  let el = document.getElementById(elementId);

  if (!el) {
    el = createElement('div', { id: elementId });
    document.body.appendChild(el);
  }

  el.textContent = text;
}

/**
 * removeElementFromDOM
 * Expected by tests: removeElementFromDOM('test-element')
 */
function removeElementFromDOM(elementId) {
  const el = document.getElementById(elementId);
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
}

/**
 * simulateClick
 * Expected by tests:
 *   simulateClick('dynamic-content', 'Button Clicked!')
 */
function simulateClick(elementId, text) {
  let el = document.getElementById(elementId);

  if (!el) {
    el = createElement('div', { id: elementId });
    document.body.appendChild(el);
  }

  el.textContent = text;
}

/**
 * handleFormSubmit
 * Expected by tests:
 *   handleFormSubmit('user-form', 'dynamic-content')
 */
function handleFormSubmit(formId, targetId) {
  const form = document.getElementById(formId);
  const target = document.getElementById(targetId);
  const errorEl = document.getElementById('error-message');

  if (!form) {
    showError('Form not found');
    return;
  }

  const input = form.querySelector('input');
  if (!input) {
    showError('Input not found');
    return;
  }

  const value = input.value.trim();

  if (!value) {
    if (errorEl) {
      errorEl.textContent = 'Input cannot be empty';
      errorEl.classList.remove('hidden');
    }
    return;
  }

  let targetEl = target;
  if (!targetEl) {
    targetEl = createElement('div', { id: targetId });
    document.body.appendChild(targetEl);
  }

  targetEl.textContent = value;

  if (errorEl) {
    errorEl.classList.add('hidden');
  }
}

// Hook real UI events when running in browser
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const simulateBtn = document.getElementById('simulate-click');
    if (simulateBtn) {
      simulateBtn.addEventListener('click', () => {
        simulateClick('dynamic-content', 'Button Clicked!');
      });
    }

    const form = document.getElementById('user-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit('user-form', 'dynamic-content');
      });
    }
  });
}

module.exports = {
  createElement,
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
  showError
};
