const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  const { category } = req.params || {};
  try {
    const file = path.join(__dirname, '..', 'questions.json');
    const raw = fs.readFileSync(file, 'utf8');
    const all = JSON.parse(raw);

    const filtered = (all || [])
      .filter((q) => q.category && q.category.toLowerCase() === String(category).toLowerCase())
      .slice(0, 50)
      .map((q, idx) => ({ id: idx + 1, question: q.question, options: q.options }));

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(filtered));
  } catch (e) {
    res.status(500).json({ error: 'failed to load questions', detail: e.message });
  }
};
