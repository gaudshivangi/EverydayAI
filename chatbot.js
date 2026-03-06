/**
 * Everyday AI — Chatbot JS
 * No API key required — Local Knowledge Base
 * Author: Ekta Pandey
 */

// ================================
// KNOWLEDGE BASE
// ================================

const knowledgeBase = [
    {
        keywords: ["what is ai", "define ai", "meaning of ai", "artificial intelligence", "explain ai"],
        response: `**Artificial Intelligence (AI)** refers to technology that enables machines to simulate human intelligence.\n\nIt allows computers to:\n• Learn from data\n• Recognize patterns\n• Make decisions\n• Understand language\n• Solve problems\n\nIn everyday life, AI powers Google Maps, YouTube recommendations, chatbots, and voice assistants like Siri and Alexa.`
    },
    {
        keywords: ["ai in daily life", "daily applications", "where is ai used", "examples of ai", "ai examples", "everyday ai"],
        response: `AI is all around us in daily life:\n\n• 📱 **Smartphones** — face unlock, autocorrect, voice assistants\n• 🎬 **Streaming** — Netflix & YouTube recommendations\n• 🗺️ **Navigation** — Google Maps traffic prediction\n• 🛒 **Shopping** — Amazon product suggestions\n• 💬 **Chatbots** — customer support on websites\n• 📧 **Email** — spam filters and smart replies\n\nAI is already part of your routine, even if you don't notice it!`
    },
    {
        keywords: ["ai tools", "popular ai tools", "generative ai", "chatgpt", "gemini", "best ai tools"],
        response: `Popular AI tools you can use today:\n\n• 🤖 **ChatGPT** — AI text generation & answers\n• 🔍 **Google Gemini** — AI assistant by Google\n• 🎨 **Canva AI** — design and image generation\n• ✍️ **Grammarly** — AI writing assistance\n• 🖼️ **DALL·E** — AI image generation\n• 📚 **Khan Academy AI** — personalized learning\n\nThese tools improve productivity and creativity!`
    },
    {
        keywords: ["ai ethics", "ethical ai", "responsible ai", "ai bias", "fairness"],
        response: `**AI Ethics** focuses on responsible and fair use of AI.\n\nKey concerns include:\n• 🔒 Data privacy\n• ⚖️ Algorithm bias\n• 🎭 Deepfakes & fake content\n• 🤝 Transparency\n• 👤 Over-dependence on AI\n\nResponsible AI use means thinking critically before trusting AI-generated content and always verifying important information.`
    },
    {
        keywords: ["privacy", "data security", "data safe", "is ai safe", "ai privacy"],
        response: `**Staying safe with AI tools:**\n\n• Never share personal information like passwords or ID numbers\n• Read privacy policies before using any AI app\n• Use trusted, well-known AI platforms\n• Be careful what photos or documents you upload\n• Remember — AI companies may store your conversations\n\nYour data is valuable — always think before you share! 🔐`
    },
    {
        keywords: ["digital literacy", "ai awareness", "program purpose", "project objective", "what is digital literacy"],
        response: `**Digital Literacy** is the ability to use technology safely, critically, and responsibly.\n\nThe **Everyday AI Program** aims to:\n• Improve digital literacy for everyone\n• Create awareness about AI tools\n• Promote responsible AI usage\n• Encourage critical thinking\n• Help people understand AI in daily life\n\nThe goal is empowerment through awareness — not just usage! 🎓`
    },
    {
        keywords: ["future of ai", "ai careers", "ai skills", "ai jobs", "career in ai"],
        response: `**AI is shaping future careers!**\n\nValuable skills for an AI-driven world:\n• 🧠 Critical thinking\n• 📊 Data awareness\n• ✍️ Prompt writing\n• 🔍 Fact-checking AI content\n• ⚖️ Ethical judgment\n• 💻 Basic coding knowledge\n\nYou don't need to be a programmer — understanding AI is enough to stay ahead in almost any career!`
    },
    {
        keywords: ["ai limitations", "limitations of ai", "ai wrong", "ai mistakes", "ai problems"],
        response: `**AI has real limitations:**\n\n• ❌ Can generate incorrect information (hallucinations)\n• ❌ May reflect biases from training data\n• ❌ Lacks true understanding & common sense\n• ❌ Cannot always access real-time information\n• ❌ Struggles with complex reasoning\n• ❌ No emotions or genuine creativity\n\nAlways verify AI-generated content with trusted sources!`
    },
    {
        keywords: ["how to use ai safely", "safe ai use", "ai safety", "ai tips"],
        response: `**Tips for using AI safely:**\n\n• ✅ Verify AI answers with other sources\n• ✅ Don't share sensitive personal data\n• ✅ Use AI as a helper, not a replacement for thinking\n• ✅ Be aware of AI-generated fake content\n• ✅ Report harmful AI outputs\n• ✅ Keep your accounts secure\n\nAI is a tool — you are always in control! 💪`
    },
    {
        keywords: ["misinformation", "fake news", "deepfake", "ai fake", "verify ai"],
        response: `**AI & Misinformation — What to watch out for:**\n\n• 🎭 **Deepfakes** — AI-generated fake videos/images of real people\n• 📰 **Fake news** — AI can generate convincing false articles\n• 🤖 **Bot accounts** — AI-powered fake social media profiles\n\n**How to verify content:**\n• Check multiple trusted news sources\n• Use reverse image search\n• Look for original source links\n• Trust fact-checking websites like Snopes or FactCheck.org`
    },
    {
        keywords: ["ai for students", "students ai", "ai in education", "ai study", "ai learning"],
        response: `**How AI can help students:**\n\n• 📖 Explaining difficult concepts simply\n• ✍️ Proofreading and improving writing\n• 🗓️ Organizing study schedules\n• 🔍 Researching topics quickly\n• 🌍 Translating languages\n• 🧮 Solving math step-by-step\n\n⚠️ **Remember:** Use AI to *learn*, not to replace your own thinking. Always understand the answers, don't just copy them!`
    },
    {
        keywords: ["is ai free", "free ai", "ai cost", "ai price"],
        response: `**Many AI tools offer free access!**\n\n• ✅ **ChatGPT** — free basic version\n• ✅ **Google Gemini** — free with Google account\n• ✅ **Canva AI** — free basic features\n• ✅ **Grammarly** — free basic version\n• ✅ **Bing AI** — free with Microsoft account\n\nMost AI tools have a free tier that's more than enough for students and everyday use!`
    },
    {
        keywords: ["ai replacing humans", "ai replace jobs", "will ai take jobs", "ai and jobs"],
        response: `**Will AI replace human jobs?**\n\nAI is changing jobs, not just replacing them:\n\n• 🔄 Some repetitive tasks are being automated\n• 🆕 New AI-related jobs are being created\n• 🤝 Most jobs will evolve to work *with* AI\n• 🧠 Creativity, empathy & critical thinking remain uniquely human\n\nThe best approach: **Learn to work with AI** rather than compete against it!`
    },
    {
        keywords: ["machine learning", "what is machine learning", "ml", "deep learning"],
        response: `**Machine Learning (ML)** is a branch of AI where computers learn from data without being explicitly programmed.\n\nTypes of ML:\n• 📊 **Supervised Learning** — learns from labeled examples\n• 🔍 **Unsupervised Learning** — finds patterns on its own\n• 🎮 **Reinforcement Learning** — learns by trial and error\n\n**Deep Learning** is a type of ML using neural networks — it powers image recognition, voice assistants, and language models like ChatGPT!`
    },
    {
        keywords: ["natural language processing", "nlp", "language ai", "text ai"],
        response: `**Natural Language Processing (NLP)** is AI that understands and generates human language.\n\nNLP powers:\n• 💬 Chatbots and virtual assistants\n• 🌍 Google Translate\n• 📧 Email spam filters\n• 🔍 Search engines\n• 📝 Grammar checkers like Grammarly\n\nEvery time you talk to a voice assistant or use autocomplete — that's NLP at work!`
    },
    {
        keywords: ["hello", "hi", "hey", "good morning", "good evening", "greetings", "start"],
        response: `Hello! 👋 Great to meet you!\n\nI'm **Aiden**, your AI literacy guide for the Everyday AI program.\n\nYou can ask me about:\n• What is AI?\n• AI in daily life\n• AI tools & safety\n• Digital literacy\n• AI ethics & privacy\n• AI & careers\n\nWhat would you like to learn today? 😊`
    },
    {
        keywords: ["thank you", "thanks", "helpful", "great", "awesome", "good", "nice"],
        response: `You're welcome! 😊\n\nI'm glad I could help! Feel free to ask me anything else about AI and digital literacy.\n\nYou can also explore:\n• 📚 Our **Resources** page for more learning materials\n• 📊 The **Survey** page to share your thoughts\n• 👥 The **Community** forum to connect with others\n\nKeep learning and stay curious! 🚀`
    }
];

// ================================
// STATE
// ================================

let quickHidden = false;

// ================================
// INIT
// ================================

document.addEventListener('DOMContentLoaded', function () {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        chatInput.addEventListener('input', autoResize);
    }

    const welcomeTime = document.getElementById('welcome-time');
    if (welcomeTime) welcomeTime.textContent = getTime();
});

// ================================
// HELPERS
// ================================

function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scrollBottom() {
    const el = document.getElementById('chatMessages');
    if (el) el.scrollTop = el.scrollHeight;
}

function autoResize() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
}

function parseMarkdown(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g,     '<em>$1</em>')
        .replace(/\n/g,            '<br>');
}

// ================================
// APPEND MESSAGE
// ================================

function appendMessage(role, text) {
    const messagesEl = document.getElementById('chatMessages');
    if (!messagesEl) return;

    const wrap = document.createElement('div');
    wrap.className = `message ${role === 'user' ? 'user-message' : 'bot-message'}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = role === 'user'
        ? '<i class="fas fa-user"></i>'
        : '<i class="fas fa-robot"></i>';

    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = `${parseMarkdown(text)}<span class="msg-time">${getTime()}</span>`;

    wrap.appendChild(avatar);
    wrap.appendChild(content);
    messagesEl.appendChild(wrap);
    scrollBottom();
}

// ================================
// TYPING INDICATOR
// ================================

function showTyping() {
    const messagesEl = document.getElementById('chatMessages');
    if (!messagesEl) return;

    const wrap = document.createElement('div');
    wrap.className = 'message bot-message typing-indicator';
    wrap.id = 'typingIndicator';
    wrap.innerHTML = `
        <div class="message-avatar"><i class="fas fa-robot"></i></div>
        <div class="message-content">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>`;

    messagesEl.appendChild(wrap);
    scrollBottom();
}

function hideTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
}

// ================================
// GET RESPONSE
// ================================

function getBotResponse(message) {
    const lower = message.toLowerCase();

    for (let item of knowledgeBase) {
        for (let keyword of item.keywords) {
            if (lower.includes(keyword)) {
                return item.response;
            }
        }
    }

    return `I'm here to help you understand AI in everyday life! 😊\n\nTry asking me about:\n• **What is AI?**\n• **AI in daily life**\n• **AI tools**\n• **AI ethics & privacy**\n• **Digital literacy**\n• **AI & careers**\n• **AI safety**\n\nWhat would you like to know?`;
}

// ================================
// SEND MESSAGE
// ================================

function sendMessage(text) {
    const inputEl = document.getElementById('chatInput');
    text = (text || (inputEl && inputEl.value) || '').trim();
    if (!text) return;

    if (inputEl) {
        inputEl.value = '';
        autoResize();
    }

    if (!quickHidden) {
        const opts = document.getElementById('quickOptions');
        if (opts) opts.style.display = 'none';
        quickHidden = true;
    }

    appendMessage('user', text);

    // Natural random delay: 700–1200ms
    showTyping();
    setTimeout(() => {
        hideTyping();
        appendMessage('bot', getBotResponse(text));
    }, 700 + Math.random() * 500);
}



// ================================
// CLEAR CHAT
// ================================

function clearChat() {
    const messagesEl = document.getElementById('chatMessages');
    if (!messagesEl) return;

    messagesEl.innerHTML = '';
    quickHidden = false;

    const opts = document.getElementById('quickOptions');
    if (opts) opts.style.display = 'flex';

    const wrap = document.createElement('div');
    wrap.className = 'message bot-message';
    wrap.innerHTML = `
        <div class="message-avatar"><i class="fas fa-robot"></i></div>
        <div class="message-content">
            <p>Hello! 👋 I'm <strong>Aiden</strong>, your AI literacy guide.</p>
            <p>Ask me anything about AI in everyday life — how it works, where it's used, or how to stay safe online.</p>
            <span class="msg-time">${getTime()}</span>
        </div>`;
    messagesEl.appendChild(wrap);
}
// ── FAQ Accordion ──
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        // Open clicked if it was closed
        if (!isOpen) item.classList.add('open');
    });
});

