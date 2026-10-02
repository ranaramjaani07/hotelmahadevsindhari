import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateFallbackReview({ services = [], dishes = [], language = 'Hindi' }: { services?: string[]; dishes?: string[]; language?: string }): string {
  const dishList = dishes.length > 0 ? dishes.join(' और ') : 'दाल बाटी चूरमा और सेव टमाटर';
  const serviceList = services.length > 0 ? services.join(', ') : '100% शुद्ध शाकाहारी भोजन, एसी डाइनिंग और सुरक्षित पार्किंग';

  if (language === 'English') {
    const dishEn = dishes.length > 0 ? dishes.join(' and ') : 'Dal Baati Churma and Sev Tamatar';
    return `Outstanding experience at Hotel Mahadev on RJ SH 28 Sindhari! The pure vegetarian food is genuinely authentic and delicious, especially ${dishEn}. Spacious safe parking, neat AC family dining, and cordial 24-hour staff. Must visit on Barmer-Sanchore highway!`;
  }

  if (language === 'Rajasthani') {
    return `बाड़मेर-सांचोर हाईवे माथे होटल महादेव रो कोई जवाब कोनी! अठे रो ${dishList} घणो स्वाद अर असली देसी स्वाद वालो है। परिवार सागे रुकबा सारू एकदम सुरक्षित माहौल, 24 घंटा चालू सेवा अर विशाल पार्किंग है। सिणधरी क्षेत्र में सबसे उत्तम होटल!`;
  }

  // Default Hindi
  return `सिणधरी (RJ SH 28 सांचोर रोड) पर होटल महादेव का अनुभव बहुत ही शानदार रहा। यहाँ का ${dishList} अत्यंत स्वादिष्ट, शुद्ध और गरमा-गरम परोसा गया। ${serviceList} की व्यवस्था बहुत अच्छी है। परिवार के साथ सफर कर रहे यात्रियों के लिए यह सबसे सुरक्षित और उत्तम ठहराव है। 5/5 ⭐`;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API endpoint for generating Google Reviews using Gemini 3.8 Flash
  app.post('/api/generate-review', async (req, res) => {
    try {
      const {
        services = [],
        dishes = [],
        rating = 5,
        language = 'Hindi',
        customNotes = '',
      } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;

      const prompt = `You are helping a delighted customer write an authentic, natural, high-converting 5-star Google Review for "Hotel Mahadev" (होटल महादेव), located on RJ SH 28 (सांचोर रोड), सुभाष कॉलेज के सामने, Sindhari, Barmer, Rajasthan.

Selected Customer Choices:
- Rating: ${rating} out of 5 stars
- Key highlights enjoyed: ${services.join(', ') || 'शुद्ध शाकाहारी भोजन, एसी फैमिली डाइनिंग, सुरक्षित पार्किंग'}
- Dishes enjoyed: ${dishes.join(', ') || 'दाल बाटी चूरमा, सेव टमाटर, पनीर तूफानी'}
- Preferred Language: ${language} (if Hindi or Rajasthani, write natural Devanagari Hindi or Marwari/Rajasthani; if English, natural fluent English)
- Specific feedback note: ${customNotes || 'none'}

Strict Guidelines:
1. Write 2-4 sentences in a very natural, authentic Indian highway traveler voice (not overly robotic or marketing-speak).
2. Specifically mention "होटल महादेव" (Hotel Mahadev) and "सिणधरी" (Sindhari) or RJ SH 28 highway.
3. Highlight pure vegetarian taste, hygiene, family-friendly atmosphere, safe parking, or 24/7 service.
4. Output ONLY the raw review text ready to copy-paste. No quotes, no markdown bolding, no prefixes like "Here is your review:".`;

      let generatedReview = '';

      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey: apiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              },
            },
          });

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              systemInstruction: 'You write realistic, natural, positive Google Reviews for highway hotels and vegetarian restaurants in Rajasthan, India.',
              temperature: 0.7,
            },
          });

          generatedReview = response.text?.trim() || '';
        } catch (apiErr) {
          console.warn('Gemini API call warning, falling back to smart template:', apiErr);
        }
      }

      if (!generatedReview) {
        generatedReview = generateFallbackReview({ services, dishes, language });
      }

      return res.json({ review: generatedReview, success: true });
    } catch (err: any) {
      console.error('Error generating review:', err);
      const fallback = generateFallbackReview(req.body || {});
      return res.json({ review: fallback, success: true });
    }
  });

  // Clean URL rewrite middleware (e.g., /about -> /about.html, /blog/sh28-highway-guide -> /blog/sh28-highway-guide.html)
  app.use((req, _res, next) => {
  if (req.method === 'GET' && !req.path.includes('.') && req.path !== '/' && !req.path.startsWith('/api/')) {
    const candidatePath = path.join(__dirname, req.path + '.html');
    if (fs.existsSync(candidatePath)) {
      req.url = req.path + '.html';
    }
  }
  next();
});

  // Mount Vite middleware in development with mpa appType
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'mpa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      let requested = req.path.replace(/^\//, '');
      if (!requested) requested = 'index.html';
      if (!requested.includes('.')) requested += '.html';
      const file = path.join(__dirname, 'dist', requested);
      if (fs.existsSync(file)) {
        res.sendFile(file);
      } else {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hotel Mahadev Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
