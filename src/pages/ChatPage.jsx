import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatInterface from '../components/ChatInterface';
import ChatInput from '../components/ChatInput';

const ChatPage = ({ currentLanguage }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Simulate typing delay for bot responses
  const simulateTyping = (duration = 2000) => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), duration);
  };

  // Generate mock bot response based on user input
  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Healthcare-specific responses
    if (message.includes('malaria')) {
      return {
        text: `## Malaria Symptoms 🦟

**Common symptoms of malaria include:**

- **Fever** - High temperature that may come and go in cycles
- **Chills** - Intense cold feelings followed by sweating
- **Headache** - Severe headaches that persist
- **Muscle aches** - Body pain and weakness
- **Fatigue** - Extreme tiredness and lack of energy
- **Nausea and vomiting** - Digestive issues

**Prevention tips:**
- Use mosquito nets while sleeping
- Apply mosquito repellent
- Wear long-sleeved clothing during peak mosquito hours
- Eliminate standing water around your home

⚠️ **Important:** If you experience these symptoms, especially after traveling to malaria-prone areas, consult a healthcare professional immediately.`,
        type: 'warning'
      };
    }
    
    if (message.includes('vaccination') || message.includes('vaccine')) {
      return {
        text: `## Vaccination Schedule 💉

**Child Vaccination Timeline:**

| Age | Vaccine | Disease Prevention |
|-----|---------|-------------------|
| Birth | BCG, OPV-0, Hepatitis B-1 | Tuberculosis, Polio, Hepatitis B |
| 6 weeks | OPV-1, Pentavalent-1 | Polio, DPT, Hib, Hepatitis B |
| 10 weeks | OPV-2, Pentavalent-2 | Continued immunity |
| 14 weeks | OPV-3, Pentavalent-3, IPV-1 | Polio, DPT, Hib, Hepatitis B |
| 9 months | Measles-1, JE-1 | Measles, Japanese Encephalitis |

**Adult Vaccinations:**
- **COVID-19**: Follow government guidelines for boosters
- **Influenza**: Annual vaccination recommended
- **Tetanus**: Every 10 years

✅ **Government Integration:** This schedule is synced with national immunization programs.`,
        type: 'info'
      };
    }
    
    if (message.includes('prevention') || message.includes('prevent')) {
      return {
        text: `## Preventive Healthcare Tips 🛡️

**Daily Health Practices:**

### Personal Hygiene
- Wash hands frequently with soap for 20 seconds
- Use alcohol-based hand sanitizer when soap unavailable
- Cover mouth and nose when coughing/sneezing
- Avoid touching face with unwashed hands

### Environmental Cleanliness
- Keep surroundings clean and dry
- Ensure proper ventilation in living spaces
- Dispose of garbage properly
- Maintain clean water storage

### Nutrition & Lifestyle
- Eat balanced diet with fruits and vegetables
- Drink clean, purified water
- Get adequate sleep (7-8 hours)
- Exercise regularly

### Community Health
- Report unusual health patterns to local health workers
- Participate in community health programs
- Stay informed about local health advisories

🏥 **Remember:** Prevention is always better than cure!`,
        type: 'success'
      };
    }
    
    // Default response
    return {
      text: `Thank you for your question! 🤖

I'm here to help with healthcare information, including:
- **Disease symptoms** and identification
- **Vaccination schedules** and reminders  
- **Preventive measures** for common illnesses
- **Health alerts** and outbreak information
- **Government health programs** in your area

Could you please be more specific about what health topic you'd like to know about? For example:
- "What are dengue symptoms?"
- "When is my child's next vaccination?"
- "How to prevent seasonal flu?"

I'm connected to government health databases to provide you with the most current and reliable information.`,
      type: null
    };
  };

  // Handle sending messages
  const handleSendMessage = (messageData) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageData.text,
      files: messageData.files,
      timestamp: messageData.timestamp
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot response
    simulateTyping();
    
    setTimeout(() => {
      const botResponseData = generateBotResponse(messageData.text);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponseData.text,
        type: botResponseData.type,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 2000);
  };

  // Handle initial message from navigation
  useEffect(() => {
    if (location.state?.initialMessage) {
      handleSendMessage({
        text: location.state.initialMessage,
        files: [],
        timestamp: new Date().toISOString()
      });
      // Clear the state to prevent re-sending on refresh
      navigate('/chat', { replace: true });
    }
  }, [location.state]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col h-full min-h-0 bg-white md:bg-gradient-to-br md:from-slate-50 md:via-white md:to-blue-50 touch-manipulation"
    >
      <div className="flex-1 min-h-0 overflow-hidden relative">
        <ChatInterface 
          messages={messages}
          isTyping={isTyping}
        />
      </div>
      <div className="flex-shrink-0 border-t border-slate-200 bg-white">
        <ChatInput
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          disabled={isTyping}
        />
      </div>
    </motion.div>
  );
};

export default ChatPage;