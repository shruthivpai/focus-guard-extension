const socialEl = document.getElementById('socialDomains');
const productiveEl = document.getElementById('productiveDomains');
const statusEl = document.getElementById('status');
const saveBtn = document.getElementById('save');

function loadSettings() {
  chrome.storage.sync.get(['socialDomains', 'productiveDomains'], (result) => {
    socialEl.value = (result.socialDomains || []).join('\n');
    productiveEl.value = (result.productiveDomains || []).join('\n');
  });
}

function saveSettings() {
  const socialList = socialEl.value.split('\n').map(s => s.trim()).filter(Boolean);
  const productiveList = productiveEl.value.split('\n').map(s => s.trim()).filter(Boolean);

  chrome.storage.sync.set({
    socialDomains: socialList,
    productiveDomains: productiveList
  }, () => {
    statusEl.textContent = 'Saved!';
    setTimeout(() => statusEl.textContent = '', 2000);
  });
}

saveBtn.addEventListener('click', saveSettings);
document.addEventListener('DOMContentLoaded', loadSettings);
