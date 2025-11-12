const fs = require('fs');
const path = require('path');

function findQuestion(all, key) {
  if (!key) return null;
  const trimmed = String(key).trim();
  // try numeric id match
  const asNum = parseInt(trimmed, 10);
  if (!isNaN(asNum)) {
    return all.find((q, idx) => (idx + 1) === asNum || q.id === asNum);
  }
  // text match (ignore case)
  return all.find((q) => q.question && q.question.trim().toLowerCase() === trimmed.toLowerCase());
}

module.exports = async (req, res) => {
  try {
    const file = path.join(__dirname, '..', 'questions.json');
    const raw = fs.readFileSync(file, 'utf8');
    const all = JSON.parse(raw);

    const payload = Array.isArray(req.body) ? req.body : (req.body && req.body.answers) || [];

    let score = 0;
    for (const item of payload) {
      if (!item) continue;
      const questionKey = item.question;
      const userAnswer = item.answer;
      const q = findQuestion(all, questionKey);
      if (!q) continue;

      // resolve correct answer index
      let correctIndex = -1;
      if (Array.isArray(q.options)) {
        correctIndex = q.options.findIndex((o) => String(o).trim().toLowerCase() === String(q.answer || '').trim().toLowerCase());
      }

      let correct = false;
      // If user supplied numeric index
      const ua = String(userAnswer != null ? userAnswer : '').trim();
      const uaNum = parseInt(ua, 10);
      if (!isNaN(uaNum)) {
        if (correctIndex >= 0) {
          correct = uaNum === correctIndex;
        } else if (Array.isArray(q.options) && uaNum >= 0 && uaNum < q.options.length) {
          correct = String(q.options[uaNum]).trim().toLowerCase() === String(q.answer || '').trim().toLowerCase();
        }
      } else {
        // compare by text
        if (String(q.answer || '').trim().toLowerCase() === ua.toLowerCase()) {
          correct = true;
        }
      }

      if (correct) score++;
    }

    res.status(200).json({ score, total: payload.length });
  } catch (e) {
    res.status(500).json({ error: 'failed to evaluate answers', detail: e.message });
  }
};
