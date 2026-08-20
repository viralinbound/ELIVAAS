
/**
 * VIRAL VILLAS — LUXURY AI CONCIERGE CHATBOT
 * Purely client-side smart knowledge engine querying all 409+ villas in realtime with zero API keys.
 */
(function() {
  // 1. Inject Styles
  const style = document.createElement('style');
  style.innerHTML = `
    /* FLOATING CHATBOT BUTTON */
    .vv-chatbot-launcher {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    }
    .vv-launcher-pill {
      background: #ffffff;
      color: #121212;
      padding: 10px 16px;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 700;
      box-shadow: 0 8px 24px rgba(0,0,0,0.18);
      border: 1px solid #ede4db;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .vv-launcher-pill:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(128, 20, 38, 0.25);
    }
    .vv-launcher-btn {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #801426 0%, #a01530 100%);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      box-shadow: 0 8px 24px rgba(128, 20, 38, 0.45);
      border: 2px solid #ffd700;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }
    .vv-launcher-btn:hover {
      transform: scale(1.08) rotate(5deg);
      box-shadow: 0 12px 30px rgba(128, 20, 38, 0.65);
    }
    .vv-launcher-btn::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid rgba(212, 175, 55, 0.5);
      animation: vvPulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
    }
    @keyframes vvPulseRing {
      0% { transform: scale(0.95); opacity: 0.8; }
      50% { transform: scale(1.15); opacity: 0; }
      100% { transform: scale(0.95); opacity: 0; }
    }

    /* CHATBOT MODAL WINDOW */
    .vv-chat-window {
      position: fixed;
      bottom: 96px;
      right: 28px;
      width: 390px;
      height: 580px;
      max-height: calc(100vh - 120px);
      background: #ffffff;
      border-radius: 24px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.22);
      border: 1px solid #ede4db;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 10000;
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px) scale(0.95);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    }
    .vv-chat-window.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }
    @media (max-width: 480px) {
      .vv-chat-window {
        right: 12px;
        left: 12px;
        bottom: 84px;
        width: auto;
        height: 82vh;
      }
      .vv-launcher-pill { display: none; }
    }

    /* Header */
    .vv-chat-header {
      background: linear-gradient(135deg, #801426 0%, #4a0712 100%);
      color: #ffffff;
      padding: 18px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255,215,0,0.2);
    }
    .vv-chat-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .vv-avatar-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #ffffff;
      color: #801426;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      border: 1.5px solid #ffd700;
    }
    .vv-header-title {
      font-family: 'Cinzel', serif;
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: 0.04em;
    }
    .vv-header-status {
      font-size: 0.72rem;
      color: #ffd700;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* Message Body */
    .vv-chat-body {
      flex: 1;
      padding: 18px;
      overflow-y: auto;
      background: #fdfbf7;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    /* Message Bubbles */
    .vv-msg-row {
      display: flex;
      gap: 10px;
      align-items: flex-start;
    }
    .vv-msg-row.user {
      justify-content: flex-end;
    }
    .vv-msg-bubble {
      max-width: 82%;
      padding: 12px 16px;
      border-radius: 18px;
      font-size: 0.88rem;
      line-height: 1.45;
    }
    .vv-msg-row.bot .vv-msg-bubble {
      background: #ffffff;
      color: #1a1a1a;
      border: 1px solid #ede4db;
      border-top-left-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }
    .vv-msg-row.user .vv-msg-bubble {
      background: #801426;
      color: #ffffff;
      border-top-right-radius: 4px;
      box-shadow: 0 4px 12px rgba(128, 20, 38, 0.25);
    }

    /* Villa Mini Result Card inside Chat */
    .vv-chat-villa-card {
      background: #ffffff;
      border: 1px solid #ede4db;
      border-radius: 14px;
      overflow: hidden;
      margin-top: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.04);
      display: flex;
      flex-direction: column;
    }
    .vv-chat-villa-img {
      height: 110px;
      width: 100%;
      object-fit: cover;
    }
    .vv-chat-villa-info {
      padding: 10px 12px;
    }
    .vv-chat-villa-name {
      font-family: 'Playfair Display', serif;
      font-size: 0.95rem;
      font-weight: 700;
      color: #121212;
      margin-bottom: 2px;
    }
    .vv-chat-villa-meta {
      font-size: 0.74rem;
      color: #6b7280;
      margin-bottom: 6px;
    }
    .vv-chat-villa-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 6px;
      border-top: 1px solid #f5eee7;
    }
    .vv-chat-villa-price {
      font-size: 0.9rem;
      font-weight: 800;
      color: #801426;
    }
    .vv-chat-villa-btn {
      background: #801426;
      color: #ffffff;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 0.74rem;
      font-weight: 700;
      text-decoration: none;
    }

    /* Suggestion Chips */
    .vv-quick-chips-wrap {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding: 8px 16px;
      background: #ffffff;
      border-top: 1px solid #ede4db;
      scrollbar-width: none;
    }
    .vv-quick-chip {
      background: #faf7f2;
      color: #4b5563;
      border: 1px solid #ede4db;
      padding: 5px 12px;
      border-radius: 9999px;
      font-size: 0.76rem;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .vv-quick-chip:hover {
      background: #801426;
      color: #ffffff;
      border-color: #801426;
    }

    /* Input Footer */
    .vv-chat-footer {
      padding: 12px 16px;
      background: #ffffff;
      border-top: 1px solid #ede4db;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .vv-chat-input {
      flex: 1;
      border: 1px solid #ede4db;
      border-radius: 9999px;
      padding: 10px 16px;
      font-size: 0.88rem;
      background: #faf7f2;
      outline: none;
      font-family: inherit;
    }
    .vv-chat-input:focus {
      border-color: #801426;
      background: #ffffff;
    }
    .vv-chat-send-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #801426;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.95rem;
      border: none;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.2s ease;
    }
    .vv-chat-send-btn:hover {
      background: #9c1c33;
      transform: scale(1.05);
    }

    /* Typing Dots */
    .vv-typing-dots {
      display: inline-flex;
      gap: 4px;
      padding: 8px 12px;
      background: #ffffff;
      border: 1px solid #ede4db;
      border-radius: 12px;
      width: fit-content;
    }
    .vv-typing-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #c57d56;
      animation: vvTyping 1.4s infinite ease-in-out both;
    }
    .vv-typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .vv-typing-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes vvTyping {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

  // 2. Inject HTML Widget
  const widgetContainer = document.createElement('div');
  widgetContainer.innerHTML = `
    <!-- Floating Launcher -->
    <div class="vv-chatbot-launcher" id="vvChatLauncher" onclick="toggleVVChat()">
      <div class="vv-launcher-pill">
        <span style="color:#801426;">●</span> <strong>AI Concierge</strong> • Ask me anything!
      </div>
      <div class="vv-launcher-btn" title="Viral Villas Concierge AI">
        <i class="fa-solid fa-crown" style="font-size:1.15rem; color:#ffd700;"></i>
      </div>
    </div>

    <!-- Chatbot Window -->
    <div class="vv-chat-window" id="vvChatWindow">
      <div class="vv-chat-header">
        <div class="vv-chat-header-info">
          <div class="vv-avatar-circle">
            <i class="fa-solid fa-crown"></i>
          </div>
          <div>
            <div class="vv-header-title">VIRAL CONCIERGE</div>
            <div class="vv-header-status">
              <i class="fa-solid fa-circle" style="font-size:0.5rem; color:#4ade80;"></i> Online • 409 Villas Ready
            </div>
          </div>
        </div>
        <button onclick="toggleVVChat()" style="color:#ffffff; font-size:1.2rem; cursor:pointer; opacity:0.85;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="vv-chat-body" id="vvChatBody">
        <!-- Initial Greeting Message -->
        <div class="vv-msg-row bot">
          <div class="vv-msg-bubble">
            <strong>Namaste & Welcome to Viral Villas! 👑</strong><br>
            I am your dedicated 24/7 AI Luxury Concierge. I have realtime access to our entire portfolio of <strong>409 private villas</strong> across 26 destinations.
            <br><br>
            How may I assist you today? You can ask me about destinations, bedrooms (BHK), nightly rates, private pool villas, or milestone celebrations!
          </div>
        </div>
      </div>

      <!-- Quick Suggestion Chips -->
      <div class="vv-quick-chips-wrap">
        <button class="vv-quick-chip" onclick="handleQuickPrompt('Show me villas in Goa with private pool')">🌴 Goa Pool Villas</button>
        <button class="vv-quick-chip" onclick="handleQuickPrompt('Show me luxury villas in Udaipur')">🏰 Udaipur Palace</button>
        <button class="vv-quick-chip" onclick="handleQuickPrompt('Villas in Lonavala for 12 guests')">⛰️ Lonavala 5 BHK</button>
        <button class="vv-quick-chip" onclick="handleQuickPrompt('Pet friendly villas')">🐾 Pet-Friendly</button>
        <button class="vv-quick-chip" onclick="handleQuickPrompt('How can I book a villa?')">❓ How to Book</button>
      </div>

      <!-- Input Bar -->
      <form class="vv-chat-footer" onsubmit="handleChatSubmit(event)">
        <input type="text" id="vvChatInput" class="vv-chat-input" placeholder="Type destination, BHK, budget, or question..." autocomplete="off">
        <button type="submit" class="vv-chat-send-btn" title="Send Message">
          <i class="fa-solid fa-arrow-up"></i>
        </button>
      </form>
    </div>
  `;
  document.body.appendChild(widgetContainer);

  // 3. Knowledge & Natural Language Matcher (100% Client-side, zero API key)
  window.toggleVVChat = function() {
    const win = document.getElementById('vvChatWindow');
    if (win) {
      win.classList.toggle('open');
      if (win.classList.contains('open')) {
        document.getElementById('vvChatInput')?.focus();
      }
    }
  };

  window.handleQuickPrompt = function(txt) {
    document.getElementById('vvChatInput').value = txt;
    handleChatSubmit(new Event('submit'));
  };

  window.handleChatSubmit = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    const input = document.getElementById('vvChatInput');
    const query = input.value.trim();
    if (!query) return;

    input.value = '';
    appendUserMsg(query);

    // Show typing dots
    const typingRow = showTyping();
    setTimeout(() => {
      typingRow.remove();
      const reply = processQuery(query);
      appendBotMsg(reply.text, reply.cards);
    }, 400);
  };

  function appendUserMsg(txt) {
    const body = document.getElementById('vvChatBody');
    const row = document.createElement('div');
    row.className = 'vv-msg-row user';
    row.innerHTML = `<div class="vv-msg-bubble">${escapeHtml(txt)}</div>`;
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
  }

  function showTyping() {
    const body = document.getElementById('vvChatBody');
    const row = document.createElement('div');
    row.className = 'vv-msg-row bot';
    row.innerHTML = `<div class="vv-typing-dots"><div class="vv-typing-dot"></div><div class="vv-typing-dot"></div><div class="vv-typing-dot"></div></div>`;
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
    return row;
  }

  function appendBotMsg(txt, cards) {
    const body = document.getElementById('vvChatBody');
    const row = document.createElement('div');
    row.className = 'vv-msg-row bot';

    let cardsHtml = '';
    if (cards && cards.length > 0) {
      cardsHtml = cards.map(c => `
        <div class="vv-chat-villa-card">
          <img src="${c.img}" class="vv-chat-villa-img" alt="${escapeHtml(c.name)}">
          <div class="vv-chat-villa-info">
            <div class="vv-chat-villa-name">${escapeHtml(c.name)}</div>
            <div class="vv-chat-villa-meta"><i class="fa-solid fa-location-dot" style="color:#801426;"></i> ${escapeHtml(c.location)} • ${c.bhk} BHK • Up to ${c.guests} Guests</div>
            <div class="vv-chat-villa-foot">
              <div class="vv-chat-villa-price">₹${c.price.toLocaleString('en-IN')}<small style="font-size:0.7rem; font-weight:400; color:#6b7280;">/night</small></div>
              <a href="villa.html?id=${c.id}" class="vv-chat-villa-btn">View Villa →</a>
            </div>
          </div>
        </div>
      `).join('');
    }

    row.innerHTML = `<div class="vv-msg-bubble">${txt}${cardsHtml}</div>`;
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
  }

  function processQuery(query) {
    const q = query.toLowerCase();
    const villas = typeof ALL_409_VILLAS_DATA !== 'undefined' ? ALL_409_VILLAS_DATA : [];

    // 1. Greetings
    if (/^(hi|hello|hey|hola|namaste|good morning|good evening|good afternoon)/.test(q)) {
      return {
        text: "Namaste! ✨ How can I help you find your dream villa escape today? Tell me which destination or occasion you have in mind (e.g. <em>Goa, Udaipur, Lonavala, Pool Villas, Corporate Offsites</em>)!"
      };
    }

    // 2. Contact & Customer Support
    if (q.includes('call') || q.includes('phone') || q.includes('contact') || q.includes('number') || q.includes('support')) {
      return {
        text: "📞 You can reach our 24/7 dedicated Luxury Concierge Desk directly at <strong>+91 7969469950</strong> or email us at <strong>support@viralvillas.com</strong>.<br><br>Would you like me to recommend villas in any specific city?"
      };
    }

    // 3. How to book / Vouchers / Dashboard
    if (q.includes('how to book') || q.includes('reserve') || q.includes('booking process')) {
      return {
        text: "Booking a Viral Villa is effortless! 🌟<br><br>1. Explore our 409 estates in <a href='villas.html' style='color:#801426; font-weight:700;'>Catalog</a>.<br>2. Select your check-in and check-out dates.<br>3. Instant booking confirmation is generated with a <strong>Digital QR Stay Voucher</strong> accessible anytime in your <a href='dashboard.html' style='color:#801426; font-weight:700;'>Customer Portal</a>!"
      };
    }

    // 4. Events & Celebrations (Weddings, Offsites, Birthdays, Retreats)
    if (q.includes('wedding') || q.includes('marriage') || q.includes('destination wedding')) {
      return {
        text: "💍 <strong>Destination Weddings & Royal Celebrations:</strong><br>We curate palace estates and luxury banquet lawns in Udaipur, Goa, and Jaipur for up to 500+ guests with private butler staff.<br><br>👉 Check out our dedicated <a href='event.html' style='color:#801426; font-weight:700;'>Destination Weddings Page ↗</a>"
      };
    }
    if (q.includes('corporate') || q.includes('offsite') || q.includes('company') || q.includes('team')) {
      return {
        text: "💼 <strong>Corporate Offsites & Leadership Retreats:</strong><br>Featuring high-speed WiFi, conference gazebos, private pools, and curated team dining across 26 destinations.<br><br>👉 Check out our <a href='corporate-offsite.html' style='color:#801426; font-weight:700;'>Corporate Offsites Portal ↗</a>"
      };
    }
    if (q.includes('birthday') || q.includes('anniversary') || q.includes('party')) {
      return {
        text: "🎂 <strong>Milestone Birthdays & Anniversaries:</strong><br>Celebrate in complete privacy with private BBQ chefs, lawn gazebos, and acoustic sound setups.<br><br>👉 Check out our <a href='birthday.html' style='color:#801426; font-weight:700;'>Celebrations Hub ↗</a>"
      };
    }
    if (q.includes('wellness') || q.includes('yoga') || q.includes('retreat') || q.includes('detox')) {
      return {
        text: "🧘 <strong>Mindful Wellness & Yoga Sanctuaries:</strong><br>Explore sound healing decks, organic farm-to-table cuisine, and serene nature sanctuaries.<br><br>👉 Check out our <a href='wellness.html' style='color:#801426; font-weight:700;'>Wellness Retreats Hub ↗</a>"
      };
    }

    // 5. Smart Search across 409 Villas (Destinations, BHK, Budget, Pets, Pool)
    let filtered = [...villas];

    // City Filter
    const cities = ["goa", "bengaluru", "bangalore", "udaipur", "lonavala", "kochi", "kerala", "kasauli", "alibaug", "coorg", "mussoorie", "dehradun", "delhi", "gurgaon", "jaipur", "ooty", "shimla", "bhimtal", "nainital"];
    const matchedCity = cities.find(c => q.includes(c));
    if (matchedCity) {
      let searchKey = matchedCity === "bangalore" ? "bengaluru" : matchedCity;
      filtered = filtered.filter(v => 
        (v.city && v.city.toLowerCase().includes(searchKey)) ||
        (v.location && v.location.toLowerCase().includes(searchKey)) ||
        (v.state && v.state.toLowerCase().includes(searchKey))
      );
    }

    // BHK Filter
    const bhkMatch = q.match(/(d+)s*(bhk|bedroom|bed)/);
    if (bhkMatch) {
      const bhkNum = parseInt(bhkMatch[1]);
      filtered = filtered.filter(v => (v.metrics && v.metrics.bedrooms === bhkNum));
    }

    // Guests Filter
    const guestsMatch = q.match(/(d+)s*(guest|people|person)/);
    if (guestsMatch) {
      const gNum = parseInt(guestsMatch[1]);
      filtered = filtered.filter(v => (v.metrics && v.metrics.guests >= gNum));
    }

    // Pet friendly
    if (q.includes('pet')) {
      filtered = filtered.filter(v => v.isPetFriendly === true || (v.occasionTags && v.occasionTags.includes('pet')));
    }

    // Pool
    if (q.includes('pool')) {
      filtered = filtered.filter(v => 
        (v.occasionTags && v.occasionTags.includes('pool')) ||
        (v.topAmenities && v.topAmenities.some(a => a.toLowerCase().includes('pool'))) ||
        (v.name && v.name.toLowerCase().includes('pool'))
      );
    }

    // Budget
    const underPrice = q.match(/unders*(d+)/) || q.match(/belows*(d+)/) || q.match(/less thans*(d+)/);
    if (underPrice) {
      const maxP = parseInt(underPrice[1]) * (parseInt(underPrice[1]) < 1000 ? 1000 : 1);
      filtered = filtered.filter(v => (v.priceAmount || v.price) <= maxP);
    }

    // If matches found
    if (filtered.length > 0) {
      const top3 = filtered.slice(0, 3).map(v => ({
        id: v.id,
        name: v.name.split('|')[0].trim(),
        location: (v.location ? v.location + ', ' : '') + (v.city || 'India'),
        price: v.priceAmount || v.price || 40000,
        bhk: (v.metrics && v.metrics.bedrooms) ? v.metrics.bedrooms : 4,
        guests: (v.metrics && v.metrics.guests) ? v.metrics.guests : 10,
        img: (v.images && v.images[0]) ? v.images[0] : 'images/P1038840_003bdc3df0.jpg'
      }));

      const locationLabel = matchedCity ? matchedCity.toUpperCase() : 'our collection';
      return {
        text: `✨ Here are top recommendations in <strong>${locationLabel}</strong> from our 409 verified luxury estates:`,
        cards: top3
      };
    }

    // Generic Fallback
    const random3 = villas.slice(0, 3).map(v => ({
      id: v.id,
      name: v.name.split('|')[0].trim(),
      location: (v.location ? v.location + ', ' : '') + (v.city || 'India'),
      price: v.priceAmount || v.price || 40000,
      bhk: (v.metrics && v.metrics.bedrooms) ? v.metrics.bedrooms : 4,
      guests: (v.metrics && v.metrics.guests) ? v.metrics.guests : 10,
      img: (v.images && v.images[0]) ? v.images[0] : 'images/P1038840_003bdc3df0.jpg'
    }));

    return {
      text: "I searched our 409 properties! Here are some of our most popular luxury private estates across Goa, Udaipur, and Lonavala:",
      cards: random3
    };
  }

  function escapeHtml(str) {
    return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
})();
