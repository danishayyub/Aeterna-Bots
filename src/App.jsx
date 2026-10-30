import React, { useState } from 'react';
import { 
  Bot, MessageSquare, Database, Settings, Users, Plus, Trash2, 
  Send, Mic, CheckCircle, Shield, Globe, Cpu, Smartphone, RefreshCw 
} from 'lucide-react';

export default function App() {
  // 1. Multi-Tenant Clients (Simulating 20 different businesses)
  const [clients, setClients] = useState([
    { id: 'store_001', name: 'Ali Clothing Brand', type: 'ecommerce', phoneId: '92300112233', token: 'EAAG_TOKEN_1...' },
    { id: 'store_002', name: 'Kashmir Cafe & Dine', type: 'restaurant', phoneId: '92301445566', token: 'EAAG_TOKEN_2...' },
    { id: 'store_003', name: 'Care Dental Clinic', type: 'clinic', phoneId: '92302778899', token: 'EAAG_TOKEN_3...' }
  ]);
  
  const [activeClient, setActiveClient] = useState(clients[0]);
  const [activeTab, setActiveTab] = useState('dashboard');

  // 2. Products / Knowledge Base State (CRUD for active business)
  const [products, setProducts] = useState([
    { id: 1, name: 'Black Cotton Kurta', price: '3500 PKR', stock: 'Available (S, M, L)' },
    { id: 2, name: 'Formal White Shalwar Kameez', price: '4500 PKR', stock: 'Available (M, L, XL)' }
  ]);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');

  // 3. Simulator Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: `Assalam-o-Alaikum! Welcome to ${activeClient.name}. How can I help you today?` }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  // Add Product Handler
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;
    setProducts([...products, { id: Date.now(), name: newProdName, price: newProdPrice, stock: 'Available' }]);
    setNewProdName('');
    setNewProdPrice('');
  };

  // Delete Product Handler
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Bot Logic Engine (Dynamic based on selected tenant)
  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user', text: text }];
    setChatMessages(newMsgs);
    setInputMessage('');

    // Simulated Smart Bot Response
    setTimeout(() => {
      let botReply = `G bilkul! ${activeClient.name} mein yeh item available hai.`;
      if (text.toLowerCase().includes('price') || text.toLowerCase().includes('kitne')) {
        botReply = `Hamare paas items ki range yeh hai:\n` + products.map(p => `• ${p.name}: ${p.price}`).join('\n');
      } else if (text.toLowerCase().includes('location') || text.toLowerCase().includes('kahan')) {
        botReply = `Hum Sahiwal / Harappa region mein serve kar rahe hain! Online delivery available hai.`;
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 1000);
  };

  // Simulate Voice Note Audio Processing (Whisper AI Integration Simulation)
  const handleSimulateVoiceNote = () => {
    setIsRecordingVoice(true);
    setTimeout(() => {
      setIsRecordingVoice(false);
      // Simulated transcription of a voice note in Roman Urdu
      const simulatedVoiceText = "Bhai black kurta ka price kya hai aur size M mil jayega?";
      handleSendMessage(simulatedVoiceText);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* TOP HEADER */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-500 p-2 rounded-xl text-slate-900 font-bold shadow-lg shadow-emerald-500/20">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Aeterna Bots <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">Multi-Tenant SaaS</span>
            </h1>
            <p className="text-xs text-slate-400">WhatsApp Automation & AI Engine</p>
          </div>
        </div>

        {/* MULTI-TENANT SWITCHER */}
        <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
          <Users size={16} className="text-emerald-400" />
          <span className="text-xs text-slate-400 hidden sm:inline">Active Business:</span>
          <select 
            className="bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer"
            value={activeClient.id}
            onChange={(e) => {
              const selected = clients.find(c => c.id === e.target.value);
              setActiveClient(selected);
              setChatMessages([{ sender: 'bot', text: `Switched to ${selected.name}. How can I assist?` }]);
            }}
          >
            {clients.map(c => (
              <option key={c.id} value={c.id} className="bg-slate-800 text-white">
                {c.name} ({c.type})
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <div className="bg-slate-800/50 border-b border-slate-800 px-6 flex space-x-4">
        {[
          { id: 'dashboard', label: 'Dashboard & Setup', icon: Settings },
          { id: 'products', label: 'Knowledge / Products', icon: Database },
          { id: 'simulator', label: 'WhatsApp & Voice Bot Simulator', icon: MessageSquare }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id 
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 max-w-6xl w-full mx-auto">
        
        {/* TAB 1: DASHBOARD & SETUP */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Meta WhatsApp API</h3>
                <Shield className="text-emerald-400" size={20} />
              </div>
              <p className="text-xs text-slate-400 mb-4">Webhook & Token configuration for {activeClient.name}.</p>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400">Phone Number ID</label>
                  <input type="text" readOnly value={activeClient.phoneId} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-slate-300 mt-1" />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Access Token</label>
                  <input type="password" readOnly value={activeClient.token} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-slate-300 mt-1" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">AI Speech Engine (Whisper)</h3>
                <Cpu className="text-indigo-400" size={20} />
              </div>
              <p className="text-xs text-slate-400 mb-4">Customer Voice Note transcription status.</p>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                <span className="text-sm text-slate-300">Urdu/English Voice AI</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1">
                  <CheckCircle size={12} /> Active
                </span>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Cloud Hosting Status</h3>
                <Globe className="text-blue-400" size={20} />
              </div>
              <p className="text-xs text-slate-400 mb-4">Firebase & GitHub Backend Sync.</p>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1">
                <p>🟢 Database: Connected (Free Tier)</p>
                <p>🟢 Webhook Route: /api/v1/webhook</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS & KNOWLEDGE BASE (CRUD) */}
        {activeTab === 'products' && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-bold text-white mb-2">Manage Inventory / Knowledge Base</h2>
            <p className="text-xs text-slate-400 mb-6">Bot will automatically fetch these items when customers inquire on WhatsApp for {activeClient.name}.</p>

            {/* Add Product Form */}
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <input 
                type="text" 
                placeholder="Item Name (e.g. Black Kurta)" 
                value={newProdName}
                onChange={(e) => setNewProdName(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
              <input 
                type="text" 
                placeholder="Price (e.g. 3500 PKR)" 
                value={newProdPrice}
                onChange={(e) => setNewProdPrice(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-semibold rounded-xl px-4 py-2.5 text-sm transition flex items-center justify-center gap-2">
                <Plus size={18} /> Add Item
              </button>
            </form>

            {/* Products List Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="p-3 rounded-l-lg">Item Name</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 rounded-r-lg text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-slate-700/20">
                      <td className="p-3 font-medium text-white">{p.name}</td>
                      <td className="p-3 text-emerald-400 font-semibold">{p.price}</td>
                      <td className="p-3"><span className="bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded">{p.stock}</span></td>
                      <td className="p-3 text-right">
                        <button onClick={() => handleDeleteProduct(p.id)} className="text-red-400 hover:text-red-300 p-1">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: WHATSAPP & VOICE BOT SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col h-[500px]">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <Smartphone className="text-emerald-400" size={20} />
                  <h3 className="font-semibold text-white">Live WhatsApp Chat Simulator</h3>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">Connected to {activeClient.name}</span>
              </div>

              {/* Chat Window */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-600 text-white rounded-br-none' 
                        : 'bg-slate-900 border border-slate-700 text-slate-200 rounded-bl-none'
                    }`}>
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voice Note Simulation & Text Input */}
              <div className="space-y-2">
                {isRecordingVoice && (
                  <div className="bg-indigo-500/20 border border-indigo-500/30 p-2 rounded-xl text-center text-xs text-indigo-300 animate-pulse">
                    🎙️ Receiving Voice Note & Converting via Whisper AI...
                  </div>
                )}
                <div className="flex gap-2">
                  <button 
                    onClick={handleSimulateVoiceNote}
                    title="Simulate Customer Sending Voice Note"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2.5 rounded-xl text-sm flex items-center justify-center transition"
                  >
                    <Mic size={18} />
                  </button>
                  <input 
                    type="text" 
                    placeholder="Type message as customer..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button 
                    onClick={() => handleSendMessage()}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-4 py-2.5 rounded-xl font-semibold flex items-center justify-center transition"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Explanation Panel */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-white mb-3">How this architecture handles 20+ Businesses:</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="bg-emerald-500/20 text-emerald-400 p-1 rounded">1</span>
                    <span><strong>Multi-Tenant Database:</strong> Har business ka data aur products alag `business_id` par store hote hain.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-emerald-500/20 text-emerald-400 p-1 rounded">2</span>
                    <span><strong>Webhook Routing:</strong> Meta webhook identify karta hai ke incoming message kis phone number ID par aaya hai.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-emerald-500/20 text-emerald-400 p-1 rounded">3</span>
                    <span><strong>Voice-Enabled:</strong> Customer jab voice note bhejta hai, backend usay OpenAI Whisper API ke zariye text mein convert karta hai.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-xs text-slate-400">
                💡 **Tip:** Upar dropdown se business switch karke check karein ke har ek ka product data alag dynamically load hota hai!
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
                                             }
    
