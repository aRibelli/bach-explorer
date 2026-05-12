// ═══════════════════════════════════════════════════════════════
// BACH EXPLORER — Fonction serverless (proxy API Anthropic)
// ───────────────────────────────────────────────────────────────
// Reçoit une requête du navigateur, appelle l'API Anthropic avec
// la clé secrète (jamais exposée côté client), renvoie la réponse
// structurée en JSON.
//
// Vercel détecte automatiquement les fichiers dans /api et les
// expose comme endpoints HTTP. Ici : POST /api/bach
// ═══════════════════════════════════════════════════════════════

const SYSTEM_PROMPT = `Tu es un expert en musicologie spécialisé dans l'œuvre vocale et chorale de Jean-Sébastien Bach (cantates, Passions, Messes, Magnificat, motets, oratorios).

L'utilisateur va te demander une œuvre par son numéro BWV, son titre allemand ou français. Tu dois répondre EXCLUSIVEMENT par un objet JSON valide, sans aucun texte avant ou après, sans balises markdown, sans préambule.

Schéma JSON exact attendu :

{
  "work": {
    "bwv": "BWV xxx",
    "titleGerman": "Titre en allemand",
    "titleFrench": "Traduction française du titre",
    "metadata": {
      "date": "Date de composition",
      "place": "Lieu (Leipzig, Weimar, Köthen…)",
      "occasion": "Occasion liturgique ou contexte",
      "librettist": "Auteur du texte",
      "scoring": "Effectif vocal et instrumental",
      "notes": "Notes complémentaires, anecdotes, contexte musical (2-3 phrases)"
    },
    "movements": [
      {
        "number": "1",
        "type": "Chœur" | "Aria" | "Récitatif" | "Choral" | "Duo" | "Sinfonia" | etc.,
        "voice": "Voix concernée(s), p.ex. 'Soprano, Alto'",
        "textGerman": "Texte allemand original, paragraphes séparés par \\n\\n",
        "textFrench": "Traduction française complète et fidèle, paragraphes séparés par \\n\\n"
      }
    ]
  }
}

Règles impératives :
- Le texte allemand doit être complet, fidèle aux éditions de référence (Neue Bach-Ausgabe ou éditions courantes).
- La traduction française doit être complète, littéraire, idiomatique — pas du mot-à-mot, mais fidèle au sens et au registre liturgique.
- Tous les mouvements doivent être présents dans l'ordre. Pour les œuvres très longues (Passions, Oratorio de Noël, Messe en si), si la limite est atteinte, donne autant de mouvements que possible en ordre.
- Si la requête est ambiguë ou ne correspond à aucune œuvre identifiable, renvoie :
  { "error": "Œuvre non identifiée : précisez par numéro BWV ou titre exact." }
- N'invente jamais un texte que tu ne connais pas avec certitude. En cas de doute sur un mouvement précis, indique-le dans le champ "notes".

Réponds maintenant uniquement avec le JSON.`;

export default async function handler(req, res) {
  // CORS et méthode HTTP
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée. Utilisez POST." });
  }

  // Récupération de la requête
  let query = "";
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    query = (body && body.query) ? String(body.query).trim() : "";
  } catch (e) {
    return res.status(400).json({ error: "Requête mal formée." });
  }

  if (!query) {
    return res.status(400).json({ error: "Requête vide." });
  }

  // Vérification de la clé API (côté serveur uniquement)
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY non configurée dans Vercel.");
    return res.status(500).json({ error: "Configuration serveur incomplète." });
  }

  // Appel à l'API Anthropic
  try {
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 8000,
        system: SYSTEM_PROMPT,
        messages: [
          { role: "user", content: query }
        ],
      }),
    });

    if (!anthropicResponse.ok) {
      const errText = await anthropicResponse.text();
      console.error("Erreur API Anthropic:", anthropicResponse.status, errText);
      return res.status(502).json({
        error: `L'API Anthropic a renvoyé une erreur (${anthropicResponse.status}).`,
      });
    }

    const data = await anthropicResponse.json();

    // Extraction du texte de la réponse
    let text = "";
    if (data.content && Array.isArray(data.content)) {
      for (const block of data.content) {
        if (block.type === "text" && block.text) {
          text += block.text;
        }
      }
    }

    if (!text.trim()) {
      return res.status(502).json({ error: "Réponse vide de l'API." });
    }

    // Nettoyage défensif : enlever d'éventuelles balises markdown ```json
    text = text.trim();
    if (text.startsWith("```")) {
      text = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
    }

    // Parsing JSON
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error("Réponse non parsable comme JSON:", text.slice(0, 500));
      return res.status(502).json({
        error: "La réponse du modèle n'a pas pu être interprétée. Réessayez ou précisez la requête.",
      });
    }

    // Renvoi au client
    return res.status(200).json(parsed);

  } catch (err) {
    console.error("Erreur lors de l'appel API:", err);
    return res.status(500).json({ error: "Erreur interne : " + (err.message || "inconnue") });
  }
}
