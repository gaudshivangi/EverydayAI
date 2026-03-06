/**
 * Everyday AI — Floating Chatbot Widget
 * Include this ONE file in every HTML page just before </body>:
 *   <script src="chatbot-widget.js"></script>
 *
 * Powered by Claude (Anthropic) via your API key
 */

(function () {
    'use strict';

    // ─── CONFIG ──────────────────────────────────────────
    // Replace with your actual Anthropic API key
    const API_KEY = 'YOUR_ANTHROPIC_API_KEY';

    const BOT_NAME    = 'Aiden';
    const BOT_TAGLINE = 'Everyday AI Assistant';
    const BOT_AVATAR  = '🤖';

    const SYSTEM_PROMPT = `You are Aiden, a friendly and knowledgeable AI assistant for the "Everyday AI: Digital Literacy Program" website.

Your role is to:
- Help users understand Artificial Intelligence concepts in simple, clear language
- Explain how AI is used in everyday life (smartphones, social media, navigation, chatbots, etc.)
- Answer questions about digital literacy, AI ethics, privacy, and responsible AI use
- Guide users to relevant sections of the website (Research, Awareness, Survey, Gallery, Community, Resources)
- Encourage participation in surveys and community discussions

Personality: Friendly, encouraging, educational, and concise. Avoid overly technical jargon.
Always keep responses focused on AI literacy and digital education.
Keep answers brief (2-4 sentences) unless the user asks for more detail.`;

    const WELCOME_MSG = `Hi there! 👋 I'm **Aiden**, your AI literacy guide.\n\nAsk me anything about AI in everyday life — how it works, where it's used, or how to use it responsibly!`;

    const SUGGESTIONS = [
        'What is AI?',
        'How is AI used daily?',
        'Is AI safe to use?',
        'What is digital literacy?',
    ];
    // ─────────────────────────────────────────────────────

    // Prevent double-init
    if (document.getElementById('aiden-widget')) return;

    // ── Inject Styles ─────────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

        #aiden-widget * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; }

        /* ── FAB Button ── */
        #aiden-fab {
            position: fixed;
            bottom: 28px;
            right: 28px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00e5ff, #7c3aed);
            border: none;
            cursor: pointer;
            z-index: 99990;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 24px rgba(0,229,255,0.35), 0 0 0 0 rgba(0,229,255,0.4);
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
            animation: aiden-pulse-ring 2.5s ease-out infinite;
        }

        #aiden-fab:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 32px rgba(0,229,255,0.5);
        }

        #aiden-fab .aiden-fab-icon {
            font-size: 1.5rem;
            transition: transform 0.3s ease, opacity 0.2s ease;
            line-height: 1;
        }

        #aiden-fab .aiden-fab-close {
            position: absolute;
            font-size: 1.2rem;
            color: white;
            opacity: 0;
            transform: rotate(-90deg) scale(0.5);
            transition: transform 0.3s ease, opacity 0.2s ease;
            font-style: normal;
        }

        #aiden-fab.open .aiden-fab-icon { opacity: 0; transform: scale(0.5) rotate(90deg); }
        #aiden-fab.open .aiden-fab-close { opacity: 1; transform: rotate(0deg) scale(1); }

        /* Unread badge */
        #aiden-badge {
            position: absolute;
            top: -2px; right: -2px;
            width: 18px; height: 18px;
            background: #ef4444;
            border-radius: 50%;
            border: 2px solid #0a0e1a;
            font-size: 0.65rem;
            color: white;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: scale(0);
            transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
        }

        #aiden-badge.show { opacity: 1; transform: scale(1); }

        @keyframes aiden-pulse-ring {
            0%   { box-shadow: 0 4px 24px rgba(0,229,255,0.35), 0 0 0 0 rgba(0,229,255,0.35); }
            70%  { box-shadow: 0 4px 24px rgba(0,229,255,0.35), 0 0 0 12px rgba(0,229,255,0); }
            100% { box-shadow: 0 4px 24px rgba(0,229,255,0.35), 0 0 0 0 rgba(0,229,255,0); }
        }

        /* ── Chat Panel ── */
        #aiden-panel {
            position: fixed;
            bottom: 96px;
            right: 28px;
            width: 360px;
            height: 520px;
            background: #111827;
            border: 1px solid rgba(0,229,255,0.18);
            border-radius: 20px;
            box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.06);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            z-index: 99989;
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            pointer-events: none;
            transition: opacity 0.3s cubic-bezier(0.4,0,0.2,1),
                        transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
            transform-origin: bottom right;
        }

        #aiden-panel.open {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: all;
        }

        /* ── Header ── */
        #aiden-header {
            padding: 1rem 1.1rem;
            background: linear-gradient(135deg, rgba(0,229,255,0.07), rgba(124,58,237,0.07));
            border-bottom: 1px solid rgba(0,229,255,0.1);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-shrink: 0;
        }

        .aiden-avatar {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(0,229,255,0.15), rgba(124,58,237,0.15));
            border: 1.5px solid rgba(0,229,255,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            flex-shrink: 0;
        }

        .aiden-header-info { flex: 1; }

        .aiden-header-info strong {
            display: block;
            font-family: 'Syne', sans-serif;
            font-size: 0.95rem;
            font-weight: 700;
            color: #e8eaf0;
            letter-spacing: -0.01em;
        }

        .aiden-header-info span {
            font-size: 0.72rem;
            color: #8892a4;
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }

        .aiden-online-dot {
            width: 6px;
            height: 6px;
            background: #00e5ff;
            border-radius: 50%;
            display: inline-block;
            animation: aiden-blink 1.8s ease-in-out infinite;
        }

        @keyframes aiden-blink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.3; }
        }

        #aiden-clear-btn {
            background: none;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 6px;
            color: #8892a4;
            font-size: 0.7rem;
            cursor: pointer;
            padding: 0.3rem 0.55rem;
            transition: all 0.2s ease;
        }

        #aiden-clear-btn:hover {
            border-color: rgba(0,229,255,0.3);
            color: #00e5ff;
        }

        /* ── Messages ── */
        #aiden-messages {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            scroll-behavior: smooth;
        }

        #aiden-messages::-webkit-scrollbar { width: 4px; }
        #aiden-messages::-webkit-scrollbar-track { background: transparent; }
        #aiden-messages::-webkit-scrollbar-thumb {
            background: rgba(0,229,255,0.2);
            border-radius: 4px;
        }

        .aiden-msg {
            display: flex;
            gap: 0.5rem;
            animation: aiden-msg-in 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        @keyframes aiden-msg-in {
            from { opacity: 0; transform: translateY(10px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .aiden-msg.user { flex-direction: row-reverse; }

        .aiden-msg-avatar {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            font-size: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-top: 2px;
        }

        .aiden-msg.bot .aiden-msg-avatar {
            background: linear-gradient(135deg, rgba(0,229,255,0.15), rgba(124,58,237,0.15));
            border: 1px solid rgba(0,229,255,0.2);
        }

        .aiden-msg.user .aiden-msg-avatar {
            background: rgba(0,229,255,0.1);
            border: 1px solid rgba(0,229,255,0.2);
            color: #00e5ff;
            font-size: 0.65rem;
            font-weight: 700;
            font-family: 'Syne', sans-serif;
        }

        .aiden-bubble {
            max-width: 80%;
            padding: 0.65rem 0.9rem;
            border-radius: 14px;
            font-size: 0.85rem;
            line-height: 1.55;
        }

        .aiden-msg.bot .aiden-bubble {
            background: #1a2236;
            border: 1px solid rgba(255,255,255,0.06);
            color: #c8cdd8;
            border-bottom-left-radius: 4px;
        }

        .aiden-msg.user .aiden-bubble {
            background: linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,180,210,0.1));
            border: 1px solid rgba(0,229,255,0.25);
            color: #e8eaf0;
            border-bottom-right-radius: 4px;
        }

        /* Markdown-like bold */
        .aiden-bubble strong { color: #00e5ff; font-weight: 600; }
        .aiden-bubble em     { color: #a78bfa; font-style: italic; }

        /* Typing indicator */
        .aiden-typing .aiden-bubble {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 0.75rem 0.9rem;
        }

        .aiden-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: #00e5ff;
            opacity: 0.5;
            animation: aiden-typing-dot 1.2s ease-in-out infinite;
        }

        .aiden-dot:nth-child(2) { animation-delay: 0.2s; }
        .aiden-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes aiden-typing-dot {
            0%, 100% { opacity: 0.2; transform: translateY(0); }
            50%       { opacity: 1;   transform: translateY(-4px); }
        }

        /* ── Suggestions ── */
        #aiden-suggestions {
            padding: 0 1rem 0.75rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            flex-shrink: 0;
        }

        .aiden-chip {
            padding: 0.3rem 0.7rem;
            border-radius: 100px;
            border: 1px solid rgba(0,229,255,0.2);
            background: rgba(0,229,255,0.04);
            color: #8892a4;
            font-size: 0.72rem;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
        }

        .aiden-chip:hover {
            border-color: rgba(0,229,255,0.5);
            color: #00e5ff;
            background: rgba(0,229,255,0.08);
        }

        /* ── Input Area ── */
        #aiden-input-area {
            padding: 0.75rem 1rem;
            border-top: 1px solid rgba(255,255,255,0.06);
            display: flex;
            gap: 0.5rem;
            align-items: flex-end;
            background: rgba(10,14,26,0.5);
            flex-shrink: 0;
        }

        #aiden-input {
            flex: 1;
            background: #1a2236;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            padding: 0.6rem 0.85rem;
            color: #e8eaf0;
            font-size: 0.85rem;
            font-family: 'DM Sans', sans-serif;
            resize: none;
            outline: none;
            min-height: 40px;
            max-height: 100px;
            line-height: 1.45;
            transition: border-color 0.2s ease;
        }

        #aiden-input::placeholder { color: #4a5568; }

        #aiden-input:focus {
            border-color: rgba(0,229,255,0.35);
            box-shadow: 0 0 0 3px rgba(0,229,255,0.06);
        }

        #aiden-send {
            width: 38px;
            height: 38px;
            border-radius: 10px;
            background: linear-gradient(135deg, #00e5ff, #00b8d4);
            border: none;
            color: #0a0e1a;
            font-size: 0.9rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: all 0.2s ease;
        }

        #aiden-send:hover { opacity: 0.85; transform: translateY(-1px); }
        #aiden-send:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }

        /* ── Mobile ── */
        @media (max-width: 480px) {
            #aiden-panel {
                width: calc(100vw - 24px);
                right: 12px;
                bottom: 90px;
                height: 70vh;
            }
            #aiden-fab { bottom: 20px; right: 16px; }
        }
    `;
    document.head.appendChild(style);

    // ── Build HTML ────────────────────────────────────────
    const widget = document.createElement('div');
    widget.id = 'aiden-widget';
    widget.innerHTML = `
        <!-- Floating Button -->
        <button id="aiden-fab" aria-label="Open AI Assistant">
            <span class="aiden-fab-icon">${BOT_AVATAR}</span>
            <i class="aiden-fab-close">✕</i>
            <span id="aiden-badge">1</span>
        </button>

        <!-- Chat Panel -->
        <div id="aiden-panel" role="dialog" aria-label="AI Chat Assistant">
            <div id="aiden-header">
                <div class="aiden-avatar">${BOT_AVATAR}</div>
                <div class="aiden-header-info">
                    <strong>${BOT_NAME}</strong>
                    <span><span class="aiden-online-dot"></span> ${BOT_TAGLINE}</span>
                </div>
                <button id="aiden-clear-btn" title="Clear chat">Clear</button>
            </div>

            <div id="aiden-messages"></div>

            <div id="aiden-suggestions"></div>

            <div id="aiden-input-area">
                <textarea
                    id="aiden-input"
                    placeholder="Ask me about AI..."
                    rows="1"
                    aria-label="Chat input"
                ></textarea>
                <button id="aiden-send" aria-label="Send message">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(widget);

    // ── State ─────────────────────────────────────────────
    let isOpen       = false;
    let isTyping     = false;
    let conversation = [];          // {role, content}[]
    let suggestionsHidden = false;

    const fab        = document.getElementById('aiden-fab');
    const panel      = document.getElementById('aiden-panel');
    const messages   = document.getElementById('aiden-messages');
    const input      = document.getElementById('aiden-input');
    const sendBtn    = document.getElementById('aiden-send');
    const badge      = document.getElementById('aiden-badge');
    const clearBtn   = document.getElementById('aiden-clear-btn');
    const sugBox     = document.getElementById('aiden-suggestions');

    // ── Toggle Panel ──────────────────────────────────────
    function toggle() {
        isOpen = !isOpen;
        fab.classList.toggle('open', isOpen);
        panel.classList.toggle('open', isOpen);

        if (isOpen) {
            hideBadge();
            setTimeout(() => input.focus(), 350);
            if (messages.children.length === 0) {
                showWelcome();
            }
        }
    }

    fab.addEventListener('click', toggle);

    // ── Badge ─────────────────────────────────────────────
    function showBadge() { badge.classList.add('show'); }
    function hideBadge() { badge.classList.remove('show'); }

    // Show badge after 3s if not opened yet
    setTimeout(() => { if (!isOpen) showBadge(); }, 3000);

    // ── Welcome Message ───────────────────────────────────
    function showWelcome() {
        appendMessage('bot', WELCOME_MSG);
        renderSuggestions();
    }

    // ── Render Suggestions ────────────────────────────────
    function renderSuggestions() {
        if (suggestionsHidden) return;
        sugBox.innerHTML = '';
        SUGGESTIONS.forEach(s => {
            const chip = document.createElement('button');
            chip.className   = 'aiden-chip';
            chip.textContent = s;
            chip.addEventListener('click', () => {
                sugBox.innerHTML = '';
                suggestionsHidden = true;
                sendMessage(s);
            });
            sugBox.appendChild(chip);
        });
    }

    // ── Append Message ────────────────────────────────────
    function appendMessage(role, text) {
        const wrap = document.createElement('div');
        wrap.className = `aiden-msg ${role}`;

        const avatarEl = document.createElement('div');
        avatarEl.className = 'aiden-msg-avatar';
        avatarEl.textContent = role === 'bot' ? BOT_AVATAR : 'You';

        const bubble = document.createElement('div');
        bubble.className = 'aiden-bubble';
        bubble.innerHTML = parseMarkdown(text);

        wrap.appendChild(avatarEl);
        wrap.appendChild(bubble);
        messages.appendChild(wrap);
        scrollToBottom();
        return wrap;
    }

    // ── Typing Indicator ──────────────────────────────────
    function showTyping() {
        const wrap = document.createElement('div');
        wrap.className = 'aiden-msg bot aiden-typing';
        wrap.id = 'aiden-typing-indicator';

        const avatarEl = document.createElement('div');
        avatarEl.className = 'aiden-msg-avatar';
        avatarEl.textContent = BOT_AVATAR;

        const bubble = document.createElement('div');
        bubble.className = 'aiden-bubble';
        bubble.innerHTML = '<span class="aiden-dot"></span><span class="aiden-dot"></span><span class="aiden-dot"></span>';

        wrap.appendChild(avatarEl);
        wrap.appendChild(bubble);
        messages.appendChild(wrap);
        scrollToBottom();
    }

    function hideTyping() {
        const indicator = document.getElementById('aiden-typing-indicator');
        if (indicator) indicator.remove();
    }

    // ── Scroll ────────────────────────────────────────────
    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    // ── Simple Markdown Parser ────────────────────────────
    function parseMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g,     '<em>$1</em>')
            .replace(/\n/g,            '<br>');
    }

    // ── Send Message ──────────────────────────────────────
    async function sendMessage(text) {
        text = (text || input.value).trim();
        if (!text || isTyping) return;

        input.value = '';
        autoResize();
        sugBox.innerHTML = '';
        suggestionsHidden = true;

        appendMessage('user', text);
        conversation.push({ role: 'user', content: text });

        isTyping = true;
        sendBtn.disabled = true;
        showTyping();

        try {
            const reply = await callClaude(conversation);
            hideTyping();
            appendMessage('bot', reply);
            conversation.push({ role: 'assistant', content: reply });

            // Show badge if panel is closed
            if (!isOpen) showBadge();

        } catch (err) {
            hideTyping();
            appendMessage('bot', `⚠️ Sorry, I couldn't connect right now. Please check your API key or try again later.\n\n*Error: ${err.message}*`);
        }

        isTyping = false;
        sendBtn.disabled = false;
        input.focus();
    }

    // ── Claude API Call ───────────────────────────────────
    async function callClaude(msgs) {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type':         'application/json',
                'x-api-key':            API_KEY,
                'anthropic-version':    '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true',
            },
            body: JSON.stringify({
                model:      'claude-haiku-4-5-20251001',
                max_tokens: 400,
                system:     SYSTEM_PROMPT,
                messages:   msgs,
            }),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error?.message || `HTTP ${res.status}`);
        }

        const data = await res.json();
        return data.content?.[0]?.text || 'I couldn\'t generate a response. Please try again.';
    }

    // ── Input Events ──────────────────────────────────────
    sendBtn.addEventListener('click', () => sendMessage());

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    input.addEventListener('input', autoResize);

    function autoResize() {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    }

    // ── Clear Chat ────────────────────────────────────────
    clearBtn.addEventListener('click', () => {
        messages.innerHTML = '';
        conversation       = [];
        suggestionsHidden  = false;
        showWelcome();
    });

    // ── Close on Escape ───────────────────────────────────
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) toggle();
    });

})();
